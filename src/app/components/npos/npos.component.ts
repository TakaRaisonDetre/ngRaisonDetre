import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
@Component({
  selector: 'app-npos',
  templateUrl: './npos.component.html',
  styleUrls: ['./npos.component.css']
})
export class NposComponent implements OnInit {
npo: any;

  constructor(private firebaseservice: FirebaseService) { }

  ngOnInit() {
   
   this.firebaseservice.getNpos().subscribe(npo=>{
   this.npo = npo;
   console.log(npo);
   });


  }

}
