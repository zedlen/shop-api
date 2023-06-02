const validPayload = {
  code: 'TEST_FF',
  description: 'Just a testing ff',
  sellers: [378094886],
  enable_all: false,
};

const invalidPayload = {
  code: 'TEST_FF',
  description: 'Just a testing ff',
  sellers: [378094886],
  enable_all: false,
};

const unauthorizedResponse = {"status":401,"code":"UNAUTHORIZED","details":"You don't have permission to access this resource"}


const duplicateProductError = {
  errors: [
    {
      status: 409,
      code: 'duplicate_key',
      details: 'Product already exists',
    },
  ],
};



export { validPayload, duplicateProductError, unauthorizedResponse, invalidPayload };
