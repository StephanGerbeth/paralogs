export const createEventMetadata = ({
  // url,
  // name,
  start,
  end
  // image,
  // description,
  // address,
  // slug
}) => {
  return {
    // external_url: url,
    // name,
    // image,
    // description,
    // slug,
    attributes: [
      {
        trait_type: 'event_start_date',
        value: getTimestamp(start)
      },
      {
        trait_type: 'event_end_date',
        value: getTimestamp(end)
      }
      // { trait_type: 'event_address', value: address }
    ]
  };
};

const getTimestamp = date => {
  return Number((date.getTime() / 1000).toFixed(0));
};

export const resolveEventData = ({
  // eslint-disable-next-line camelcase
  external_url,
  name,
  image,
  description,
  attributes
}) => {
  const start = resolveDate(attributes, 'event_start_date');
  const end = resolveDate(attributes, 'event_end_date');
  // eslint-disable-next-line camelcase
  return { url: external_url, name, start, end, image, description };
};

const resolveDate = (attributes, type, timezone) => {
  const result = resolveAttribute(attributes, type);
  return new Date(result.value * 1000);
};

const resolveAttribute = (attributes, type) => {
  // eslint-disable-next-line camelcase
  return attributes.find(({ trait_type }) => trait_type === type);
};
