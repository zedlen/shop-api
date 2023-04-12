export type MongodbConfigType = {
  host: string;
  port: number;
  dababase_name: string;
  database_user?: string;
  database_password?: string;
  auth_source?: string;
  ssl: boolean;
  retry_writes?: boolean;
};
