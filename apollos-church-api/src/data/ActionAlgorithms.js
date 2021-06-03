import { ActionAlgorithm } from '@apollosproject/data-connector-rock';

class dataSource extends ActionAlgorithm.dataSource {
  ACTION_ALGORITHMS = {
    ...this.ACTION_ALGORITHMS,
    GO_PRAY: this.goPray.bind(this),
  };

  async goPray() {
    return [
      {
        id: `pray-for-others`,
        title: 'Pray for others',
        subtitle: 'The church needs your prayer',
        relatedNode: {
          __type: 'Url',
          url: 'RiverValley://app-link/nav/Tabs?screen=Pray',
          id: 'RiverValley://app-link/nav/Tabs?screen=Pray',
        },
        image: {
          sources: [
            {
              uri: 'https://rock.rivervalley.org/GetImage.ashx?id=476391',
            },
          ],
        },
        action: 'OPEN_URL',
        // summary: ContentItem.createSummary(item),
      },
    ];
  }
}

export { dataSource };
