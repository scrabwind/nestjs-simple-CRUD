import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import TodoController from './todo.controller'
import TodoService from './todo.service'
import Todo from './todo.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), HttpModule],
  providers: [TodoService],
  controllers: [TodoController],
})
export default class TodoModule {}
