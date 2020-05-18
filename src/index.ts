import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { Menu, Widget } from '@lumino/widgets';
import { ILauncher } from '@jupyterlab/launcher';
import { LabIcon } from '@jupyterlab/ui-components';
import stammsenIcon from '../style/stammsen_icon.svg';
const extension: JupyterFrontEndPlugin<void> = { id: 'stammsen_extension', autoStart: true, requires: [ICommandPalette, IMainMenu, ILauncher],
  activate: ( app: JupyterFrontEnd, palette: ICommandPalette, mainMenu: IMainMenu, launcher: ILauncher | null
  ) => {
    const { commands, shell } = app;
    const command = 'widgets:open-tab';
    const icon = new LabIcon({
      name: 'launcher:stammsen-icon',
      svgstr: stammsenIcon
    }); 

    commands.addCommand(command, { label: 'open new stammsen tab', caption: 'open new stammsen tab', icon: args => (args['isPalette'] ? null : icon), 
      execute: () => {
        const stammsenTabWidgetMain = new StammsenTabWidget();
        shell.add(stammsenTabWidgetMain, 'main');
      }
    });

    // add widget to the left part of the frontend
    const stammsenTabWidgetLeft = new StammsenTabWidget();
    shell.add(stammsenTabWidgetLeft, 'left');

    // add the command to the launcher
    if (launcher) {
      launcher.add({
        command,
        category: 'stammsen extension',
        rank: 1
      });
    }

    // add the command to the command palette
    palette.addItem({ command, category: 'stammsen extension' });

    // add the command to the main menu
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
