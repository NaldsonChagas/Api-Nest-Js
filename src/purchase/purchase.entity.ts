import { PrimaryGeneratedColumn, Column, Entity, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn, Timestamp } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Category } from 'src/category/category.entity';
import { Installments } from 'src/installments/installments.entity';
import { Length, IsNotEmpty } from 'class-validator';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(2, 90)
  title: string

  @Column({ type: 'float' })
  value: number

  @Column()
  @IsNotEmpty()
  latitude: string

  @Column()
  @IsNotEmpty()
  longitude: string

  @OneToOne(type => Installments, installments => installments.purchase)
  installments: Installments

  @ManyToOne(type => User, user => user.purchases,
    { nullable: false })
  user: User

  @ManyToOne(type => Category, category => category.purchases)
  category: Category

  @Column({ type: 'date' })
  date: Date

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
