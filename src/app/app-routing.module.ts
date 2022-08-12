import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/first-page/first-page.module').then(m => m.FirstPageModule)},
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), canLoad: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
