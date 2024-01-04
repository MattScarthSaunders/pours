import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {RootStackParamList} from './types';
import PourTable from './src/pages/PourTable';
import BeanList from './src/pages/BeanList';

const Drawer = createDrawerNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="PourTable" component={PourTable} />
        <Drawer.Screen name="BeanList" component={BeanList} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
