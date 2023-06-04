const validPayload = {
  code: 'NEW_PRODUCT',
  title:"An awsome new product",
  description:"This is the description of an awsome new product",
  brand:"",
  categories:[],
  price:100,
  discound_price:null,
  thumbanail_url: 'http://an-image-url.com/image.jpg',
  resources:[],
  requires_shipping:true,
  warehouse:null,
  slug:"new-awsome-product"
};

const invalidPayload = {  
  title:"An awsome new product",
  description:"This is the description of an awsome new product",
  brand:"",
  categories:[],
  price:100,
  discound_price:null,
  thumbanail_url: 'http://an-image-url.com/image.jpg',
  resources:[],
  requires_shipping:true,
  warehouse:null,
  slug:"new-awsome-product"
};

const unauthorizedResponse = {"status":401,"code":"UNAUTHORIZED","details":"You don't have permission to access this resource"}

const badRequestResponse = {"status":400,"code":"BAD_REQUEST","details":"Missing param coode"}


const duplicateProductError = {
  errors: [
    {
      status: 409,
      code: 'duplicate_key',
      details: 'Product already exists',
    },
  ],
};



export { validPayload, duplicateProductError, unauthorizedResponse, invalidPayload, badRequestResponse };
