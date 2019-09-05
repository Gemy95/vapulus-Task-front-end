import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { Contact } from 'src/app/view models/contact';
import { ContactService } from 'src/app/service/contact.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

// url to save images in it
const API_URL = `${environment.API_URL}api/upload`;

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})


export class AddContactComponent implements OnInit {

  // to upload image from angular to nodejs
  title = 'ng8fileupload';
  public uploader: FileUploader = new FileUploader({ url: API_URL, itemAlias: 'photo' });

  //regular expression to validate email and phone , code
  emailRegEx='^[a-zA-Z]{3,10}[0-9]{0,6}[.]{1}[a-zA-Z]{3,12}[0-9]{0,6}[@]{1}[a-z]{5,10}[.]{1}[a-z]{3,10}$';
  codeRegEx='^[+]{1}[0-9]{2,4}$';
  mobileNumberRegEx='^[0-9]{10,15}$'


  /// define Reactive form elements
  addContactForm = new FormGroup({
    firstName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    lastName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email: new FormControl('',[Validators.required,Validators.pattern(this.emailRegEx)]),
    code: new FormControl('',[Validators.required,Validators.pattern(this.codeRegEx)]),
    mobileNumber: new FormControl('',[Validators.required,Validators.pattern(this.mobileNumberRegEx)]),
    image: new FormControl('',[Validators.required])
  });


// get values from the form to show invalid values
get firstName(){
  return this.addContactForm.get("firstName");
 }
get lastName(){
  return this.addContactForm.get("lastName");
}
get email(){
  return this.addContactForm.get("email");
}
get code(){
  return this.addContactForm.get("code");
}
get mobileNumber(){
  return this.addContactForm.get("mobileNumber");
}
get image(){
  return this.addContactForm.get("image");
}

   // inject services
constructor(private Router:Router,private contactService:ContactService,private ToastrService: ToastrService)
 { }

  ngOnInit() {
    // to upload image from angular to nodejs
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
       //  console.log('ImageUpload:uploaded:', item, status, response);
        // alert('File uploaded successfully');
    };
  }

  
/// onSubmitAddContact called when submit form with validation to it's fields
  onSubmitAddContact()
  {
    // create new object from contact view model
   var contact =new Contact();
   contact.firstName=this.addContactForm.value.firstName;
   contact.lastName=this.addContactForm.value.lastName;
   contact.mobileNumber=this.addContactForm.value.code+this.addContactForm.value.mobileNumber;
   contact.email=this.addContactForm.value.email;
   contact.created_ts=new Date().toISOString();
   
 //  console.log(contact);

  setTimeout(()=>{
    // add new contacts to api nodejs in heroku server
    this.contactService.postNewContact(contact).subscribe(
      (data)=>{/*console.log(data);*/ this.showSuccessMessage(); },
      (err)=>{/*console.log(err);*/ this.showFailedMessage()},
      ()=>{
         this.Router.navigate(['/home']);
      }
    );
  },4000)


  }

  // onResetContact is called when cancel button is clicked and reset form then go to home page
  onResetContact()
  {
   this.addContactForm.reset(); 
   // navigate to show contacts home component
   this.Router.navigate(['/home']);
  }

  showSuccessMessage(){
    this.ToastrService.success('success Added!', 'Add new Contact Status',{
      timeOut: 4000
    });
  }
  showFailedMessage(){
    this.ToastrService.error('failed Added!', 'Add new Contact Status',{
      timeOut: 4000
    });
  }

}
