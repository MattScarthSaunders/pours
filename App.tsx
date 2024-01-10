import React from 'react';
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {RootStackParamList} from './types';
import PourTable from './src/pages/PourTable';
import BeanList from './src/pages/BeanList';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Icon from 'react-native-vector-icons/Entypo';
import DrawerContent from './src/components/DrawerContent';

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: 'black',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'AtomicAge-Regular',
          fontSize: 30,
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => {
            return (
              <Icon
                name="menu"
                size={30}
                color="white"
                testID="menuButtonTest"
                onPress={() =>
                  navigation.dispatch(DrawerActions.openDrawer())
                }></Icon>
            );
          },
        }}></Stack.Screen>
      <Stack.Screen name="Pours" component={PourTable}></Stack.Screen>
      <Stack.Screen name="Beans" component={BeanList}></Stack.Screen>
    </Stack.Navigator>
  );
};

const DrawerNav = () => {
  const Drawer = createDrawerNavigator<RootStackParamList>();

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props}></DrawerContent>}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home2" component={StackNav} />
    </Drawer.Navigator>
  );
};
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <DrawerNav></DrawerNav>
    </NavigationContainer>
  );
}

export default App;
