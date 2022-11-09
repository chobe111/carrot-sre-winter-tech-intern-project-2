import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { VpcCidrBlockStateDTO } from '../dto/vpc.dto';

export enum CidrState {
  ASSOCIATING = 'associating',
  ASSOCIATED = 'associated',
  DISASSOCIATING = 'disassociationg',
  FAILING = 'failing',
  FAILED = 'failed',
}

@Entity()
export class VpcCidrBlockState {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: CidrState })
  state: CidrState;

  @Column({ type: 'varchar' })
  statusMessage: string;

  static create(dto: VpcCidrBlockStateDTO) {
    const vpcCidrBlockState = new VpcCidrBlockState();
    vpcCidrBlockState.state = dto.State as CidrState;
    vpcCidrBlockState.statusMessage = dto.StatusMessage;
    return vpcCidrBlockState;
  }
}
