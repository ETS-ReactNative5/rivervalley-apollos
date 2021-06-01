import { Comment } from '@apollosproject/data-connector-postgres';

class dataSource extends Comment.dataSource {
  async getForNode({ nodeId, nodeType, flagLimit = 0 }) {
    if (nodeId === 'currentUser') {
      let currentPersonId;
      try {
        currentPersonId = await this.context.dataSources.Person.getCurrentPersonId();
      } catch {
        // no user signed in, that's fine. We'll just return an empty array.
        return [];
      }

      const where = {
        personId: currentPersonId,
      };

      // eslint-disable-next-line camelcase
      const { comments, people } = this.sequelize.models;

      return comments.findAll({
        where,
        include: [
          // we join in the follows table to sort your followers to the top
          {
            model: people,
          },
        ],
        order: [['createdAt', 'desc']],
      });
    }
    return super.getForNode({ nodeId, nodeType, flagLimit });
  }
}

const { resolver, schema, models, migrations } = Comment;

export { dataSource, resolver, schema, models, migrations };
