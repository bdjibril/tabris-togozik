import { ui, Drawer, PageSelector, Action } from 'tabris';
import ArtistsPage from './pages/ArtistsPage.js';

import SettingsAction from './actions/SettingsAction.js';

ui.set({
  background: 'rgb(200, 50, 50)',
  textColor: 'white',
  statusBarTheme: 'dark'
});

new Drawer().append(new PageSelector());

new ArtistsPage('Latest Artists', 'images/page_all_books.png', (artist) => true).open();
new ArtistsPage('Favorite Artists', 'images/page_favorite_books.png', (artist) => artist.favorite);
new ArtistsPage('Popular Artists', 'images/page_popular_books.png', (artist) => artist.popular);

new SettingsAction();
