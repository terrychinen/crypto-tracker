// Angular framework imports
import { Routes } from '@angular/router';

// Components
import { DashboardComponent } from '@dashboard/dashboard.component';
import { CoinDetailComponent } from '@dashboard/components/coin-detail/coin-detail.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'coin/:id', component: CoinDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];
