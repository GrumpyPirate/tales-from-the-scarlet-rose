const fs = require('fs');

const fetchGraphQLPossibleTypes = async () => {
  const result = await (
    await fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        variables: {},
        query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
      }),
    })
  ).json();

  const possibleTypes = {};

  result.data.__schema.types.forEach((supertype) => {
    if (supertype.possibleTypes) {
      possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
    }
  });

  fs.writeFile('./possibleTypes.json', JSON.stringify(possibleTypes), (err) => {
    if (err) {
      console.error('Error writing possibleTypes.json', err);
    } else {
      console.log('Fragment types successfully extracted!');
    }
  });
};

fetchGraphQLPossibleTypes();
