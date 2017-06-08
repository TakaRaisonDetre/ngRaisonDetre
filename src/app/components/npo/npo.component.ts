import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Auth} from '../../auth.service';


@Component({
  selector: 'app-npo',
  templateUrl: './npo.component.html',
  styleUrls: ['./npo.component.css']
})
export class NpoComponent implements OnInit {
id:any;
npo:any;
imageUrl:any;
profile:any;

  constructor(private firebaseservice: FirebaseService,
  private router: Router,
  private route:ActivatedRoute,
  private auth:Auth) {
     this.profile = JSON.parse(localStorage.getItem('profile'));
   }

  ngOnInit() {
  
  this.id=this.route.snapshot.params['id'];
  this.firebaseservice.getNpoDetail(this.id).subscribe(lst=>{
  this.npo = lst;
  
  });

}
followthisNPO(){

let currentUserId = this.profile.user_id;
let currentNpoKey = this.id;
this.firebaseservice.follownpo(currentUserId,currentNpoKey);



}

}
