import { Component } from '@angular/core';
import {Auth} from '../../auth.service';
import {AngularFire} from 'angularfire2';
import {FirebaseService} from'../../services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    profile:any;

  constructor(private auth:Auth,
  private _firebaseservice:FirebaseService,
  private af: AngularFire)
  
  {
 // Get Json data of profile info from auth0 and part them for use 
  this.profile = JSON.parse(localStorage.getItem('profile'));
  }
}

