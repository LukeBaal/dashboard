import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../model/Todo';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit() {}

  onEdit(todo: Todo) {
    this.router.navigate(['todo/add', todo.id]);
  }

  onDelete(todo: Todo) {
    this.deleteEvent.emit(todo);
  }
}
