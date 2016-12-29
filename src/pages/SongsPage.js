import { Page, TabFolder, Tab, Composite, Button, TextView, ImageView, CollectionView } from 'tabris';
import songs from '../../songs.json';

var PAGE_MARGIN = 16;
var audoMedia;

export default class SongsPage extends Page {

  constructor(title, image, filter) {
    super({
      title: title,
      topLevel: true,
      image: {src: image, scale: 3}
    });
    this._createUI(filter);
  }

  _createUI(filter) {
    createSongsList(songs.filter(filter)).appendTo(this);
  }

}

function createSongsList(songs) {
  return new CollectionView({
    layoutData: {left: 0, right: 0, top: 0, bottom: 0},
    itemHeight: 72,
    items: songs,
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
      cell.on('change:item', function(widget, song) {
        imageView.set('image', song.image);
        titleTextView.set('text', song.title);
        authorTextView.set('text', song.artist);
      });
    }
  }).on('select', function(target, value) {
    createSongtPage(value).open();
  });
}

function createSongtPage(song) {
  var audioMedia = new Media(song.link, () => null, () => null);

  var page = new Page({
    title: song.title
  });

  page.on('appear', function() { audioMedia.play(); })
      .on('disappear', function() { 
        audioMedia.stop();
        audioMedia.release()
       });

  var detailsComposite = createDetailsView(song)
    .set('layoutData', {top: 0, height: 192, left: 0, right: 0})
    .appendTo(page);
  createTabFolder().set({
    layoutData: {top: [detailsComposite, 0], left: 0, right: 0, bottom: 0}
  }).appendTo(page);
  new TextView({
    layoutData: {height: 1, right: 0, left: 0, top: [detailsComposite, 0]},
    background: 'rgba(0, 0, 0, 0.1)'
  }).appendTo(page);
  return page;
}

function createDetailsView(song) {
  var composite = new Composite({
    background: 'white',
    highlightOnTouch: true
  });
  new Composite({
    layoutData: {left: 0, right: 0, top: 0, height: 160 + 2 * PAGE_MARGIN}
  }).on('tap', function() {
    createReadBookPage(song).open();
  }).appendTo(composite);
  var coverView = new ImageView({
    layoutData: {height: 160, width: 106, left: PAGE_MARGIN, top: PAGE_MARGIN},
    image: song.image
  }).appendTo(composite);
  var titleTextView = new TextView({
    markupEnabled: true,
    text: '<b>' + song.title + '</b>',
    layoutData: {left: [coverView, PAGE_MARGIN], top: PAGE_MARGIN, right: PAGE_MARGIN}
  }).appendTo(composite);
  var authorTextView = new TextView({
    layoutData: {left: [coverView, PAGE_MARGIN], top: [titleTextView, PAGE_MARGIN]},
    text: song.genre
  }).appendTo(composite);
  new TextView({
    layoutData: {left: [coverView, PAGE_MARGIN], top: [authorTextView, PAGE_MARGIN]},
    textColor: 'rgb(102, 153, 0)',
    text: 'EUR 12,95'
  }).appendTo(composite);
  return composite;
}

function createTabFolder() {
  var tabFolder = new TabFolder({tabBarLocation: 'top', paging: true});
  var audioTab = new Tab({title: 'Audio'}).appendTo(tabFolder);
  createSongsList(songs).appendTo(audioTab);
  var videoTab = new Tab({title: 'Video'}).appendTo(tabFolder);
  createSongsList(songs).appendTo(videoTab);
  return tabFolder;
}
