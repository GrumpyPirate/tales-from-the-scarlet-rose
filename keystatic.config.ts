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
      format: {
        contentField: 'summary',
      },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        summary: fields.markdoc({ label: 'Summary' }),
        image: fields.image({
          label: 'Cover image for the story chapter',
          directory: './public/chapter-images',
          publicPath: '/chapter-images',
        }),
        pages: fields.array(
          fields.relationship({
            label: 'Pages',
            collection: 'pages',
          }),
          { label: 'Pages' },
        ),
      },
    }),
    pages: collection({
      label: 'Pages',
      slugField: 'slug',
      path: 'src/content/pages/*',
      format: {
        contentField: 'copy',
      },
      schema: {
        slug: fields.slug({ name: { label: 'Page Slug' } }),
        image: fields.image({
          label: 'Cover image for the page',
          directory: './public/page-images',
          publicPath: '/page-images',
        }),
        copy: fields.markdoc({
          label: 'Page copy',
        }),
      },
    }),
  },
});
