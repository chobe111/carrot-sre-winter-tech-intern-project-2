import { DataSource, Repository } from 'typeorm';
import { SubnetEntity } from '../entity/subnet.entity';

export const subnetProviders = [
  {
    provide: 'SUBNET_REPOSITORY',
    useFactory: (dataSource: DataSource): Repository<SubnetEntity> => dataSource.getRepository(SubnetEntity),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
