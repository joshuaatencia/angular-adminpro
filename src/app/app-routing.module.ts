import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFaoundComponent } from './no-page-faound/no-page-faound.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [
  {path: '', redirectTo:'/dashboard', pathMatch:'full'},
  { path: '**', component: NoPageFaoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    PagesRoutingModule,
    AuthRoutingModule
  ]
})
export class AppRoutingModule { }
