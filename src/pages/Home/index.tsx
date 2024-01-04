import React, {PropsWithChildren, useState} from 'react';
import {
  Button,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import ListWithHeaders from '../../components/ListWithHeaders';
import PourForm from '../../components/PourForm';
import Header from '../../components/Header/Header';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
type HomeProps = PropsWithChildren<{
  navigation: DrawerContentComponentProps;
}>;

function Home({navigation}: HomeProps): React.JSX.Element {
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

  const stackNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSaveClick = () => {
    if (formVisible) {
      setPourData(prev => {
        const newData = [...prev];
        newData.push([...currentFormData]);
        return newData;
      });
      setCurrentFormData(defaultFormData);
      setFormVisible(false);
    } else {
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
        <Header title="POURS" />
        <ListWithHeaders headers={headers} data={pourData} />
      </View>
      <View style={styles.navigationContainer}>
        <Pressable
          style={[styles.navButtonCommonProps]}
          onPress={() => {
            stackNavigation.navigate('Profile');
          }}>
          <Text style={[styles.navButtonTextCommonProps]}>Profile</Text>
        </Pressable>
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
    justifyContent: 'space-between',
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
    fontSize: 30,
    paddingBottom: 5,
    paddingRight: 2,
    fontFamily: 'AtomicAge-Regular',
  },
});

export default Home;
