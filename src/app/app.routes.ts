import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NextComponent } from './pages/next/next.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { SearchComponent } from './pages/search/search.component';
import { SignedOutComponent } from './pages/signed-out/signed-out.component';
import { SignupComponent } from './pages/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'next',
    component: NextComponent
  },
  {
    path: 'profile-edit',
    component: ProfileEditComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'signed-out',
    component: SignedOutComponent
  },
  { path: '**', redirectTo: '' }
];
