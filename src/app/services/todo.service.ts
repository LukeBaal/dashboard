import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from 'angularfire2/firestore';
import { Todo } from '../model/Todo';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosCollection: AngularFirestoreCollection<Todo>;
  todoDoc: AngularFirestoreDocument<Todo>;
  todos: Observable<Todo[]>;
  todo: Observable<Todo>;
  uid: string;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.auth.getAuth().subscribe(user => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }

  getCollection() {
    if (!this.uid) {
      return;
    }
    this.todosCollection = this.afs.collection(`users/${this.uid}/todos`);
  }

  getTodos(): Observable<Todo[]> {
    this.getCollection();
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Todo;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );

    return this.todos;
  }

  newTodo(todo: Todo) {
    this.todosCollection.add(todo);
  }

  getTodo(id: string): Observable<Todo> {
    this.todoDoc = this.afs.doc<Todo>(`users/${this.uid}/todos/${id}`);
    this.todo = this.todoDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Todo;
          data.id = action.payload.id;
          return data;
        }
      })
    );

    return this.todo;
  }

  updateTodo(todo: Todo) {
    this.todoDoc = this.afs.doc(`users/${this.uid}/todos/${todo.id}`);
    this.todoDoc.update(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoDoc = this.afs.doc(`users/${this.uid}/todos/${todo.id}`);
    this.todoDoc.delete();
  }
}
