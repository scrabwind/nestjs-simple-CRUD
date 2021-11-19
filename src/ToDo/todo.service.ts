import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DateTime } from 'luxon'
import Todo from './todo.entity'
import CreateTodoDto from './create-todo.dto'

@Injectable()
export default class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todoRepository.find()
  }

  findOneById(id: number): Promise<Todo> {
    return this.todoRepository.findOne(id)
  }

  createOne(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo()
    todo.todo = createTodoDto.todo
    todo.isDone = createTodoDto.isDone
    return this.todoRepository.save(todo)
  }

  async updateOne(id: number, createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.findOne(id)
    if (!todo)
      throw new HttpException(
        'Entity with given id does not exist',
        HttpStatus.NOT_FOUND
      )
    const dt = DateTime.now().toSQL()
    const updatedTodo = { ...createTodoDto, lastUpdatedAt: dt }
    return this.todoRepository.save({
      ...todo,
      ...updatedTodo,
    })
  }

  async deleteOne(id: number): Promise<void | HttpException> {
    const todo = await this.todoRepository.findOne(id)
    if (!todo)
      throw new HttpException(
        'Entity with given id does not exist',
        HttpStatus.NOT_FOUND
      )
    this.todoRepository.delete(id)
  }
}
