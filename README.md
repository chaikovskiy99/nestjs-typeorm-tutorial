# A Note application to teach nestjs core concepts.


## What are Entity Listeners?
- **Entity classes in typeorm can have methods that perform some opeartions before,after, crud opeartions on entity in question.**

- These methods are decorated with decorators, such as 
  
  * @AfterLoad      -> executes each time entity is loaded using QueryBuilder or repository/manager find methods.
  
  * @BeforeInsert
    - executes before entering a record in the database table.(with save method)
  
  * @AfterInsert
    - executes after record is saved in database table with save method.
  
  * @AfterUpdate
    - will execute after a record is modified in the table using save, 
    but this will only work if information is changed in the model, if you save without modifying anything, it won't be called.

  * @BeforeUpdate
    - executes after save method updates a record, but if no data is 
    changed, it won't do anything.
  
  * @BeforeRemove
    - runs before any record is removed using remove method.

  * @AfterRemove
    - runs after any record is removed using remove method.

  * @BeforeSoftRemove
     - runs before any record is removed using soft remove method.
  
  * @AfterSoftRemove
    - runs after any record is removed using soft remove method.
  
  * @BeforeRecover
    - runs before any record is recovered using recover method.

  * @AfterRecover
  - runs after any record is recovered using recover method.
  
  > [!NOTE] 
  > Do not make any database calls within a listener, use subscribers to make database calls.


  ## How to decare listeners inside an entity?

  ```
  @Entity() 
  export class Post {
    @AfterLoad()
    updateCounters() {
      if(this.likeCounts === undefined) this.likeCounts = 0
    }
  }
  ```

  ## What are subscribers?

  > Event subscriber is a class that can listen to **specific entity events** or **any entity event**

  ## When and how events are generated? 
  
  > Events are firing using QueryBuilder and repository/manager methods.


## example of listening to specific entity event, Post entity.

  ```
@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface<Post> {
    /**
     * Indicates that this subscriber only listen to Post events.
     */
    listenTo() {
        return Post
    }

    /**
     * Called before post insertion.
     */
    beforeInsert(event: InsertEvent<Post>) {
        console.log(`BEFORE POST INSERTED: `, event.entity)
    }
}
```

## Listening for any entity event(leave out listenTo method and make entity type in every function as any)

```
@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface {
    /**
     * Called after entity is loaded.
     */
    afterLoad(entity: any) {
        console.log(`AFTER ENTITY LOADED: `, entity)
    }

    /**
     * Called before query execution.
     */
    beforeQuery(event: BeforeQueryEvent<any>) {
        console.log(`BEFORE QUERY: `, event.query)
    }

    /**
     * Called after query execution.
     */
    afterQuery(event: AfterQueryEvent<any>) {
        console.log(`AFTER QUERY: `, event.query)
    }

    /**
     * Called before entity insertion.
     */
    beforeInsert(event: InsertEvent<any>) {
        console.log(`BEFORE ENTITY INSERTED: `, event.entity)
    }

    /**
     * Called after entity insertion.
     */
    afterInsert(event: InsertEvent<any>) {
        console.log(`AFTER ENTITY INSERTED: `, event.entity)
    }

    /**
     * Called before entity update.
     */
    beforeUpdate(event: UpdateEvent<any>) {
        console.log(`BEFORE ENTITY UPDATED: `, event.entity)
    }

    /**
     * Called after entity update.
     */
    afterUpdate(event: UpdateEvent<any>) {
        console.log(`AFTER ENTITY UPDATED: `, event.entity)
    }

    /**
     * Called before entity removal.
     */
    beforeRemove(event: RemoveEvent<any>) {
        console.log(
            `BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `,
            event.entity,
        )
    }

    /**
     * Called after entity removal.
     */
    afterRemove(event: RemoveEvent<any>) {
        console.log(
            `AFTER ENTITY WITH ID ${event.entityId} REMOVED: `,
            event.entity,
        )
    }

    /**
     * Called before entity removal.
     */
    beforeSoftRemove(event: SoftRemoveEvent<any>) {
        console.log(
            `BEFORE ENTITY WITH ID ${event.entityId} SOFT REMOVED: `,
            event.entity,
        )
    }

    /**
     * Called after entity removal.
     */
    afterSoftRemove(event: SoftRemoveEvent<any>) {
        console.log(
            `AFTER ENTITY WITH ID ${event.entityId} SOFT REMOVED: `,
            event.entity,
        )
    }

    /**
     * Called before entity recovery.
     */
    beforeRecover(event: RecoverEvent<any>) {
        console.log(
            `BEFORE ENTITY WITH ID ${event.entityId} RECOVERED: `,
            event.entity,
        )
    }

    /**
     * Called after entity recovery.
     */
    afterRecover(event: RecoverEvent<any>) {
        console.log(
            `AFTER ENTITY WITH ID ${event.entityId} RECOVERED: `,
            event.entity,
        )
    }

    /**
     * Called before transaction start.
     */
    beforeTransactionStart(event: TransactionStartEvent) {
        console.log(`BEFORE TRANSACTION STARTED: `, event)
    }

    /**
     * Called after transaction start.
     */
    afterTransactionStart(event: TransactionStartEvent) {
        console.log(`AFTER TRANSACTION STARTED: `, event)
    }

    /**
     * Called before transaction commit.
     */
    beforeTransactionCommit(event: TransactionCommitEvent) {
        console.log(`BEFORE TRANSACTION COMMITTED: `, event)
    }

    /**
     * Called after transaction commit.
     */
    afterTransactionCommit(event: TransactionCommitEvent) {
        console.log(`AFTER TRANSACTION COMMITTED: `, event)
    }

    /**
     * Called before transaction rollback.
     */
    beforeTransactionRollback(event: TransactionRollbackEvent) {
        console.log(`BEFORE TRANSACTION ROLLBACK: `, event)
    }

    /**
     * Called after transaction rollback.
     */
    afterTransactionRollback(event: TransactionRollbackEvent) {
        console.log(`AFTER TRANSACTION ROLLBACK: `, event)
    }
}
```
  



