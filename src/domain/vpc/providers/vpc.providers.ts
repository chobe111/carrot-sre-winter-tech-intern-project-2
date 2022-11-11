import { DataSource, Repository } from 'typeorm';
import { VpcEntity } from '../entity/vpc.entity';

export const VpcProviders = [
  {
    provide: 'VPC_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<VpcEntity> => dataSource.getRepository(VpcEntity),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
