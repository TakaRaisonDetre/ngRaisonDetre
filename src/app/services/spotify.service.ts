import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SpotifyService {

  private clientId = '27f572706e9a406095da2e12171c9703'
  private clientSecret = '502c3f58b72a400b889262903a29960a'

  private encodedIdAndSecret = window.btoa( `${this.clientId}:${this.clientSecret}` )

  private headers = new Headers()
  private authOptions = new RequestOptions( { headers: this.headers } )

  // private clientId = 'b7ff6ef50e6e4c7e81439d0345db2790'
  // baseUrl: string = 'https://api.spotify.com/v1/search?type=artist&limit=10&client_id=' + this.clientID + '&q='
  private artistsUrl: string = 'https://api.spotify.com/v1/search?type=artist&limit=10&client_id' + this.clientId + '&q='

  private searchUrl: string
  private artistUrl: string
  private albumsUrl: string
  private albumUrl: string

  constructor( private _http: Http ) {
    this.setHeaders( this.encodedIdAndSecret, true );
  }

  private setHeaders( authString: string, basic = false ) {

    this.headers = new Headers()

    const authType = (basic) ? 'Basic' : 'Bearer'
    this.headers.append( 'Authorization', `${authType} ${authString}` )
    this.headers.append( 'Content-Type', 'application/x-www-form-urlencoded' )

    this.authOptions = new RequestOptions( { headers: this.headers } )
  }

// new way to retrieve artist
  searchArtists( searchTerm: string ) {
    const url = this.artistsUrl + searchTerm
    return this._http.get( url, this.authOptions ).map( res => res.json() )
  }

  public async authorise() {

    const clientId = '27f572706e9a406095da2e12171c9703'
    const clientSecret = '502c3f58b72a400b889262903a29960a'
    const redirectLink = 'redirect_uri=https%3A%2F%2localhost:4200/authorized'
    const responseType = 'response_type=code'

    const headers = new Headers( { 'client_id': clientId } )
    const authOptions = new RequestOptions( { headers } )

    const response =
      await this
        ._http
        .get( `https://accounts.spotify.com/authorize?client_id=${clientId}&${responseType}&${redirectLink}`, authOptions )
        .toPromise()

    console.log( response.json() )
  }

  public async clientCredentialFlow() {

    const requestApiTokenPath = 'https://accounts.spotify.com/api/token'

    const response = await this._http.post( requestApiTokenPath, 'grant_type=client_credentials', this.authOptions ).toPromise()

    const authToken = response.json()[ 'access_token' ]
    console.log( authToken )
    this.setHeaders( authToken )

    return response;
  }

  searchMusic( str: string, type = 'artist' ) {
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US'
    return this._http.get( this.searchUrl )
      .map( res => res.json() )
  }

  searchArtistforSave( str: string, type = 'artist' ) {
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US'
    return this._http.get( this.searchUrl )
      .map( res => res.json() )
  }

  getArtist( id: string ) {
    this.artistUrl = 'https://api.spotify.com/v1/artists/' + id
    return this._http.get( this.artistUrl )
      .map( res => res.json() )
  }

  getAlbums( artistId: string ) {
    this.albumsUrl = 'https://api.spotify.com/v1/artists/' + artistId + '/albums'
    return this._http.get( this.albumsUrl )
      .map( res => res.json() )
  }

  getAlbum( id: string ) {
    this.albumUrl = 'https://api.spotify.com/v1/albums/' + id
    return this._http.get( this.albumUrl )
      .map( res => res.json() )
  }
}

