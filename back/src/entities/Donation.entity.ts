import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from './User.entity';

@Entity({ name: 'Donations' })
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', nullable: true })
  fullName: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  amount: string;

  @Column({ type: 'date', nullable: false, default: () => 'CURRENT_DATE' })
  date: Date;

  @ManyToOne(() => User, (user) => user.donations, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  user: User;
}