import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  phoneNumber: string;
  @Column()
  address: string;
  @Column()
  state: string;
  @Column()
  country: string;
}
