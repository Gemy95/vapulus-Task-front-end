import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './layouts/home/home.component';
import { AddContactComponent } from './layouts/add-contact/add-contact.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule  } from "@angular/forms";    
import { FileSelectDirective } from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';  
import { environment } from '../environments/environment';  

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddContactComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, 
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
