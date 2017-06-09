import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
// model
import {Npo} from '../../models/npo';
import {Category} from '../../models/category';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-npo',
  templateUrl: './add-npo.component.html',
  styleUrls: ['./add-npo.component.css'],
   providers: [FirebaseService]
})

export class AddNpoComponent implements OnInit {

categories: Category[];

 // property required for input
 name:any;
 city:any;
 streetAddress:any;
 country:any;
 zip:any;
 language:any;
 summary:any;
 website:any;
 category:any;
 logoimage:any;

 latitude:any;
 longitude:any;

  constructor(private _firebaseservice:FirebaseService, private router : Router) { }
  

  // We require category on ngOnInit to allow users to select NPO category
  ngOnInit() {
    this._firebaseservice.getCategory().subscribe(category=>{
      console.log(category);
      this.categories = category;
    });
   
  }



// Data entry to npo
addNPO(){
  //check
  console.log(this.name);
// create object
let newnpo = {
  name:this.name,
  city:this.city,

  streetAddress: this.streetAddress,
  country:this.country,
  zip:this.country,
  
  language:this.language,
  summary:this.summary,
  website:this.website,
  category:this.category,
  latitude:this.latitude,
  longitude:this.longitude
  }
// add newbusiness to firebase database
this._firebaseservice.addNpo(newnpo);
// Need to navigate to home
this.router.navigate(['/home']);
}


}

