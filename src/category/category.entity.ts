import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from 'src/purchase/purchase.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @OneToMany(type => Purchase, purchase => purchase.category)
  purchases: Purchase[]
}
