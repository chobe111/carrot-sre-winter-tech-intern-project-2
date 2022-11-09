import { DataSource, Repository } from 'typeorm';
import { Vpc } from '../entity/vpc.entity';

export const VpcProviders = [
  {
    provide: 'VPC_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<Vpc> =>
      dataSource.getRepository(Vpc),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
