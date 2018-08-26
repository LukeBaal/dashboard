import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/Course';
import { CourseService } from '../../services/course.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-course-settings',
  templateUrl: './course-settings.component.html',
  styleUrls: ['./course-settings.component.css']
})
export class CourseSettingsComponent implements OnInit {
  courses: Course[];
  course: Course = {
    name: '',
    code: '',
    color: ''
  };

  update = false;
  constructor(
    private courseService: CourseService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  onSubmit({ value, valid }: { value: Course; valid: boolean }) {
    if (!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // Check if updating existing event, or new event being added
      if (this.update) {
        value.id = this.course.id;
        this.courseService.updateCourse(value);
        // Show message
        this.flashMessage.show('Course updated', {
          cssClass: 'alert-warning',
          timeout: 4000
        });
        this.update = false;
      } else {
        this.courseService.newCourse(value);
        // Show message
        this.flashMessage.show('New course added', {
          cssClass: 'alert-success',
          timeout: 4000
        });
      }
    }
    this.course = {
      id: '',
      name: '',
      code: '',
      color: ''
    };
  }

  onEdit(course: Course) {
    this.course = course;
    this.update = true;
  }

  onDelete(course: Course) {
    if (confirm('Are you sure?')) {
      this.courseService.deleteCourse(course);
      this.flashMessage.show('Course removed', {
        cssClass: 'alert-success',
        timeout: 4000
      });
    }
  }
}
