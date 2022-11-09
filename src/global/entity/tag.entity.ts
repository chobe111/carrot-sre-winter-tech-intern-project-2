import { TagSpecificationFilterSensitiveLog } from '@aws-sdk/client-ec2';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

export type TagDTO = {
  Key: string;
  Value: string;
};

@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;

  static create(dto: TagDTO) {
    const tag = new TagEntity();
    tag.key = dto.Key;
    tag.value = dto.Value;

    return tag;
  }
}
