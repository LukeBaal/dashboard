import { Injectable } from '@angular/core';
import { User } from '../model/User';
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
export class UserService {
  userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;
  uid: string;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.auth.getAuth().subscribe(user => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }

  getUser(): Observable<any> {
    this.userDoc = this.afs.doc<User>(`users/${this.uid}`);
    this.user = this.userDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          return action.payload.data();
        }
      })
    );

    return this.user;
  }

  updateUser(user: User) {
    this.userDoc = this.afs.doc<User>(`users/${this.uid}`);
    this.userDoc.update(user);
  }
}
