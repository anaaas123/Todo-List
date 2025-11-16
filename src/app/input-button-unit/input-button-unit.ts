import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-button-unit',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input #inputElementRef
           [value]="title"
           (keyup.enter)="add.emit(getInputValue($event))">

    <button (click)="add.emit(inputElementRef.value)">
      Save
    </button>
  `,

  styleUrls: ['./input-button-unit.css'],
})
export class InputButtonUnit {
  title = '';
  @Output() add = new EventEmitter<string>();

  changeTitle(newTitle: string) {
    this.title = newTitle;
  }

  getInputValue(event: Event) {
    return (event.target as HTMLInputElement).value;
  }
}
