/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';

import ListWithHeaders from './src/components/ListWithHeaders';
import PourForm from './src/components/PourForm';
import Header from './src/components/Header/Header';

function App(): React.JSX.Element {
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

  const [expanded, setExpanded] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [pourData, setPourData] = useState<{key: string; val: string}[][]>([]);
  const [currentFormData, setCurrentFormData] =
    useState<{key: string; val: string}[]>(defaultFormData);

  const headers = [
    {key: 'In(g)'},
    {key: 'Out(g)'},
    {key: 'Ratio'},
    {key: 'Grind'},
    {key: 'Time(s)'},
    {key: 'Profile'},
  ];

  return (
    <>
      <View>
        <Header title="POURS" />
        <ListWithHeaders headers={headers} data={pourData} />
      </View>
      {formVisible && (
        <PourForm
          headers={headers}
          currentFormData={currentFormData}
          setCurrentFormData={setCurrentFormData}
        />
      )}
      {formVisible && (
        <Pressable
          style={styles.cancelButton}
          onPress={() => {
            if (formVisible) {
              setCurrentFormData(defaultFormData);
              setFormVisible(false);
            } else {
              setFormVisible(true);
            }
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            setExpanded(!expanded);
          }}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      )}
      <Pressable
        style={styles.addButton}
        onPress={() => {
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
        }}>
        <Text style={styles.addButtonText}>{formVisible ? 'Save' : '+'}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    minWidth: 50,
    minHeight: 50,
    paddingHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'AtomicAge-Regular',
    marginTop: 20,
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    paddingBottom: 5,
    paddingRight: 2,
    fontFamily: 'AtomicAge-Regular',
    alignSelf: 'center',
  },
  cancelButton: {
    minWidth: 50,
    minHeight: 50,
    paddingHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'AtomicAge-Regular',
    marginTop: 20,
    position: 'absolute',
    bottom: 5,
    left: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 30,
    paddingBottom: 5,
    paddingRight: 2,
    fontFamily: 'AtomicAge-Regular',
    alignSelf: 'center',
  },
});

export default App;
