import { Component, OnInit } from '@angular/core';
import {Auth} from '../../auth.service';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers : [FirebaseService]
})
export class NavbarComponent implements OnInit {

  constructor(private auth:Auth) { }

  ngOnInit() {
  }

}
