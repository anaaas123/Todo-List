import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todos.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly storageKey = 'todo-list-items-v1';
  private _todos = new BehaviorSubject<Todo[]>(this.load());
  todos$ = this._todos.asObservable();
  private idCounter = Date.now();

  private load(): Todo[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private save(items: Todo[]) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch {
      // ignore
    }
  }

  getSnapshot(): Todo[] {
    return this._todos.value;
  }

  add(title: string) {
    const t = (title || '').trim();
    if (!t) return;
    const item: Todo = { id: ++this.idCounter, title: t, done: false };
    const next = [...this._todos.value, item];
    this._todos.next(next);
    this.save(next);
  }

  remove(id: number) {
    const next = this._todos.value.filter((x) => x.id !== id);
    this._todos.next(next);
    this.save(next);
  }

  toggle(id: number) {
    const next = this._todos.value.map((x) => (x.id === id ? { ...x, done: !x.done } : x));
    this._todos.next(next);
    this.save(next);
  }
}
