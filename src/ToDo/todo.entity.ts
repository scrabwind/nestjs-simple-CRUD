import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export default class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  todo: string

  @Column({ default: false })
  isDone: boolean

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdatedAt: Date
}
