import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { VpcDTO } from '../dto/vpc.dto';
import { VpcCidrBlockAssociationEntity } from './vpcCidrBlockAssociation.entity';
import { VpcIpv6CidrBlockAssociationEntity } from './vpcIpv6CidrBlockAssociation.entity';
import { TagEntity, TagDTO } from 'src/global/entity/tag.entity';
import { State } from 'src/global/types/state';
export enum InstanceTenancy {
  DEFAULT = 'default',
  DEDICATED = 'dedicated',
  HOST = 'host',
}

@Entity()
export class VpcEntity {
  @PrimaryColumn({})
  vpcId: string;

  @Column({ nullable: true, type: 'varchar' })
  cidrBlock: string;

  // one to many
  @OneToMany(
    () => VpcCidrBlockAssociationEntity,
    (vpcAssocition) => vpcAssocition.vpc,
    { cascade: true },
  )
  cidrBlockAssociationSet: VpcCidrBlockAssociationEntity[];

  @Column({ nullable: true, type: 'varchar' })
  dhcpOptionsId: string;

  @Column({ nullable: true, type: 'enum', enum: InstanceTenancy })
  instanceTenancy: InstanceTenancy;

  // one to many (this is unique)
  @OneToMany(
    () => VpcIpv6CidrBlockAssociationEntity,
    (vpcIpv6CidrBlockAssociation) => vpcIpv6CidrBlockAssociation.vpc,
    { cascade: true },
  )
  ipv6CidrBlockAssociationSet: VpcIpv6CidrBlockAssociationEntity[];
  @Column({ nullable: true, type: 'bool' })
  isDefault: boolean;

  @Column({ nullable: true, type: 'varchar' })
  ownerId: string;

  @Column({ nullable: true, type: 'enum', enum: State })
  state: State;

  //FK
  @ManyToMany(() => TagEntity, { cascade: true })
  @JoinTable()
  tags: TagEntity[];

  static create(dto: VpcDTO) {
    const vpc = new VpcEntity();
    vpc.cidrBlock = dto.CidrBlock;

    vpc.cidrBlockAssociationSet = dto.CidrBlockAssociationSet.map((cbas) =>
      VpcCidrBlockAssociationEntity.create(cbas),
    );

    vpc.dhcpOptionsId = dto.DhcpOptionsId;
    vpc.instanceTenancy = dto.InstanceTenancy as InstanceTenancy;

    vpc.ipv6CidrBlockAssociationSet = dto.Ipv6CidrBlockAssociationSet.map(
      (icbas) => VpcIpv6CidrBlockAssociationEntity.create(icbas),
    );

    vpc.isDefault = dto.IsDefault;
    vpc.ownerId = dto.OwnerId;
    vpc.state = dto.State as State;
    vpc.tags = dto.Tags.map((tag) => TagEntity.create(tag as TagDTO));
    vpc.vpcId = dto.VpcId;

    return vpc;
  }
}
