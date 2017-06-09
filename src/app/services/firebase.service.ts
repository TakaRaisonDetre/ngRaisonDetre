import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import 'rxjs/add/operator/map';
// fb storate use
import * as firebase from 'firebase';
//Model
import {Category} from '../models/category';
import {Npo} from '../models/npo'

@Injectable()
export class FirebaseService{
 
 // property
  npos:FirebaseListObservable<any[]>;
  npo: FirebaseObjectObservable<any>;
  categories:FirebaseListObservable<Category[]>; 
  
  folder: any;
  folder2:any;

constructor(private _af:AngularFire){
   // firebase folder name
    this.folder = 'npologo';
    this.folder2 = 'npologo/npoimage'
}

getNpos(){
this.npos = this._af.database.list('/npos') as FirebaseListObservable<Npo[]>;
return this.npos;
}
getNpoDetail(id){
this.npo = this._af.database.object('/npos/' + id) as FirebaseObjectObservable<Npo>
return this.npo;
}

// add npo data with images
addNpo(newnpo){
// // Create root ref
  let storageRef = firebase.storage().ref();
  this.npos = this._af.database.list('/npos');
  for(let selectedFile of [(<HTMLInputElement>document.getElementById('logoimage')).files[0]]){
      let path=`/${this.folder}/${selectedFile.name}`;
      let iRef= storageRef.child(path);
      iRef.put(selectedFile).then((snapshot)=>{
          newnpo.logoimage = selectedFile.name;
          newnpo.path = path;
         return this.npos.push(newnpo);
      });
 } 
}

getCategory(){
   this.categories = this._af.database.list('/categories') as
    FirebaseListObservable<Category[]>
    return this.categories;



}

 addNPOImage(newnpo){
 // //create a root ref of storage
let storageRef = firebase.storage().ref();
  this.npos = this._af.database.list('/npos');

for(let selectedFile of [(<HTMLInputElement>document.getElementById('logoimage')).files[0]]){
let path =`/${this.folder2}/${selectedFile.name}`;
let iRef=storageRef.child(path);
iRef.put(selectedFile).then((snapshot)=>{
     console.log(snapshot)
    // view model
     let vm=this;
     this.npos.push(newnpo).then(response=>{
         Promise.all(newnpo.files.map(function(file){
             let iRef2= storageRef.child(`/${vm.folder2}/${file.name}`);
             return iRef2.child(file.name).put(file);

         })).then(res=>{
             newnpo.files=[];
             res.forEach(item=>{
                 newnpo.files.push(item["donwloadURL"]);

             })
             newnpo.logoimage =selectedFile.name;
             newnpo.path=path;
             return response.update(newnpo);
         })
     });
 });
 }
}

follownpo(currentUserId, currentNpoKey){

this._af.database.list('/npos').push({followers:''}).then
(x=> {

 let update ={};
update['/npos/' + currentNpoKey +'/followers/'] ={follower : currentUserId};
//  update['/npos-followed/' + currentUserId +'/' + currentNpoKey] = {npo: currentNpoKey} ;
update['/npos-followed/' + currentUserId ] = {npo: currentNpoKey} ;

this._af.database.object('/').update(update);

});




}
}
