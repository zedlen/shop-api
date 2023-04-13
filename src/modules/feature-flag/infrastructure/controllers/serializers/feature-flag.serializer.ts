import { Serializer } from 'jsonapi-serializer';

export const featureFlagSerializer: Serializer = new Serializer('feature-flag', {
  _id: 'id',
  attributes: ['code', 'description', 'enable_all', 'sellers'],
  keyForAttribute: 'snake_case',
  pluralizeType: false,
});
