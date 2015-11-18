import { Component, View, bootstrap } from 'angular2/angular2';
import { HTTP_PROVIDERS } from 'angular2/http'
import { VideoPlayer } from './search/MEBackend';
import { PlaylistComponent } from './playlist/PlaylistComponents'
import { SearchComponent } from './search/SearchComponents';

@Component({
  selector: 'mongoexplorer',
  providers: [VideoPlayer]
})
@View({
  templateUrl: "mongoexplorer/mongoexplorer.html",
  directives: [SearchComponent, PlaylistComponent]
})
class MEComponent { }

bootstrap(MEComponent, [HTTP_PROVIDERS]);
