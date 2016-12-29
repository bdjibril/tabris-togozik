import { ui, Page, Button, TextView } from 'tabris';
import artists from '../../artists.json';

var PAGE_MARGIN = 16;

function actionVisbility(isVisible) {
  ui.children('#licenseToggler').set('visible', isVisible);
}

export default class SettingsPage extends Page {

  constructor() {
    super({title: 'License'});
    this._createUI();
    this._createEvents();
  }

  _createUI() {
    var settingsTextView = new TextView({
      text: 'Book covers under CC BY 2.0',
      layoutData: {left: PAGE_MARGIN, right: PAGE_MARGIN, top: PAGE_MARGIN}
    }).appendTo(this);
    var linkTextView = new TextView({
      text: 'Covers on flickr',
      textColor: 'rgba(71, 161, 238, 0.75)',
      layoutData: {left: PAGE_MARGIN, right: PAGE_MARGIN, top: [settingsTextView, 10]}
    }).on('tap', function() {
      createLicenseWebviewPage().open();
    }).appendTo(this);
    new TextView({
      text: '<i>Authors of book covers:</i><br/>' +
        'Paula Rodriguez - 1984<br/>' +
        'Marc Storrs and Rob Morphy - Na Tropie Nieznanych<br/>' +
        'Cat Finnie - Stary Czlowiek I Morze<br/>' +
        'Andrew Brozyna - Hobbit<br/>' +
        'Viacheslav Vystupov - Wojna Swiatow<br/>' +
        'Marc Storrs and Rob Morphy - Zegar Pomaranczowy Pracz<br/>' +
        'Andrew Evan Harner - Ksiega Dzungli',
      markupEnabled: true,
      layoutData: {left: PAGE_MARGIN, right: PAGE_MARGIN, top: [linkTextView, 10]}
    }).appendTo(this);

  }

  _createEvents() {
    this.on('appear', function() { actionVisbility(false); })
      .on('disappear', function() { actionVisbility(true); });
  }

}
