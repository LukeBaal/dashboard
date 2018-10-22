import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Todo } from '../../model/Todo';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../model/Course';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  todo: Todo = {
    id: '',
    course: '',
    name: '',
    duedate: '',
    duetime: '23:59'
  };

  todo$: Observable<Todo>;

  courses: Course[];

  edit = false;

  constructor(
    private todoService: TodoService,
    private courseService: CourseService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });

    this.todo$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.todoService.getTodo(params.get('id')))
    );

    this.todo$.subscribe(item => {
      if (item !== null) {
        this.todo = item;
        this.edit = true;
      }
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
      if (this.edit) {
        // Update todo
        this.todoService.updateTodo(this.todo);
        // Show message
        this.flashMessage.show('Todo Updated', {
          cssClass: 'alert-warning',
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
      }
      this.router.navigate(['/todo']);
    }
  }
}
