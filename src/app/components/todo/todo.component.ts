import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../model/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[];

  constructor(
    private flashMessage: FlashMessagesService,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  onDelete(todo: Todo) {
    if (confirm('Are you sure?')) {
      this.todoService.deleteTodo(todo);
      this.flashMessage.show('Todo deleted', {
        cssClass: 'alert-success',
        timeout: 4000
      });
    }
  }
}
