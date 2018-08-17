import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from 'angularfire2/firestore';
import { Link } from '../model/Link';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  linksCollection: AngularFirestoreCollection<Link>;
  linkDoc: AngularFirestoreDocument<Link>;
  links: Observable<Link[]>;
  link: Observable<Link>;
  uid: string;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.auth.getAuth().subscribe(user => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }

  getLinks(): Observable<Link[]> {
    this.linksCollection = this.afs.collection(`users/${this.uid}/links`);
    this.links = this.linksCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Link;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );

    return this.links;
  }

  newLink(link: Link) {
    this.linksCollection.add(link);
  }

  getLink(id: string): Observable<Link> {
    this.linkDoc = this.afs.doc<Link>(`users/${this.uid}/links/${id}`);
    this.link = this.linkDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Link;
          data.id = action.payload.id;
          return data;
        }
      })
    );

    return this.link;
  }

  updateLink(link: Link) {
    this.linkDoc = this.afs.doc<Link>(`users/${this.uid}/links/${link.id}`);
    this.linkDoc.update(link);
  }

  deleteLink(link: Link) {
    this.linkDoc = this.afs.doc<Link>(`users/${this.uid}/links/${link.id}`);
    this.linkDoc.delete();
  }
}
