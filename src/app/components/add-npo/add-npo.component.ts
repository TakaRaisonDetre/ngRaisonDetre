import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-add-npo',
  templateUrl: './add-npo.component.html',
  styleUrls: ['./add-npo.component.css']
})
export class AddNpoComponent  {


 // property required for input
 name:any;
 city:any;
 language:any;
 summary:any;
 website:any;
 category:any;
 logoimage:any;
 
  constructor(private _firebaseservice:FirebaseService, private router : Router) { }
  




// Data entry to npo
addNPO(){
  //check
  console.log(this.name);
// create object
let newnpo = {
  name:this.name,
  city:this.city,
  language:this.language,
  summary:this.summary,
  website:this.website,
  category:this.category
  }
// add newbusiness to firebase database
this._firebaseservice.addNpo(newnpo);
// Need to navigate to home
this.router.navigate(['/home']);
}


}
