import { Routes } from '@angular/router';
import {HomeComponent} from './home.component'
import {ProfileComponent} from './components/profile/profile.component';
import {AddNpoComponent} from './components/add-npo/add-npo.component';
import {NposComponent} from './components/npos/npos.component';
import {NpoComponent} from './components/npo/npo.component';

export const appRoutes: Routes = [


{ path: 'home', component: HomeComponent },
{path:'profile',component:ProfileComponent},
{ path: '', component: HomeComponent },
{path: 'addnpo', component: AddNpoComponent},
{path: 'npos', component: NposComponent},
{path: 'npo/:id', component: NpoComponent}

	


];

