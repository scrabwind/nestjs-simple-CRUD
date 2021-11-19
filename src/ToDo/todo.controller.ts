/* eslint-disable class-methods-use-this */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common'
import { DeleteResult } from 'typeorm'
import Todo from './todo.entity'
import ToDoService from './todo.service'
import CreateTodoDto from './create-todo.dto'

@Controller('todos')
export default class TodoController {
  constructor(private todosService: ToDoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll()
  }

  @Get(':id')
  async findOneById(@Param('id') param: number): Promise<Todo> {
    const find = await this.todosService.findOneById(param)
    if (find) return find
    throw new HttpException('Not found', HttpStatus.NOT_FOUND)
  }

  @Post()
  @HttpCode(201)
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.createOne(createTodoDto)
  }

  @Put(':id')
  async update(
    @Param('id') param: number,
    @Body() createTodoDto: CreateTodoDto
  ): Promise<Todo> {
    return this.todosService.updateOne(param, createTodoDto)
  }

  @Delete(':id')
  delete(@Param('id') param: number): Promise<DeleteResult> {
    return this.todosService.deleteOne(param)
  }
}
