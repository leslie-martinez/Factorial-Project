import { PrimaryGeneratedColumn } from 'typeorm';
// abstract class from which all other entities will inherit
export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
}
