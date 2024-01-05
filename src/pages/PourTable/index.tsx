import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  Button,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
  NativeModules,
} from 'react-native';
import ListWithHeaders from '../../components/ListWithHeaders';
import PourForm from '../../components/PourForm';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
type PourTableProps = PropsWithChildren<{
  navigation: DrawerContentComponentProps;
  route: RouteProp<RootStackParamList, 'Pours'>;
}>;

function PourTable({route, navigation}: PourTableProps): React.JSX.Element {
  const {beanTitle} = route.params;

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const defaultFormData = [
    {key: 'in', val: ''},
    {key: 'out', val: ''},
    {key: 'ratio', val: ''},
    {key: 'grind', val: ''},
    {key: 'time', val: ''},
    {key: 'profile', val: ''},
  ];

  const headers = [
    {key: 'In(g)'},
    {key: 'Out(g)'},
    {key: 'Ratio'},
    {key: 'Grind'},
    {key: 'Time(s)'},
    {key: 'Profile'},
  ];

  const [expanded, setExpanded] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [pourData, setPourData] = useState<{key: string; val: string}[][]>([]);
  const [currentFormData, setCurrentFormData] = useState(defaultFormData);
  const {LocalNotificationsModule, LocalStorageModule} = NativeModules;

  useEffect(() => {
    console.log(beanTitle);
    LocalStorageModule.readFile(
      beanTitle,
      (contents: string) => {
        console.log('PourTable UseEffect', contents);
        setPourData(JSON.parse(contents) || []);
      },
      (error: string) => {
        if (error) setPourData([]);
      },
    );
  }, []);

  const handleSaveClick = () => {
    if (formVisible) {
      setPourData(prev => {
        const newData = [...prev];
        newData.push([...currentFormData]);
        LocalStorageModule.saveFile(beanTitle, JSON.stringify(newData));
        return newData;
      });
      setCurrentFormData(defaultFormData);

      setFormVisible(false);
    } else {
      // LocalNotificationsModule.showLocalNotification(
      //   'Ohhh, a new drink, aye?',
      //   'Tap me and get on with it',
      // );

      setFormVisible(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const handleCancelClick = () => {
    if (formVisible) {
      setCurrentFormData(defaultFormData);
      setFormVisible(false);
    } else {
      setFormVisible(true);
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <>
      <View>
        <ListWithHeaders headers={headers} data={pourData} />
      </View>
      <View style={styles.navigationContainer}>
        {formVisible && (
          <PourForm
            headers={headers}
            currentFormData={currentFormData}
            setCurrentFormData={setCurrentFormData}
          />
        )}
        {formVisible && (
          <Pressable
            style={[styles.navButtonCommonProps]}
            onPress={handleCancelClick}>
            <Text style={[styles.navButtonTextCommonProps]}>Cancel</Text>
          </Pressable>
        )}
        <Pressable
          style={[styles.navButtonCommonProps]}
          onPress={handleSaveClick}>
          <Text style={[styles.navButtonTextCommonProps]}>
            {formVisible ? 'Save' : '+'}
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  navButtonCommonProps: {
    minWidth: 50,
    minHeight: 50,
    paddingHorizontal: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonTextCommonProps: {
    color: 'white',
    fontSize: 25,
    paddingBottom: 5,
    paddingRight: 2,
    fontFamily: 'AtomicAge-Regular',
  },
});

export default PourTable;
