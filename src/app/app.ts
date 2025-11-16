import { Component } from '@angular/core';
import { InputButtonUnit } from './input-button-unit/input-button-unit';
import { TodoList } from './todos/todo-list/todo-list';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InputButtonUnit, TodoList],
  template: `
    <div class="app-root">
      <div class="app-card">
        <h1>Welcome to todo-list!</h1>

        <app-input-button-unit (add)="add($event)"></app-input-button-unit>

        <app-todo-list></app-todo-list>
      </div>
    </div>
  `,
  styleUrls: ['./app.css'],
})
export class App {
  constructor(private todoService: TodoService) {}

  add(title: string) {
    this.todoService.add(title);
  }
}
