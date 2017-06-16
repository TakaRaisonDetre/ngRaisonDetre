import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
// import {HomeComponent} from './home.component'
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from './app.routs';

import { Auth } from './auth.service';
import { AngularFireModule } from 'angularfire2';
import { AddNpoComponent } from './components/add-npo/add-npo.component';
import { NposComponent } from './components/npos/npos.component';
import { NpoComponent } from './components/npo/npo.component';
import { FollowersComponent } from './components/followers/followers.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SpotifyService } from './services/spotify.service';

// Service
import { FirebaseService } from './services/firebase.service';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';


export const config = {
  apiKey: 'AIzaSyCamsDPXHFePQ8e4iL43nZZ-LZdTI3G1to',
  authDomain: 'mprototype-e0f50.firebaseapp.com',
  databaseURL: 'https://mprototype-e0f50.firebaseio.com',
  projectId: 'mprototype-e0f50',
  storageBucket: 'mprototype-e0f50.appspot.com',
  messagingSenderId: '963346300299'
};


@NgModule( {
  declarations: [
    AppComponent, HomeComponent,
    ProfileComponent, AddNpoComponent,
    NposComponent, NpoComponent,
    FollowersComponent, NavbarComponent, SearchComponent, HomeComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(config ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule, RouterModule.forRoot( appRoutes ),
  ],
  providers: [ Auth, FirebaseService, SpotifyService ],
  bootstrap: [ AppComponent ]
} )
export class AppModule {
}

