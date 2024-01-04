import React, {PropsWithChildren, useEffect} from 'react';
import {Pressable, StyleSheet, Text, View, NativeModules} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp, useDrawerStatus} from '@react-navigation/drawer';
import {RootStackParamList} from '../../../types';

type HeaderProps = PropsWithChildren<{
  title: string;
}>;

const Header = ({title}: HeaderProps): React.JSX.Element => {
  useEffect(() => {
    const {LocalNotificationsModule} = NativeModules;

    console.log('Native module loaded:', LocalNotificationsModule);
  }, []);

  const drawerNavigation =
    useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const isDrawerOpen = useDrawerStatus() === 'open';

  const onPressHandler = () => {
    if (isDrawerOpen) {
      drawerNavigation.closeDrawer();
    } else {
      // drawerNavigation.openDrawer();
      const {LocalNotificationsModule} = NativeModules;

      console.log('launching notification...');
      LocalNotificationsModule.showLocalNotification(
        'Pours',
        'GET YO SELF SOME BEEEEEANS!',
      );
    }
  };

  return (
    <View style={styles.HeaderContainer}>
      <Text style={styles.ListWithHeadersTitle}>{title}</Text>
      <Pressable onPress={onPressHandler}>
        <Text style={styles.ListWithHeadersBeans}>Lazy Sunday</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    width: '100%',
  },
  ListWithHeadersTitle: {
    fontSize: 35,
    height: 50,
    fontFamily: 'AtomicAge-Regular',
    color: 'white',
    backgroundColor: 'black',
    paddingTop: 2,
  },
  ListWithHeadersBeans: {
    fontSize: 25,
    fontFamily: 'AtomicAge-Regular',
    color: 'orange',
    backgroundColor: 'black',
    alignSelf: 'flex-end',
    paddingBottom: 5,
  },
});
export default Header;
