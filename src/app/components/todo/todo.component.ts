import { Component, OnInit, Input } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../model/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: {
    overdue: Todo[];
    today: Todo[];
    tomorrow: Todo[];
    thisWeek: Todo[];
    future: Todo[];
  };

  @Input()
  canEdit = true;

  constructor(
    private flashMessage: FlashMessagesService,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos() {
    const sortedTodos = {
      overdue: [],
      today: [],
      tomorrow: [],
      thisWeek: [],
      future: []
    };
    this.todoService.getTodos().subscribe(todos => {
      todos.forEach(todo => {
        const days = this.daysLeft(todo.duedate);
        if (days < 0) {
          sortedTodos.overdue.push(todo);
        } else if (days === 0) {
          sortedTodos.today.push(todo);
        } else if (days === 1) {
          sortedTodos.tomorrow.push(todo);
        } else if (days < 7) {
          sortedTodos.thisWeek.push(todo);
        } else {
          sortedTodos.future.push(todo);
        }
      });
      this.todos = sortedTodos;
    });
  }

  onDeleteEvent(todo: Todo) {
    if (confirm('Are you sure?')) {
      this.todoService.deleteTodo(todo);
      this.getTodos();
      this.flashMessage.show('Todo deleted', {
        cssClass: 'alert-success',
        timeout: 4000
      });
    }
  }

  daysLeft(date: string): number {
    const today = new Date();
    const dueDate = new Date(date);
    const day = 1000 * 60 * 60 * 24;

    const diff = dueDate.valueOf() - today.valueOf();
    return Math.floor(diff / day);
  }
}
