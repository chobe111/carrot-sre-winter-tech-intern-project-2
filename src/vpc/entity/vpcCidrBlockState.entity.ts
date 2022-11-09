import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { VpcCidrBlockStateDTO } from '../dto/vpc.dto';

export enum CidrState {
  ASSOCIATING = 'associating',
  ASSOCIATED = 'associated',
  DISASSOCIATING = 'disassociationg',
  FAILING = 'failing',
  FAILED = 'failed',
  EMPTY = '',
}

@Entity()
export class VpcCidrBlockState {
  @PrimaryColumn()
  state: CidrState;

  @PrimaryColumn({ default: '' })
  statusMessage: string;

  static create(dto: VpcCidrBlockStateDTO) {
    const vpcCidrBlockState = new VpcCidrBlockState();
    vpcCidrBlockState.state = dto.State as CidrState;
    vpcCidrBlockState.statusMessage = dto.StatusMessage;
    return vpcCidrBlockState;
  }
}
