import { Page, Button, TextView, ImageView, CollectionView } from 'tabris';
import artists from '../../artists.json';

var PAGE_MARGIN = 16;

export default class ArtistsPage extends Page {

  constructor(title, image, filter) {
    super({
      title: title,
      topLevel: true,
      image: {src: image, scale: 3}
    });
    this._createUI(filter);
  }

  _createUI(filter) {
    createArtistsList(artists.filter(filter)).appendTo(this);
  }

}

function createArtistsList(artists) {
  return new tabris.CollectionView({
    layoutData: {left: 0, right: 0, top: 0, bottom: 0},
    itemHeight: 72,
    items: artists,
    initializeCell: function(cell) {
      var imageView = new ImageView({
        layoutData: {left: PAGE_MARGIN, centerY: 0, width: 32, height: 48},
        scaleMode: 'fit'
      }).appendTo(cell);
      var titleTextView = new TextView({
        layoutData: {left: 64, right: PAGE_MARGIN, top: PAGE_MARGIN},
        markupEnabled: true,
        textColor: '#4a4a4a'
      }).appendTo(cell);
      var authorTextView = new TextView({
        layoutData: {left: 64, right: PAGE_MARGIN, top: [titleTextView, 4]},
        textColor: '#7b7b7b'
      }).appendTo(cell);
      cell.on('change:item', function(widget, artist) {
        imageView.set('image', artist.image);
        titleTextView.set('text', artist.title);
        authorTextView.set('text', artist.author);
      });
    }
  }).on('select', function(target, value) {
    createArtistPage(value).open();
  });
}


function createArtistPage(artist) {
  var page = new tabris.Page({
    title: artist.title
  });
  var detailsComposite = createDetailsView(artist)
    .set('layoutData', {top: 0, height: 192, left: 0, right: 0})
    .appendTo(page);
  createTabFolder().set({
    layoutData: {top: [detailsComposite, 0], left: 0, right: 0, bottom: 0}
  }).appendTo(page);
  new tabris.TextView({
    layoutData: {height: 1, right: 0, left: 0, top: [detailsComposite, 0]},
    background: 'rgba(0, 0, 0, 0.1)'
  }).appendTo(page);
  return page;
}

function createDetailsView(artist) {
  var composite = new tabris.Composite({
    background: 'white',
    highlightOnTouch: true
  });
  new tabris.Composite({
    layoutData: {left: 0, right: 0, top: 0, height: 160 + 2 * PAGE_MARGIN}
  }).on('tap', function() {
    createReadBookPage(artist).open();
  }).appendTo(composite);
  var coverView = new tabris.ImageView({
    layoutData: {height: 160, width: 106, left: PAGE_MARGIN, top: PAGE_MARGIN},
    image: artist.image
  }).appendTo(composite);
  var titleTextView = new tabris.TextView({
    markupEnabled: true,
    text: '<b>' + artist.title + '</b>',
    layoutData: {left: [coverView, PAGE_MARGIN], top: PAGE_MARGIN, right: PAGE_MARGIN}
  }).appendTo(composite);
  var authorTextView = new tabris.TextView({
    layoutData: {left: [coverView, PAGE_MARGIN], top: [titleTextView, PAGE_MARGIN]},
    text: artist.author
  }).appendTo(composite);
  new tabris.TextView({
    layoutData: {left: [coverView, PAGE_MARGIN], top: [authorTextView, PAGE_MARGIN]},
    textColor: 'rgb(102, 153, 0)',
    text: 'EUR 12,95'
  }).appendTo(composite);
  return composite;
}

function createTabFolder() {
  var tabFolder = new tabris.TabFolder({tabBarLocation: 'top', paging: true});
  var audioTab = new tabris.Tab({title: 'Audio'}).appendTo(tabFolder);
  createArtistsList(artists).appendTo(audioTab);
  var videoTab = new tabris.Tab({title: 'Video'}).appendTo(tabFolder);
  createArtistsList(artists).appendTo(videoTab);
  return tabFolder;
}
