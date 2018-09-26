import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Todo } from '../../model/Todo';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../model/Course';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  todo: Todo = {
    course: '',
    name: '',
    duedate: '',
    duetime: '23:59'
  };

  courses: Course[];

  constructor(
    private todoService: TodoService,
    private courseService: CourseService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
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
      this.router.navigate(['/todo']);
    }
  }
}
