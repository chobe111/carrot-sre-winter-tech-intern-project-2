// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeSubnets.html
// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_Subnet.html
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { State } from 'src/global/types/state';
import { SubnetIpv6CidrBlockAssociationEntity } from './subnetIpv6CidrBlockAssociation.entity';
import { TagDTO, TagEntity } from 'src/global/entity/tag.entity';
import { PrivateDnsNameOptionsOnLaunchEntity } from './privateDnsNameOptionsOnLaunch.entity';
import { SubnetDTO } from '../dto/subnet.dto';
import { VpcEntity } from 'src/domain/vpc/entity/vpc.entity';
@Entity()
export class SubnetEntity {
  @Column({ nullable: true })
  assignIpv6AddressOnCreation: boolean;

  @Column({ nullable: true })
  availabilityZone: string;

  @Column({ nullable: true })
  availabilityZoneId: string;

  @Column({ nullable: true })
  availableIpAddressCount: number;

  @Column({ nullable: true })
  cidrBlock: string;

  @Column({ nullable: true })
  customerOwnedIpv4Pool: string;

  @Column({ nullable: true })
  defaultForAz: boolean;

  @Column()
  enableDns64: boolean;

  @Column({ nullable: true })
  enableLniAtDeviceIndex: number;

  @OneToMany(() => SubnetIpv6CidrBlockAssociationEntity, (subnetIpv6CidrBlockAssociationEntity) => subnetIpv6CidrBlockAssociationEntity.subnet, {
    cascade: true,
    nullable: true,
  })
  ipv6CidrBlockAssociationSet: SubnetIpv6CidrBlockAssociationEntity[];

  @Column({ nullable: true })
  ipv6Native: boolean;

  @Column({ nullable: true })
  mapCustomerOwnedIpOnLaunch: boolean;

  @Column({ nullable: true })
  mapPublicIpOnLaunch: boolean;

  @Column({ nullable: true })
  outpostArn: string;

  @Column({ nullable: true })
  ownerId: string;

  @OneToOne(() => PrivateDnsNameOptionsOnLaunchEntity, {
    cascade: true,
    nullable: true,
  })
  @JoinColumn()
  privateDnsNameOptionsOnLaunch: PrivateDnsNameOptionsOnLaunchEntity;

  @Column({ type: 'enum', enum: State, nullable: true })
  state: State;

  @Column({ nullable: true })
  subnetArn: string;

  @PrimaryColumn()
  subnetId: string;

  @ManyToMany(() => TagEntity, { cascade: true, nullable: true })
  @JoinTable()
  tags: TagEntity[];

  @ManyToOne(() => VpcEntity, (vpcEntity) => vpcEntity.subnets)
  @JoinColumn({ name: 'vpcId' })
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
    subnet.state = dto.State as State;

    subnet.subnetArn = dto.SubnetArn;
    subnet.subnetId = dto.SubnetId;

    subnet.tags = dto.Tags.map((tag) => TagEntity.create(tag as TagDTO));
    subnet.vpcId = dto.VpcId;

    return subnet;
  }
}
