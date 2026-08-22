import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'ordinances',
    loadComponent: () => import('./pages/ordinances/ordinances.page').then(m => m.OrdinancesPage)
  },
  {
    path: 'ordinance-detail',
    loadComponent: () => import('./pages/ordinance-detail/ordinance-detail.page').then(m => m.OrdinanceDetailPage)
  },
  {
    path: 'news',
    loadComponent: () => import('./pages/news/news.page').then(m => m.NewsPage)
  }
];
