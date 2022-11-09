import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SubnetCidrBlockStateDTO } from '../dto/subnet.dto';

@Entity()
export class SubnetCidrBlockStateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  state: string;

  @Column()
  statusMessage: string;

  static create(dto: SubnetCidrBlockStateDTO) {
    const subnetCidrBlockState = new SubnetCidrBlockStateEntity();
    subnetCidrBlockState.state = dto.State;
    subnetCidrBlockState.statusMessage = dto.StatusMessage;
    return subnetCidrBlockState;
  }
}
