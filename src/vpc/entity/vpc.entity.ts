import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { VpcDTO } from '../dto/vpc.dto';
import { VpcCidrBlockAssociation } from './vpcCidrBlockAssociation.entity';
import { VpcIpv6CidrBlockAssociation } from './vpcIpv6CidrBlockAssociation.entity';
import { Tag, TagDTO } from 'src/global/entity/tag.entity';
export enum InstanceTenancy {
  DEFAULT = 'default',
  DEDICATED = 'dedicated',
  HOST = 'host',
}

export enum VPCState {
  PENDING = 'pending',
  AVAILABLE = 'available',
}

@Entity()
export class Vpc {
  @PrimaryColumn({ type: 'varchar' })
  vpcId: string;

  @Column({ nullable: true, type: 'varchar' })
  cidrBlock: string;

  // one to many
  @OneToMany(
    () => VpcCidrBlockAssociation,
    (vpcAssocition) => vpcAssocition.associationId,
  )
  cidrBlockAssociationSet: VpcCidrBlockAssociation[];

  @Column({ nullable: true, type: 'varchar' })
  dhcpOptionsId: string;

  @Column({ nullable: true, type: 'enum', enum: InstanceTenancy })
  instanceTenancy: InstanceTenancy;

  // one to many (this is unique)
  @OneToMany(
    () => VpcIpv6CidrBlockAssociation,
    (vpcIpv6CidrBlockAssociation) => vpcIpv6CidrBlockAssociation.associationId,
  )
  ipv6CidrBlockAssociationSet: VpcIpv6CidrBlockAssociation[];

  @Column({ nullable: true, type: 'bool' })
  isDefault: boolean;

  @Column({ nullable: true, type: 'varchar' })
  ownerId: string;

  @Column({ nullable: true, type: 'enum', enum: VPCState })
  state: VPCState;

  //FK
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  static create(dto: VpcDTO) {
    const vpc = new Vpc();

    vpc.cidrBlock = dto.CidrBlock;
    vpc.cidrBlockAssociationSet = dto.CidrBlockAssociationSet.map((cbas) =>
      VpcCidrBlockAssociation.create(cbas),
    );
    vpc.dhcpOptionsId = dto.DhcpOptionsId;
    vpc.instanceTenancy = dto.InstanceTenancy as InstanceTenancy;
    vpc.ipv6CidrBlockAssociationSet = dto.Ipv6CidrBlockAssociationSet.map(
      (icbas) => VpcIpv6CidrBlockAssociation.create(icbas),
    );

    vpc.isDefault = dto.IsDefault;
    vpc.ownerId = dto.OwnerId;
    vpc.state = dto.State as VPCState;

    vpc.tags = dto.Tags.map((tag) => Tag.create(tag as TagDTO));
    return vpc;
  }
}
