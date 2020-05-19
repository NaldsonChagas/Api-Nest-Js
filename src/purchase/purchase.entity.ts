import { PrimaryGeneratedColumn, Column, JoinColumn, Entity, OneToOne, JoinTable, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
import { Installments } from 'src/installments/installments.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  value: number

  @Column()
  latitude: string

  @Column()
  longitude: string

  @OneToOne(type => Installments, installments => installments.purchase)
  installments: Installments

  @ManyToOne(type => User, user => user.purchases)
  user: User

  @ManyToOne(type => Category, category => category.purchases)
  category: Category
}
