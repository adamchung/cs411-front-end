import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {AuthGuard} from './shared/guards/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]}, {
    path: 'login',
    component: LoginComponent,
  }, {
    path: 'signup',
    component: SignupComponent,
  }, {
    path: '**',
    redirectTo: 'dashboard'
  }
]
