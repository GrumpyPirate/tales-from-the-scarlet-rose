const fetchGraphQL = async <T = any>(query: string): Promise<T> =>
  (
    await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    })
  ).json();

export const getAllStories = async (): Promise<any> => {
  try {
    const {
      storyCollection: { total, items },
    } = await fetchGraphQL(`
      query getAllStories {
        storyCollection(limit: 20) {
          total
          items {
            title
            slug
            synopsis
            shortSynopsis
            poster {
              url
              width
              height
              description
            }
            chaptersCollection {
              total
            }
            storyStartDate
            storyEndDate
          }
        }
      }
    `);

    return { total, items };
  } catch (error) {
    console.log('Error fetching all Stories:', JSON.stringify(error));
  }
};

export const getStoryBySlug = async (slug: string): Promise<any> => {
  try {
    const {
      storyCollection: { items },
    } = await fetchGraphQL(`
      query getAllStories($slug: String!) {
        storyCollection(limit: 20, where: { slug: ${slug} }) {
          total
          items {
            title
            slug
            synopsis
            shortSynopsis
            poster {
              url
              width
              height
              description
            }
            chaptersCollection {
              total
            }
            storyStartDate
            storyEndDate
          }
        }
      }
    `);

    return items[0];
  } catch (error) {
    console.log('Error fetching all Stories:', JSON.stringify(error));
  }
};
