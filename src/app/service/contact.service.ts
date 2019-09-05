import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Contact } from '../view models/contact';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private HttpClient:HttpClient) { }

  //// read data contacts from recent-contact.json file
  getJosnRead() : Observable<any>
  {
      return this.HttpClient.get<any>("./assets/recent-contact.json");
  }

  // to add new contact to api heroku nodejs deploying
  postNewContact(obj :Contact) :Observable<any>
  {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
   return this.HttpClient.post <any>(`${environment.API_URL}addContact`,obj,httpOption);  
  }

// to get contacts from api heroku nodejs deploying
  getContactsFromServer():Observable<Contact[]>
  {
   return this.HttpClient.get <Contact[]>(`${environment.API_URL}getAllContacts`);
  }

}
