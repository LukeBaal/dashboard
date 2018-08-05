import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../model/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  todo: Todo = {
    course: '',
    name: '',
    duedate: ''
  };

  constructor(
    private flashMessage: FlashMessagesService,
    private todoService: TodoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  onSubmit({ value, valid }: { value: Todo; valid: boolean }) {
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // Add new todo
      this.todoService.newTodo(value);
      // Show message
      this.flashMessage.show('New todo added', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      // Redirect to dash
      this.router.navigate(['/']);
    }
  }
}
