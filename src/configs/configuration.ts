import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions';

export interface MySQLConfigurationProps {
  type: 'mysql';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: [string];
  synchronize: boolean;
}

const mySQLConfiguration: MySQLConfigurationProps = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default () => mySQLConfiguration;
