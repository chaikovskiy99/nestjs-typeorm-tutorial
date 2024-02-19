import { User } from 'src/users/entities/users.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

    listenTo() {
        return User;
    }

    beforeInsert(event: InsertEvent<User>): void | Promise<any> {
        console.log("before insert user")
        event.entity.phone = "432938532"
    }

    
}