export interface FeatureFlagInterface {
  _id?: string;
  code: string;
  description: string;
  enable_all: boolean;
  sellers: number[];
}
