import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Repository } from 'typeorm';


@Entity('user')
export class UserEntity {

    @ApiHideProperty()
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @ApiProperty({ description: 'The is unique client id' })
    @Column('numeric', { unique: true })
    @Length(11,11)
    clientId: number;

    @ApiProperty({ description: 'The is fist name of client' })
    @Column()
    clientFirstName: string;

    @ApiProperty({ description: 'The is last name of client' })
    @Column()
    clientLastName: string;

    @ApiHideProperty()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

}