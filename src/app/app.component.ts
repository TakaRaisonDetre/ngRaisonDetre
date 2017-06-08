import { Component } from '@angular/core';
import {Auth} from './auth.service';
import {FirebaseService} from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirebaseService]
})
export class AppComponent {
  constructor(private auth:Auth)
  {
    
  }
}
