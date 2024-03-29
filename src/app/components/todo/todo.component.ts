import { Component, OnInit, Input } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../model/Todo';
import * as moment from 'moment';

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
    nextWeek: Todo[];
    future: Todo[];
  };

  @Input()
  canEdit = true;

  @Input()
  showFuture = true;

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
      nextWeek: [],
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
        } else if (days < 14) {
          sortedTodos.nextWeek.push(todo);
        } else {
          sortedTodos.future.push(todo);
        }
      });
      for (const key in sortedTodos) {
        if (sortedTodos.hasOwnProperty(key)) {
          sortedTodos[key] = this.sortByDate(sortedTodos[key]);
        }
      }
      this.todos = sortedTodos;
    });
  }

  sortByDate(todos: Todo[]): Todo[] {
    return todos.sort((a, b) => {
      const dateA = new Date(`${a.duedate} ${a.duetime}`);
      const dateB = new Date(`${b.duedate} ${b.duetime}`);
      return dateA.valueOf() - dateB.valueOf();
    });
  }

  onDeleteEvent(todo: Todo) {
    if (confirm(`Delete '${todo.course} ${todo.name}'?`)) {
      this.todoService.deleteTodo(todo);
      this.getTodos();
      this.flashMessage.show('Todo deleted', {
        cssClass: 'alert-success',
        timeout: 4000
      });
    }
  }

  daysLeft(date: string): number {
    const today = moment().startOf('days');
    const dueDate = moment(date);

    const diff = dueDate.diff(today, 'days');

    return diff;
  }
}
