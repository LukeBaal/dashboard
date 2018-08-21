import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Todo } from '../../model/Todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  todo: Todo = {
    course: '',
    name: '',
    duedate: ''
  };
  duedate: string;
  duetime = '23:59';

  constructor(
    private todoService: TodoService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Todo; valid: boolean }) {
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // Add new todo
      value.duedate = new Date(`${this.duedate} ${this.duetime}`).toString();
      this.todoService.newTodo(value);
      // Show message
      this.flashMessage.show('New todo added', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      this.router.navigate(['/todo']);
    }
  }
}
