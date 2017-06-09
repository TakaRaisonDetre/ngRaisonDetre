import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Auth} from '../../auth.service';
import {Http,Headers} from '@angular/http';


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
  private auth:Auth,
  private http:Http) {
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
 openCheckout() {
  
  let vm=this;
  
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_mlThqifXSfVi3vW2A7PdslSQ',
      locale: 'auto',
      
      token: function (token: any) {
        vm.http.get("https://us-central1-fir-starter-92cbd.cloudfunctions.net/paymentSub?amount=100&currency=usd&token="+token.id).subscribe(res=>{
          console.log("successfull ",res);
          
        })
      }
    });

    handler.open({
      name: 'move now',
      description: 'Test payment',
      amount: "100 cent"
    });

    
}

  openCheckoutOneTime() {
  
  let vm=this;
  
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_mlThqifXSfVi3vW2A7PdslSQ',
      locale: 'auto',
      token: function (token: any) {
        vm.http.get("https://us-central1-fir-starter-92cbd.cloudfunctions.net/payment?amount=100&currency=usd&token="+token.id).subscribe(res=>{
          console.log("successfull ",res);
          
        })
      }
    });

    handler.open({
      name: 'move now',
      description: 'Test payment',
      amount: "100 cent"
    });

    
}

}
