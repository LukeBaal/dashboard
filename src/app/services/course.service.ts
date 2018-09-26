import { Injectable } from '@angular/core';
import { Course } from '../model/Course';
import { Observable } from 'rxjs';
import {
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  AngularFirestore
} from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  coursesCollection: AngularFirestoreCollection<Course>;
  courseDoc: AngularFirestoreDocument<Course>;
  courses: Observable<Course[]>;
  course: Observable<Course>;
  uid: string;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.auth.getAuth().subscribe(user => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }

  getCourses(): Observable<Course[]> {
    this.coursesCollection = this.afs.collection(`users/${this.uid}/courses`);
    this.courses = this.coursesCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Course;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );

    return this.courses;
  }

  newCourse(course: Course) {
    this.coursesCollection.add(course);
  }

  updateCourse(course: Course) {
    this.courseDoc = this.afs.doc<Course>(
      `users/${this.uid}/courses/${course.id}`
    );
    this.courseDoc.update(course);
  }

  deleteCourse(course: Course) {
    this.courseDoc = this.afs.doc<Course>(
      `users/${this.uid}/courses/${course.id}`
    );
    this.courseDoc.delete();
  }
}
