import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToOne, Unique } from 'typeorm';
import { Purchase } from 'src/purchase/purchase.entity';

@Entity()
export class Installments {
  @PrimaryGeneratedColumn()
  id: string

  @JoinColumn()
  @OneToOne(type => Purchase, purchase => purchase.installments,
    { onDelete: 'CASCADE' })
  purchase: Purchase

  @Column({ default: 0 })
  installments: number

  @Column({ type: 'date' })
  start: Date

  @Column({ type: 'date' })
  end: Date
}
