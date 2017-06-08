
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService{

private clientId: string = 'b7ff6ef50e6e4c7e81439d0345db2790';
// baseUrl: string = 'https://api.spotify.com/v1/search?type=artist&limit=10&client_id=' + this.clientID + '&q=';
private artistsUrl : string = 'https://api.spotify.com/v1/search?type=artist&limit=10&client_id'+ this.clientId + '&q=';

private searchUrl : string;
private artistUrl : string;
private albumsUrl : string; 
private albumUrl : string;

constructor(private _http : Http){}

// new way to retrieve artist
searchArtists(searchTerm:string){
    let url=this.artistsUrl + searchTerm;
    return this._http.get(url)
    .map(res=>res.json());
}



searchMusic(str: string, type ='artist'){
this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US'; 
return this._http.get(this.searchUrl)
.map(res=> res.json());
}
searchArtistforSave(str: string, type ='artist'){
this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US'; 
return this._http.get(this.searchUrl)
.map(res=> res.json());
}
getArtist(id:string){
this.artistUrl ='https://api.spotify.com/v1/artists/' +id; 
return this._http.get(this.artistUrl)
.map(res=> res.json());
}
getAlbums(artistId: string){
this.albumsUrl ='https://api.spotify.com/v1/artists/' +artistId+ '/albums'; 
return this._http.get(this.albumsUrl)
.map(res=> res.json());
}
getAlbum(id: string){
this.albumUrl ='https://api.spotify.com/v1/albums/' +id; 
return this._http.get(this.albumUrl)
.map(res=> res.json());
}
}

