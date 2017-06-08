import { Component } from '@angular/core';
import {Auth} from './auth.service'
import {Http,Headers} from '@angular/http';
@Component({
  selector: 'home',
  template: '<button  class="btn btn-primary" (click)="openCheckoutOneTime()">checkout one time</button><button  class="btn btn-primary" (click)="openCheckout()">checkout subscription</button>',
  styleUrls: ['./app.component.css']
})
export class HomeComponent {
  constructor(private auth:Auth,private http:Http){
      
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
