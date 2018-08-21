import { Injectable } from '@angular/core';
import { Semester } from '../model/Semester';
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
export class DateService {
  semesterDoc: AngularFirestoreDocument<Semester>;
  semester: Observable<Semester>;
  uid: string;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.auth.getAuth().subscribe(user => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }

  newSemester(semester: Semester) {
    const semesterDoc = this.getSemester();
    semesterDoc.subscribe(doc => {
      console.log(doc);
    });
  }

  getSemester(): Observable<any> {
    this.semesterDoc = this.afs.doc<Semester>(`users/${this.uid}`);
    this.semester = this.semesterDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          return action.payload.data();
        }
      })
    );

    return this.semester;
  }

  updateSemester(semester: Semester) {
    this.semesterDoc = this.afs.doc<Semester>(`users/${this.uid}`);
    this.semesterDoc.update(semester);
  }
}
