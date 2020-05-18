import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ICommandPalette } from '@jupyterlab/apputils';

import { IMainMenu } from '@jupyterlab/mainmenu';

import { Menu, Widget } from '@lumino/widgets';

/**
 * Activate the widgets example extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'stammsen_extension',
  autoStart: true,
  requires: [ICommandPalette, IMainMenu],
  activate: (
    app: JupyterFrontEnd,
    palette: ICommandPalette,
    mainMenu: IMainMenu
  ) => {
    const { commands, shell } = app;
    const command = 'widgets:open-tab';

    commands.addCommand(command, {
      label: 'open new stammsen tab',
      caption: 'open new stammsen tab',
      execute: () => {
        const stammsenWidget = new StammsenTabWidget();
        shell.add(stammsenWidget, 'main');
      }
    });
    palette.addItem({ command, category: 'stammsen extension' });

    const stammsenMenu = new Menu({ commands });

    stammsenMenu.title.label = 'stammsen tab';
    mainMenu.addMenu(stammsenMenu, { rank: 80 });
    stammsenMenu.addItem({ command });
  }
};

export default extension;

class StammsenTabWidget extends Widget {
  constructor() {
    super();
    this.addClass('jp_stammsen_tab');
    this.id = 'stammsen tab';
    this.title.label = 'stammsen tab';
    this.title.closable = true;
  }
}
