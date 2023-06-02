const validPayload = {
  code: 'TEST_FF',
  description: 'Just a testing ff',
  sellers: [378094886],
  enable_all: false,
};

const unauthorizedResponse = {"status":401,"code":"UNAUTHORIZED","details":"You don't have permission to access this resource"}

const payloadWithEmptyCarriers = {
  cp_from: '37358',
  cp_to: '37358',
  carriers: [],
};

const duplicateCoverageError = {
  errors: [
    {
      status: 409,
      code: 'duplicate_key',
      details: 'Coverage already exists',
    },
  ],
};

const emptyCarrierError = {
  statusCode: 400,
  message: ['carriers must contain at least 1 elements'],
  error: 'Bad Request',
};

export { validPayload, duplicateCoverageError, emptyCarrierError, payloadWithEmptyCarriers, unauthorizedResponse };
