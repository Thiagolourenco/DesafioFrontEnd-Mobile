import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Main from './pages/main';
import InfoUser from './components/infoUser';
import AddUser from './components/addUser';

export default createAppContainer(
  createSwitchNavigator(
    {
      Main,
      InfoUser,
      AddUser,
    },

    {initialRouteName: 'Main'},
  ),
);
