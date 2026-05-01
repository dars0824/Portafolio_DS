import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then((module) => module.HomeComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
