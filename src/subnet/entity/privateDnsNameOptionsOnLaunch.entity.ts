import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum HostnameEnum {
  IP_NAME = 'ip-name',
  RESOURCE_NAME = 'resource-name',
}

@Entity()
export class PrivateDnsNameOptionsOnLaunchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enableResourceNameDnsAAAARecord: boolean;

  @Column()
  enableResourceNameDnsARecord: boolean;

  @Column({ type: 'enum', enum: HostnameEnum })
  hostnameType: HostnameEnum;
}
