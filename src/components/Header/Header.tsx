import React, {PropsWithChildren, useEffect} from 'react';
import {Pressable, StyleSheet, Text, View, NativeModules} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp, useDrawerStatus} from '@react-navigation/drawer';
import {RootStackParamList} from '../../../types';
import Icon from 'react-native-vector-icons/FontAwesome';

type HeaderProps = PropsWithChildren<{
  title: string;
}>;

const Header = ({title}: HeaderProps): React.JSX.Element => {
  const drawerNavigation =
    useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const onPressHandler = () => {
    drawerNavigation.openDrawer();

    // NATIVE MODULES! We did it! Make sure NativeModules is imported from 'react-native' then do below.

    // const {LocalNotificationsModule} = NativeModules;

    // LocalNotificationsModule.showLocalNotification(
    //   'Pours',
    //   'GET YO SELF SOME BEEEEEANS!',
    // );
  };

  return (
    <View style={styles.HeaderContainer}>
      <Text style={styles.ListWithHeadersTitle}>{title}</Text>
      <Pressable onPress={onPressHandler}>
        <Icon
          name="list"
          size={35}
          color="orange"
          style={styles.ListWithHeadersBeans}
        />
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
    height: 45,
  },
  ListWithHeadersTitle: {
    fontSize: 35,
    fontFamily: 'AtomicAge-Regular',
    color: 'white',
    backgroundColor: 'black',
  },
  ListWithHeadersBeans: {
    marginTop: 5,
    marginRight: 5,
  },
});
export default Header;
