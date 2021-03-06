import { Component, View, NgFor, NgIf, FORM_DIRECTIVES } from 'angular2/angular2';
import { LocalStoragePlayList } from '../playlist/PlaylistBackend';
import * as ytbackend from './MEBackend';

@Component({
  selector: 'search-result',
  properties: ["concert"],
  providers: [LocalStoragePlayList]
})
@View({
  templateUrl: "mongoexplorer/search/searchresult.html",
  directives: []
})
class SearchResultComponent {
  concert: ytbackend.ConcertSummary

  constructor(private playlistService: LocalStoragePlayList,
     private videoPlayer: ytbackend.VideoPlayer) {}

  addToPlaylist(concert: ytbackend.ConcertSummary) {
    this.playlistService.addConcert(concert);
  }

  playConcert(id: string) {
    this.videoPlayer.playConcert(id);
  }
}

@Component({
  selector: 'search',
  providers: [ytbackend.ConcertService]
})
@View({
  templateUrl: "mongoexplorer/search/search.html",
  directives: [NgFor, NgIf, SearchResultComponent, FORM_DIRECTIVES]
})
export class SearchComponent {
  searchTerm: string
  duration: string

  concerts: ytbackend.ConcertSummary[] = [];

  constructor(private concertService: ytbackend.ConcertService,
      private videoPlayer: ytbackend.VideoPlayer) { }

  get playing() {
    return this.videoPlayer.isPlaying;
  }

  get embedUrl() {
    return this.videoPlayer.currentVideoUrl;
  }

  searchConcerts(): void {
    this.videoPlayer.stop();
    this.concertService
      .findConcerts(this.searchTerm)
      .subscribe((results: ytbackend.ConcertSummary[]) => this.concerts = results);
  }

}
