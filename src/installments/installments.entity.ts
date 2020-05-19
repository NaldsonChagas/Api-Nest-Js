import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, OneToOne } from 'typeorm';
import { Purchase } from 'src/purchase/purchase.entity';

@Entity()
export class Installments {
  @PrimaryGeneratedColumn()
  id: string

  @JoinColumn()
  @OneToOne(type => Purchase, purchase => purchase.installments)
  purchase: Purchase

  @Column({ default: 0 })
  installments: number
}
