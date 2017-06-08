import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { AngularFire } from "angularfire2";
import { Http, Response }          from '@angular/http';
import {Router} from '@angular/router';

// Avoid name not found warnings
let Auth0Lock = require('auth0-lock').default;
let Auth0 =require('auth0-js').Authentication
console.log(Auth0);
;
var firebase=require('firebase');
var auth0 = new Auth0({ domain : 'takayasu.eu.auth0.com', clientID: '0n2ltNk3qOzRkf2LFh4VWpww2hDVxlTw'})

@Injectable()
export class Auth {
  lock = new Auth0Lock('0n2ltNk3qOzRkf2LFh4VWpww2hDVxlTw', 'takayasu.eu.auth0.com', {});
constructor(private af:AngularFire,private http: Http, private router:Router) {
   this.lock.on("authenticated", (authResult) => {
this.lock.getProfile(authResult.idToken, function(error:any, profile:any){
if(error){throw new Error(error);
}
localStorage.setItem('id_token', authResult.idToken);
localStorage.setItem('profile', JSON.stringify(profile));
}); 


let option={"client_id": "0n2ltNk3qOzRkf2LFh4VWpww2hDVxlTw",
  "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
  "id_token" : authResult.idToken,
 "api_type": "firebase"
  }

this.http.post("https://takayasu.eu.auth0.com/delegation",option).subscribe(res=>{
  console.log(res);
  let token=JSON.parse(res["_body"])["id_token"]
  firebase.auth().signInWithCustomToken(token).then(res=>{
    console.log(res)
       
})
});
           
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired('id_token');
    
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('property');  
     this.router.navigate(['/']);
}
}