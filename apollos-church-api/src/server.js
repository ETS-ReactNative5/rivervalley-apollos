import { ApolloServer } from 'apollo-server-express';
import ApollosConfig from '@apollosproject/config';
import express from 'express';
import { RockLoggingExtension } from '@apollosproject/rock-apollo-data-source';
import { get } from 'lodash';
import { setupUniversalLinks } from '@apollosproject/server-core';
import { createMigrationRunner } from '@apollosproject/data-connector-postgres';
import { BugsnagPlugin } from '@apollosproject/bugsnag';

let dataObj;

if (ApollosConfig?.DATABASE?.URL) {
  dataObj = require('./data/index.postgres');
} else {
  dataObj = require('./data/index');
}

const {
  resolvers,
  schema,
  testSchema,
  context,
  dataSources,
  applyServerMiddleware,
  setupJobs,
  migrations,
} = dataObj;

export { resolvers, schema, testSchema };

const isDev =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';

const extensions = isDev ? [() => new RockLoggingExtension()] : [];

const cacheOptions = isDev
  ? {}
  : {
      cacheControl: {
        stripFormattedExtensions: false,
        calculateHttpHeaders: true,
        defaultMaxAge: 3600,
      },
    };

const { ROCK, APP } = ApollosConfig;

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  dataSources,
  context,
  plugins: [new BugsnagPlugin()],
  introspection: true,
  extensions,
  formatError: (error) => {
    console.error(get(error, 'extensions.exception.stacktrace', []).join('\n'));
    return error;
  },
  playground: {
    settings: {
      'editor.cursorShape': 'line',
    },
  },
  uploads: false,
  ...cacheOptions,
});

const app = express();

// password reset
app.get('/forgot-password', (req, res) => {
  res.redirect(APP.FORGOT_PASSWORD_URL || `${ROCK.URL}/page/56`);
});

applyServerMiddleware({ app, dataSources, context });
setupJobs({ app, dataSources, context });
// Comment out if you don't want the API serving apple-app-site-association or assetlinks manifests.
setupUniversalLinks({ app });

apolloServer.applyMiddleware({ app });
apolloServer.applyMiddleware({ app, path: '/' });

// make sure this is called last.
// (or at least after the apollos server setup)
(async () => {
  if (ApollosConfig?.DATABASE?.URL) {
    const migrationRunner = await createMigrationRunner({ migrations });
    const pending = await migrationRunner.pending();
    if (pending.length) {
      console.log('\x1b[31m', '██████████████████████████████████', '\x1b[0m');
      console.log(
        '\x1b[36m',
        'You currently have a number of pending migrations',
        '\x1b[0m'
      );
      console.log(pending);
      console.log(
        `Keep in mind, you are currently connected to ${
          migrationRunner?.options?.context?.sequelize?.options?.host
        }`
      );
      console.log('\x1b[31m', '██████████████████████████████████', '\x1b[0m');
    } else {
      console.log("No pending migrations")
    }
    if (ApollosConfig.AUTO_MIGRATE) await migrationRunner.up();
  }
})();

export default app;
