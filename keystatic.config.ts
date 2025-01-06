import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    stories: collection({
      label: 'Stories',
      slugField: 'title',
      path: 'src/content/stories/*',
      format: {
        contentField: 'summary',
      },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.markdoc({ label: 'Summary' }),
        image: fields.image({
          label: 'Cover image for the story',
          directory: './public/story-images',
          publicPath: '/story-images',
        }),
        isOneShot: fields.checkbox({
          label: 'Is this a short, 1-chapter story?',
          defaultValue: false,
        }),
        chapters: fields.array(
          fields.relationship({
            label: 'Chapters',
            collection: 'chapters',
          }),
          {
            label: 'Chapters',
            itemLabel: (props) => props.value as string,
          },
        ),
      },
    }),
    chapters: collection({
      label: 'Chapters',
      slugField: 'title',
      path: 'src/content/chapters/*',
      entryLayout: 'content',
      format: {
        contentField: 'content',
      },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        coverImage: fields.image({
          label: 'Cover image for the story chapter',
          directory: './public/chapter-cover-images',
          publicPath: '/chapter-cover-images',
        }),
        pageImages: fields.array(
          fields.image({
            label: 'Page image',
            directory: './public/chapter-page-images',
            publicPath: '/chapter-page-images',
          }),
          {
            label: 'Page Images',
            itemLabel: (props) => props.value?.filename as string,
          },
        ),
        content: fields.markdoc({
          label: 'Chapter content',
        }),
      },
    }),
  },
});
