import { ui, Drawer, PageSelector, Action } from 'tabris';
import SongsPage from './pages/SongsPage.js';
import VideosPage from './pages/VideosPage.js';
import ArtistsPage from './pages/ArtistsPage.js';

import SettingsAction from './actions/SettingsAction.js';

ui.set({
  background: 'rgb(200, 50, 50)',
  textColor: 'white',
  statusBarTheme: 'dark'
});

new Drawer().append(new PageSelector());

new SongsPage('Songs', 'images/ic_library_music_black_24dp.png', (song) => true).open();
new VideosPage('Videos', 'images/ic_video_library_black_24dp.png', (video) => true);
new ArtistsPage('Artists', 'images/ic_person_black_24dp.png', (artist) => true);

new SettingsAction();
