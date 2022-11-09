import { DataSource } from 'typeorm';
import { Vpc } from '../entity/vpc.entity';
export const VpcProviders = [
  {
    provide: 'VPC_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Vpc),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
