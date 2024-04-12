import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm"

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    name: string

    @Column('decimal')
    price: number

    @Column('int')
    quantity: number

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    updated_at: Date
}