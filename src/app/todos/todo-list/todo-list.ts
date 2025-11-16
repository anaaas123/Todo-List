import { Component } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, NgForOf],
  template: `
    <ul>
      <li *ngFor="let todo of todoService.todos$ | async; trackBy: trackById">
        <input type="checkbox" [checked]="todo?.done" (change)="todo?.id && todoService.toggle(todo.id)">
        <span [style.textDecoration]="todo?.done ? 'line-through' : 'none'">{{ todo?.title }}</span>
        <button (click)="todo?.id && todoService.remove(todo.id)">Delete</button>
      </li>
    </ul>
  `,
  styleUrls: ['./todo-list.css'],
})
export class TodoList {
  constructor(public todoService: TodoService) {}

  trackById(_index: number, item: { id?: number }) {
    return item?.id ?? _index;
  }
}
