import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todo.model';

const STORAGE_KEY = 'todos_v1';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>(this.load());
  todos$ = this.todosSubject.asObservable();

  private load(): Todo[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private save(todos: Todo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    this.todosSubject.next(todos);
  }

  add(title: string) {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      done: false,
      createdAt: Date.now()
    };

    const todos = [newTodo, ...this.load()];
    this.save(todos);
  }

  toggle(id: string) {
    const todos = this.load().map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    this.save(todos);
  }

  remove(id: string) {
    const todos = this.load().filter(t => t.id !== id);
    this.save(todos);
  }

  clearCompleted() {
    const todos = this.load().filter(t => !t.done);
    this.save(todos);
  }
}
