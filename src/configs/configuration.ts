import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions';

export interface MySQLConfigurationType {
  type: 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: [string];
  synchronize: boolean;
}
export interface ConfigurationType {
  database: MySQLConfigurationType;
}

const mySQLConfiguration: MySQLConfigurationType = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};

const configuration = {
  database: mySQLConfiguration,
};

export default () => configuration;
