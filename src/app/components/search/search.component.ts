import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpotifyService } from '../../services/spotify.service';

@Component( {
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ]
} )
export class SearchComponent implements OnInit {
  inputField: FormControl = new FormControl();
  searchResults: any[] = [];

  constructor( private spt: SpotifyService ) {

  }

  async ngOnInit() {

    await this.authorise();

    this.inputField.valueChanges
      .subscribe( inputField => this.spt.searchArtists( inputField )
        .subscribe( result => {
          if ( result.status === 400 ) {
            return;
          } else {
            this.searchResults = result.artists.items;
            console.log( result.artists.items )
          }

        } ) );

  }

  public async authorise() {
    // window.alert('Authorise');
    // await this.spt.authorise();
    const response  = await this.spt.clientCredentialFlow();

    console.log(response.json())
  }
}
