const contentfulManagement = require('contentful-management');

const getContentfulEnvironment = async () => {
  const { CONTENTFUL_ENVIRONMENT, CONTENTFUL_MANAGEMENT_ACCESS_TOKEN, CONTENTFUL_SPACE_ID } = process.env;

  const contentfulClient = contentfulManagement.createClient({
    accessToken: CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  });

  try {
    const space = await contentfulClient.getSpace(CONTENTFUL_SPACE_ID);

    return space.getEnvironment(CONTENTFUL_ENVIRONMENT);
  } catch (error) {
    console.error(
      `Couldn\'t fetch environment "${CONTENTFUL_ENVIRONMENT}" for space "${CONTENTFUL_SPACE_ID}". Reason:`,
      JSON.stringify(error)
    );
  }
};

module.exports = getContentfulEnvironment;
