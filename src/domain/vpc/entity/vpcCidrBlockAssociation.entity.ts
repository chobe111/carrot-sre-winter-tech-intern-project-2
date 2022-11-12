import { Entity, Column, OneToOne, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { VpcCidrBlockStateEntity } from './vpcCidrBlockState.entity';
import { VpcCidrBlockAssociationDTO } from '../dto/vpc.dto';
import { VpcEntity } from './vpc.entity';
// https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_VpcCidrBlockAssociation.html
@Entity()
export class VpcCidrBlockAssociationEntity {
  @PrimaryColumn({ type: 'varchar' })
  associationId: string;

  @Column({ type: 'varchar' })
  cidrBlock: string;
  // https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_VpcCidrBlockState.html

  @OneToOne(() => VpcCidrBlockStateEntity, { cascade: true })
  @JoinColumn()
  cidrBlockState: VpcCidrBlockStateEntity;

  @ManyToOne(() => VpcEntity, (vpc) => vpc.cidrBlockAssociationSet)
  @JoinColumn({ name: 'vpcId' })
  vpc: VpcEntity;

  static create(dto: VpcCidrBlockAssociationDTO) {
    const vpcCidrBlockAssociation = new VpcCidrBlockAssociationEntity();
    vpcCidrBlockAssociation.associationId = dto.AssociationId;
    vpcCidrBlockAssociation.cidrBlock = dto.CidrBlock;
    // // one to one create
    vpcCidrBlockAssociation.cidrBlockState = VpcCidrBlockStateEntity.create(dto.CidrBlockState);
    return vpcCidrBlockAssociation;
  }
}
