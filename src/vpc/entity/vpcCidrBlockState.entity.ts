import { CidrState } from 'src/global/types/state';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { VpcCidrBlockStateDTO } from '../dto/vpc.dto';

@Entity()
export class VpcCidrBlockStateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: CidrState })
  state: CidrState;

  @Column()
  statusMessage: string;

  static create(dto: VpcCidrBlockStateDTO) {
    const vpcCidrBlockState = new VpcCidrBlockStateEntity();
    vpcCidrBlockState.state = dto.State as CidrState;
    vpcCidrBlockState.statusMessage = dto.StatusMessage;
    return vpcCidrBlockState;
  }
}
