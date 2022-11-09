// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeSubnets.html
// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_Subnet.html
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { State } from 'src/global/types/state';
import { SubnetIpv6CidrBlockAssociationEntity } from './subnetIpv6CidrBlockAssociation.entity';
import { TagEntity } from 'src/global/entity/tag.entity';
import { PrivateDnsNameOptionsOnLaunchEntity } from './privateDnsNameOptionsOnLaunch.entity';
@Entity()
export class SubnetEntity {
  @Column()
  assignIpv6AddressOnCreation: boolean;

  @Column()
  availabilityZone: string;

  @Column()
  availabilityZoneId: string;

  @Column()
  availableIpAddressCount: string;

  @Column()
  cidrBlock: string;

  @Column()
  customerOwnedIpv4Pool: string;

  @Column()
  defaultForAz: boolean;

  @Column()
  enableDns64: boolean;

  @Column()
  enableLniAtDeviceIndex: number;

  @OneToMany(
    () => SubnetIpv6CidrBlockAssociationEntity,
    (subnetIpv6CidrBlockAssociationEntity) =>
      subnetIpv6CidrBlockAssociationEntity.subnet,
    { cascade: true },
  )
  ipv6CidrBlockAssociationSet: SubnetIpv6CidrBlockAssociationEntity;

  @Column()
  ipv6Native: boolean;

  @Column()
  mapCustomerOwnedIpOnLaunch: boolean;

  @Column()
  mapPublicIpOnLaunch: boolean;

  @Column()
  outpostArn: boolean;

  @Column()
  ownerId: string;

  @OneToOne(() => PrivateDnsNameOptionsOnLaunchEntity, { cascade: true })
  @JoinColumn()
  privateDnsNameOptionsOnLaunch: PrivateDnsNameOptionsOnLaunchEntity;

  @Column({ type: 'enum', enum: State })
  state: State;

  @Column()
  subnetArn: string;

  @PrimaryColumn()
  subnetId: string;

  @ManyToMany(() => TagEntity, { cascade: true })
  @JoinTable()
  tags: TagEntity;

  @Column()
  vpcId: string;

  static create(dto) {}
}
