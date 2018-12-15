import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppRoutingModule } from './/app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TodoComponent } from './components/todo/todo.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { EditScheduleComponent } from './components/edit-schedule/edit-schedule.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LinksComponent } from './components/links/links.component';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { LinkSettingsComponent } from './components/link-settings/link-settings.component';
import { CourseSettingsComponent } from './components/course-settings/course-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    ScheduleComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AddTodoComponent,
    EditScheduleComponent,
    SettingsComponent,
    LinksComponent,
    TodoTableComponent,
    LinkSettingsComponent,
    CourseSettingsComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'dashboard'),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
