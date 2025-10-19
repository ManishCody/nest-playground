import { Entity , PrimaryGeneratedColumn , Column } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    name: string

}