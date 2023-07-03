import algoliasearch from 'algoliasearch';
import dotenv from 'dotenv-mono';

dotenv.config();

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);
const index = client.initIndex('aircrafts_rc1');

export const updateAlgoliaIndex = data => {
  return index.saveObjects(data, {
    autoGenerateObjectIDIfNotExist: true
  });
};
