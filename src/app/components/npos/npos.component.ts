import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
// model
import {Npo} from '../../models/npo';
//import {Category} from '../../models/category';
// This required for use of firebase image storage 
import * as firebase from 'firebase';

@Component({
  selector: 'app-npos',
  templateUrl: './npos.component.html',
  styleUrls: ['./npos.component.css'],
  providers: [FirebaseService]
})
export class NposComponent implements OnInit {
  npo: any;
  npos: Npo[];
  //categories : Category[];
  appState:string;
  activeKey:string;
  constructor(private _firebaseservice : FirebaseService) { }

   ngOnInit() {
    this._firebaseservice.getNpos().subscribe(npos=> {
      console.log(npos);
      this.npos = npos.reverse();
      // display with image
      for(let entry of npos){
        let storageRef = firebase.storage().ref();
        let spaceRef=storageRef.child("/npologo/npoimage/" + entry.path);
        if (entry.path) {
          storageRef.child(entry.path).getDownloadURL()
          .then((url)=>{
               entry.logoimage=url;
          });
        }
      }

    });
    // this._firebaseservice.getCategory().subscribe(category=>{
    //   console.log(category);
    //   this.categories = category;
    // });

  }
   changeState(state, key){
    console.log('changing state to' +state)
    if(key){
      console.log('Chaning key to:'+state+'-Key'+key);
      this.activeKey = key;
    }
    this.appState =state;
  }
}
