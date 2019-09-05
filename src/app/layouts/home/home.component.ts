import { Component, OnInit,AfterViewInit ,ViewChild, ElementRef} from '@angular/core';
import { ContactService } from 'src/app/service/contact.service';
import { Contact } from 'src/app/view models/contact';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit , AfterViewInit {
@ViewChild('firstDiv', { static: false }) firstDiv:ElementRef;
@ViewChild('secondDiv', { static: false }) secondDiv:ElementRef;

  letterArray:Array<String>;
  contactsArray:Array<Contact>;
  tempArray:Array<Contact>;
  arrayFromServer:Array<Contact>;
  currentLetter:String;
  customArrayOrderdByDate:Array<Contact>;


  searchValue:String;
  searchCurrentLetter:String;
  searchContacts:Array<Contact>;
  searchTemp:Array<Contact>;
  searchContatsAfter:Array<Contact>;
  searchArrayFromServer:Array<Contact>;

  // inject services
  constructor(private ContactService:ContactService) {
    /// intialize values
    this.letterArray=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.contactsArray=[];
    this.tempArray=[];
    this.currentLetter="";    
    this.searchValue="";
    this.searchTemp=[];
    this.searchContacts=[];
    this.searchContatsAfter=[];
    this.searchCurrentLetter="";
    this.arrayFromServer=[];
    this.searchArrayFromServer=[];
    this.customArrayOrderdByDate=[];
   }

  ngOnInit() {
    // read contacts from data from recent-contact.json file
    this.ContactService.getJosnRead().subscribe(
      (dataObj)=>{
        this.tempArray=dataObj.data;
      },
      (err)=>{/*console.log(err)*/},
      ()=>{
    // read contacts from api nodejs from heroku deploying that i added them from my add-contact component 
        this.ContactService.getContactsFromServer().subscribe((data)=>{
          this.arrayFromServer=data;
          for(let i=0;i<data.length;i++)
          {
            this.arrayFromServer[i].image=`${environment.API_URL}uploads/`+this.arrayFromServer[i].image;
           // console.log(this.arrayFromServer[i].image);
          }
          this.tempArray.push(...this.arrayFromServer);
          this.contactsArray= this.tempArray.sort(this.compareByDate);
          /// now we get latest two objects in array then remove them from contacts array
          this.customArrayOrderdByDate.push(this.contactsArray[this.contactsArray.length-1]);
          this.customArrayOrderdByDate.push(this.contactsArray[this.contactsArray.length-2]);
          this.contactsArray.splice(this.contactsArray.length-1, 1);
          this.contactsArray.splice(this.contactsArray.length-1, 1);
          // then we make order by alphabetics and remove 
          this.contactsArray= this.tempArray.sort(this.compareByfirstName);
          //console.log(this.contactsArray);
        },(err)=>{/*console.log(err)*/})
          
      }
    );
  
  }

  ngAfterViewInit()
  {
     // this.secondDiv.nativeElement.style.height= this.firstDiv.nativeElement.style.height;
     // this.secondDiv.nativeElement.style.backgroundColor="red";
  }

  // compare function to make sort contacts array depending on firstName property of each object 
   compareByfirstName( a , b ) {
    if ( a.firstName < b.firstName ){
      return -1;
    }
    else if ( a.firstName > b.firstName ){
      return 1;
    }
    return 0;
  }


  compareByDate( a , b) {
    return +new Date(a.created_ts) - +new Date(b.created_ts);
  }



// checkSearchValue function to check if the search input text is empty or not
  chackSearchValue()
  {
    if( this.searchValue == "" )
       return false;
    else
       return true;   
  }


  // applayFilter function to filter contacts array depending on value of search input text 
  applyFilter() {
    this.searchCurrentLetter="";
    this.currentLetter="";
    this.ContactService.getJosnRead().subscribe(
      (dataObj)=>{
        this.searchTemp=[];
        this.searchContacts=[];
        this.searchContatsAfter=[];
        this.searchCurrentLetter="";
        this.searchArrayFromServer=[];

        this.searchTemp=dataObj.data;

      },
      (err)=>{/*console.log(err)*/}
      ,
       ()=>{
          this.ContactService.getContactsFromServer().subscribe((data)=>{
            this.searchArrayFromServer=data;
            for(let i=0;i<this.searchArrayFromServer.length;i++)
            {
         this.searchArrayFromServer[i].image=`${environment.API_URL}uploads/`+this.searchArrayFromServer[i].image;
             // console.log(this.arrayFromServer[i].image);
            }
            this.searchTemp.push(...this.searchArrayFromServer);
            this.searchContacts= this.searchTemp.sort(this.compareByfirstName);
          },(err)=>{/*console.log(err)*/}
          ,()=>{
            this.searchContacts.filter((val) => {
              var fullName= val.firstName +" "+val.lastName;
              if( fullName.indexOf(this.searchValue.toString()) > -1)
              this.searchContatsAfter.push(val);
             });
          }
          );  
       }
    );

   }

   // isCurrentLetterChange to check the first character value to make grouping contacts without search
   isCurrentLetterChange(testedLetter:string)
   {
       if(this.currentLetter.toString() != testedLetter)
       {
           this.currentLetter=testedLetter;
           return true;
       }
       else
       {
           return false;
       }
     
   }

 // isSearchCurrentLetterChange to check the first character value to make grouping contacts with search
   isSearchCurrentLetterChange(testedLetter:string,counter:number)
   {
       if(counter==0)
       {
       this.searchCurrentLetter=""; 
       }
       if(this.searchCurrentLetter.toString() != testedLetter)
       {
           this.searchCurrentLetter=testedLetter;
           return true;
       }
       else
       {
           return false;
       }
     
   }

}
