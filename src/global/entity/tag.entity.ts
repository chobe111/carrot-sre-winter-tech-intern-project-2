import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type TagDTO = {
  Key: string;
  Value: string;
};

@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'varchar' })
  value: string;

  static create(dto: TagDTO) {
    const tag = new TagEntity();
    tag.key = dto.Key;
    tag.value = dto.Value;

    return tag;
  }
}
