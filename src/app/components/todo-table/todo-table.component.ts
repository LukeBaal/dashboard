import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../model/Todo';

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.css']
})
export class TodoTableComponent implements OnInit {
  @Input()
  todos: Todo[];

  @Input()
  title: string;

  @Input()
  canEdit = true;

  @Output()
  deleteEvent: EventEmitter<Todo> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onDelete(todo: Todo) {
    this.deleteEvent.emit(todo);
  }
}
