// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeSubnets.html
// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_Subnet.html
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { SubnetIpv6CidrBlockAssociationEntity } from './subnetIpv6CidrBlockAssociation.entity';
import { TagDTO, TagEntity } from 'src/global/entity/tag.entity';
import { PrivateDnsNameOptionsOnLaunchEntity } from './privateDnsNameOptionsOnLaunch.entity';
import { SubnetDTO } from '../dto/subnet.dto';
@Entity()
export class SubnetEntity {
  @Column({ nullable: true, type: 'boolean' })
  assignIpv6AddressOnCreation: boolean;

  @Column({ nullable: true, type: 'varchar' })
  availabilityZone: string;

  @Column({ nullable: true, type: 'varchar' })
  availabilityZoneId: string;

  @Column({ nullable: true, type: 'integer' })
  availableIpAddressCount: number;

  @Column({ nullable: true, type: 'varchar' })
  cidrBlock: string;

  @Column({ nullable: true, type: 'varchar' })
  customerOwnedIpv4Pool: string;

  @Column({ nullable: true, type: 'boolean' })
  defaultForAz: boolean;

  @Column({ nullable: true, type: 'boolean' })
  enableDns64: boolean;

  @Column({ nullable: true, type: 'integer' })
  enableLniAtDeviceIndex: number;

  @OneToMany(() => SubnetIpv6CidrBlockAssociationEntity, (subnetIpv6CidrBlockAssociationEntity) => subnetIpv6CidrBlockAssociationEntity.subnet, {
    cascade: true,
    nullable: true,
  })
  ipv6CidrBlockAssociationSet: SubnetIpv6CidrBlockAssociationEntity[];

  @Column({ nullable: true, type: 'boolean' })
  ipv6Native: boolean;

  @Column({ nullable: true, type: 'boolean' })
  mapCustomerOwnedIpOnLaunch: boolean;

  @Column({ nullable: true, type: 'boolean' })
  mapPublicIpOnLaunch: boolean;

  @Column({ nullable: true, type: 'varchar' })
  outpostArn: string;

  @Column({ nullable: true, type: 'varchar' })
  ownerId: string;

  @OneToOne(() => PrivateDnsNameOptionsOnLaunchEntity, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  privateDnsNameOptionsOnLaunch: PrivateDnsNameOptionsOnLaunchEntity;

  @Column({ nullable: true, type: 'varchar' })
  state: string;

  @Column({ nullable: true, type: 'varchar' })
  subnetArn: string;

  @PrimaryColumn({ type: 'varchar' })
  subnetId: string;

  @ManyToMany(() => TagEntity, { cascade: true, nullable: true })
  @JoinTable()
  tags: TagEntity[];

  @Column({ nullable: true, type: 'varchar' })
  vpcId: string;

  static create(dto: SubnetDTO) {
    const subnet = new SubnetEntity();

    subnet.assignIpv6AddressOnCreation = dto.AssignIpv6AddressOnCreation;
    subnet.availabilityZone = dto.AvailabilityZone;
    subnet.availabilityZoneId = dto.AvailabilityZoneId;
    subnet.availableIpAddressCount = dto.AvailableIpAddressCount;
    subnet.cidrBlock = dto.CidrBlock;
    subnet.customerOwnedIpv4Pool = dto.CustomerOwnedIpv4Pool;
    subnet.defaultForAz = dto.DefaultForAz;
    subnet.enableDns64 = dto.EnableDns64;
    subnet.enableLniAtDeviceIndex = dto.EnableLniAtDeviceIndex;

    subnet.ipv6CidrBlockAssociationSet = dto.Ipv6CidrBlockAssociationSet.map((data) => SubnetIpv6CidrBlockAssociationEntity.create(data));

    subnet.ipv6Native = dto.Ipv6Native;
    subnet.mapCustomerOwnedIpOnLaunch = dto.MapCustomerOwnedIpOnLaunch;
    subnet.mapPublicIpOnLaunch = dto.MapCustomerOwnedIpOnLaunch;
    subnet.outpostArn = dto.OutpostArn;
    subnet.ownerId = dto.OwnerId;

    subnet.privateDnsNameOptionsOnLaunch = PrivateDnsNameOptionsOnLaunchEntity.create(dto.PrivateDnsNameOptionsOnLaunch);
    subnet.state = dto.State;

    subnet.subnetArn = dto.SubnetArn;
    subnet.subnetId = dto.SubnetId;

    subnet.tags = dto.Tags.map((tag) => TagEntity.create(tag as TagDTO));
    subnet.vpcId = dto.VpcId;

    return subnet;
  }
}
