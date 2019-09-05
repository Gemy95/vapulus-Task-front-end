import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { AddContactComponent } from './layouts/add-contact/add-contact.component';

const routes: Routes = [
  { path: 'home', component:HomeComponent },
  { path: 'add-contact' , component:AddContactComponent},
  { path: " " , redirectTo:'/home' , pathMatch:'full'},
  { path: '**' , component:HomeComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule ,
    RouterModule.forRoot(routes)
  ] ,
  exports: [RouterModule]
})
export class AppRoutingModule { }
