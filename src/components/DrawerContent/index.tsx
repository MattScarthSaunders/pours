import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types';

const DrawerList: DrawerLayoutProps[] = [{icon: 'circle', label: 'Beans'}];

type DrawerLayoutProps = {
  icon: string;
  label: string;
};

const DrawerLayout = ({icon, label}: DrawerLayoutProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <DrawerItem
      testID={label + 'LabelTest'}
      icon={({color, size}) => (
        <Icon name={icon} color={color} size={size}></Icon>
      )}
      label={label}
      onPress={() => {
        navigation.navigate('Beans');
      }}></DrawerItem>
  );
};

const DrawerItems = () => {
  return DrawerList.map((el, i) => {
    return <DrawerLayout key={i} icon={el.icon} label={el.label} />;
  });
};

function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.drawerSection}>
            <DrawerItems />
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerSection: {
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
  },
});

export default DrawerContent;
