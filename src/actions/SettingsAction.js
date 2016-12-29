import { Action } from 'tabris';
import SettingsPage from '../pages/SettingsPage.js';

export default class SettingsAction extends Action {

  constructor() {
    super({
      id: 'licenseToggler',
      title: 'Settings',
      placementPriority: 'high',
      image: {src: 'images/action_settings.png', scale: 3}
    });
    this._createEvents();
  }

  _createEvents() {
    this.on('select', () => new SettingsPage().open());
  }

}

