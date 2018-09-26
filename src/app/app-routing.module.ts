import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodoComponent } from './components/todo/todo.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { EditScheduleComponent } from './components/edit-schedule/edit-schedule.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'todo', component: TodoComponent, canActivate: [AuthGuard] },
  { path: 'todo/add', component: AddTodoComponent, canActivate: [AuthGuard] },
  {
    path: 'schedule',
    component: ScheduleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'schedule/edit',
    component: EditScheduleComponent,
    canActivate: [AuthGuard]
  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
