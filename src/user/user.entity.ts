import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from 'src/purchase/purchase.entity';

import { Length, IsEmail, IsNotEmpty, Min } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Length(3, 20)
  @IsNotEmpty()
  name: string

  @Column()
  @Length(3, 20)
  @IsNotEmpty()
  surname: string

  @Column({ type: 'float' })
  monthlyIncome: number

  @Column()
  @IsEmail()
  email: string

  @Column({ select: false })
  @IsNotEmpty()
  password: string

  @OneToMany(type => Purchase, purchase => purchase.user)
  purchases: Purchase[]
}
