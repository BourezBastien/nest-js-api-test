import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('numeric')
    clientId: number;

    @Column()
    clientFirstName: string;

    @Column()
    clientLastName: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

}
