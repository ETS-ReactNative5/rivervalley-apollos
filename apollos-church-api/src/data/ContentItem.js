import { ContentItem } from '@apollosproject/data-connector-postgres';

const { schema, models, migrations } = ContentItem;

class dataSource extends ContentItem.dataSource {
  baseItemByChannelCursor = this.byContentChannelId;

  getFeatures = async (item) => {
    const features = await super.getFeatures(item);

    // This moves the Webview feature above the journal entries
    if (features[features.length - 1].dataValues.type === 'Webview') {
      const tempFeature = features[features.length - 1];

      features[features.length - 1] = features[features.length - 3];
      features[features.length - 3] = tempFeature;
    }

    return features;
  };
}

const resolver = {
  ...ContentItem.resolver,
  WebviewFeature: {
    ...ContentItem.resolver.WebviewFeature,
    url: (data) => data.dataValues.data.url,
    height: () => 400,
  },
};

export { schema, resolver, dataSource, models, migrations };
