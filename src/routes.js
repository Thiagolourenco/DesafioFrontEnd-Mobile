import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Main from './pages/main';
import InfoUser from './components/infoUser';

export default createAppContainer(
  createSwitchNavigator(
    {
      Main,
      InfoUser,
    },
    {initialRouteName: 'Main'},
  ),
);
