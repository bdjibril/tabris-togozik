import { Page, TabFolder, Tab, Composite, Button, TextView, ImageView, CollectionView, Video } from 'tabris';
import videos from '../../videos.json';

var PAGE_MARGIN = 16;

export default class VideosPage extends Page {

  constructor(title, image, filter) {
    super({
      title: title,
      topLevel: true,
      image: {src: image, scale: 3}
    });
    this._createUI(filter);
  }

  _createUI(filter) {
    createVideosList(videos.filter(filter)).appendTo(this);
  }

}

function createVideosList(videos) {
  return new CollectionView({
    layoutData: {left: 0, right: 0, top: 0, bottom: 0},
    itemHeight: 72,
    items: videos,
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
      cell.on('change:item', function(widget, video) {
        imageView.set('image', video.image);
        titleTextView.set('text', video.title);
        authorTextView.set('text', video.artist);
      });
    }
  }).on('select', function(target, value) {
    createVideoPage(value).open();
  });
}

function createVideoPage(video) {
  var page = new Page({
    title: video.title
  });
  var detailsComposite = createDetailsView(video)
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

function createDetailsView(video) {
  var composite = new Composite({
    background: 'white',
    highlightOnTouch: true
  });

  var video = new Video({
    left: 0, top: 0, right: 0, height: 250, background: "black",
    url: "http://peach.themazzone.com/durian/movies/sintel-1280-stereo.mp4",
    controlsVisible: true
  }).appendTo(composite);

  return composite;
}

function createTabFolder() {
  var tabFolder = new TabFolder({tabBarLocation: 'top', paging: true});
  var audioTab = new Tab({title: 'Audio'}).appendTo(tabFolder);
  createVideosList(videos).appendTo(audioTab);
  var videoTab = new Tab({title: 'Video'}).appendTo(tabFolder);
  createVideosList(videos).appendTo(videoTab);
  return tabFolder;
}
