import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import ToDoModule from './ToDo/todo.module'

@Module({
  imports: [TypeOrmModule.forRoot(), ToDoModule],
})
export default class AppModule {}
