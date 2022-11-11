import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { PrivateDnsNameOptionsOnLaunchDTO } from '../dto/subnet.dto';

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

  @Column()
  hostnameType: string;

  static create(dto: PrivateDnsNameOptionsOnLaunchDTO) {
    const privateDnsNameOptionsOnLaunch = new PrivateDnsNameOptionsOnLaunchEntity();

    privateDnsNameOptionsOnLaunch.enableResourceNameDnsAAAARecord = dto.EnableResourceNameDnsAAAARecord;
    privateDnsNameOptionsOnLaunch.enableResourceNameDnsARecord = dto.EnableResourceNameDnsARecord;
    privateDnsNameOptionsOnLaunch.hostnameType = dto.HostnameType;

    return privateDnsNameOptionsOnLaunch;
  }
}
