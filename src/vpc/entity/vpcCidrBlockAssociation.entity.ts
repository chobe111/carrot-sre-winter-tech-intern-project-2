import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Vpc } from './vpc.entity';
import { VpcCidrBlockState } from './vpcCidrBlockState.entity';
import { VpcCidrBlockAssociationDTO } from '../dto/vpc.dto';
// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_VpcCidrBlockAssociation.html
@Entity()
export class VpcCidrBlockAssociation {
  @PrimaryColumn()
  associationId: string;

  @Column({ type: 'varchar' })
  cidrBlock: string;
  // https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_VpcCidrBlockState.html

  @ManyToMany(() => VpcCidrBlockState)
  @JoinTable()
  cidrBlockState: VpcCidrBlockState;

  @ManyToOne(() => Vpc, (vpc) => vpc.cidrBlockAssociationSet)
  @JoinColumn({ name: 'vpcId' })
  vpc: Vpc;

  static create(dto: VpcCidrBlockAssociationDTO) {
    const vpcCidrBlockAssociation = new VpcCidrBlockAssociation();
    vpcCidrBlockAssociation.associationId = dto.AssociationId;
    vpcCidrBlockAssociation.cidrBlock = dto.CidrBlock;
    // // one to one create
    vpcCidrBlockAssociation.cidrBlockState = VpcCidrBlockState.create(
      dto.CidrBlockState,
    );
    return vpcCidrBlockAssociation;
  }
}
