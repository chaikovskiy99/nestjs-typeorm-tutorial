import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Note } from './notes/entities/notes.entity';
import { NotesModule } from './notes/notes.module';
import { UserSubscriber } from './subscribers/user.subscriber';
import { User } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';

@Module({
    imports: [TypeOrmModule.forRoot(
        {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'hello123',
            database: 'typeorm_notes_db',
            entities: [User, Note],
            synchronize: true,
            subscribers: [UserSubscriber]
        }
    ), UsersModule, NotesModule],
},
)
export class AppModule { }