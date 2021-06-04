/* eslint-disable class-methods-use-this */
import ApollosConfig from '@apollosproject/config';
import { RESTDataSource } from 'apollo-datasource-rest';

class dataSource extends RESTDataSource {
  get token() {
    return ApollosConfig.HOPE_STREAM.TOKEN;
  }

  baseURL = 'https://api.hopestream.com/guest/1/';

  willSendRequest = (request) => {
    request.headers.set('Authorization', `Bearer ${this.token}`);
  };

  getVideo = async (id) => {
    const { Cache } = this.context.dataSources;
    // captures either vimeo/123 or 123
    const match = id.match(/media\/(.*)\//)?.[1] || id;
    if (match) {
      const cachedVideo = await Cache.get({
        key: ['hopestream', match],
      });
      if (cachedVideo) return cachedVideo;
      const video = await this.get(`media/${match}`);
      const source = this.findHLSSource(video);

      if (source) Cache.set({ key: ['hopestream', match], data: source });

      return source;
    }
    return null;
  };

  findHLSSource({ media }) {
    const validMedia = Object.values(media).find(
      ({ streamUrl }) => !!streamUrl
    );

    return validMedia ? validMedia.streamUrl : null;
  }
}

const baseResolver = {
  videos: async (root, args, { dataSources: { HopeStream } }) => {
    const videoUrls = [
      root?.attributeValues?.videoUrl?.value,
      root?.attributeValues?.hopestreamVideoId?.value,
      root?.attributeValues?.hopestreamVideoID?.value,
    ].filter((v) => !!v);
    return videoUrls.map((videoUrl) => ({
      sources: [
        {
          // if it's not a URI, we're assuming it's a Vimeo ID
          uri: HopeStream.getVideo(videoUrl),
        },
      ],
    }));
  },
};

// overrides the video urls for all content item resolvers
const contentItemTypes = Object.keys(ApollosConfig.ROCK_MAPPINGS.CONTENT_ITEM);

const resolver = contentItemTypes.reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: baseResolver,
  }),
  {}
);

export { dataSource, resolver };
