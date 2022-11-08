import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { MySQLConfigurationType } from 'src/configs/configuration';
import { ConfigurationType } from 'src/configs/configuration';

export const databaseProviders = [
  {
    provide: 'MYSQL_DATA_SOURCE',
    useFactory: (configService: ConfigService) => {
      const config = configService.get<MySQLConfigurationType>('database');
      const mySQLDataSource = new DataSource(config);
      return mySQLDataSource.initialize();
    },
    inject: [ConfigService],
  },
];
