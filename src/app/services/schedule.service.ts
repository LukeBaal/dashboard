import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from 'angularfire2/firestore';
import { Event } from '../model/Event';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { WeekDay } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  scheduleCollection: AngularFirestoreCollection<Event>;
  eventDoc: AngularFirestoreDocument<Event>;
  schedule: Observable<Event[]>;
  event: Observable<Event>;
  uid: string;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.auth.getAuth().subscribe(user => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }

  getSchedule(day: number): Observable<Event[]> {
    const weekday = WeekDay[day];
    this.scheduleCollection = this.afs.collection(
      `users/${this.uid}/${weekday}`
    );
    this.schedule = this.scheduleCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Event;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );

    return this.schedule;
  }

  newSchedule(event: Event) {
    this.scheduleCollection = this.afs.collection(`users/${this.uid}/schedule`);
    this.scheduleCollection.add(event);
  }

  getEvent(id: string): Observable<Event> {
    this.eventDoc = this.afs.doc<Event>(`users/${this.uid}/schedule/${id}`);
    this.event = this.eventDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Event;
          data.id = action.payload.id;
          return data;
        }
      })
    );

    return this.event;
  }

  updateEvent(event: Event) {
    this.eventDoc = this.afs.doc(`users/${this.uid}/schedule/${event.id}`);
    this.eventDoc.update(event);
  }

  deleteEvent(event: Event) {
    this.eventDoc = this.afs.doc(`users/${this.uid}/schedule/${event.id}`);
    this.eventDoc.delete();
  }
}
