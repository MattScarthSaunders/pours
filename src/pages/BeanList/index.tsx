import React, {useEffect, useState} from 'react';
import {
  NativeModules,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types';

function BeanList(): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {LocalStorageModule} = NativeModules;
  const [availableBeans, setAvailableBeans] = useState<string[]>([]);

  useEffect(() => {
    LocalStorageModule.readFile(
      'beanList',
      (contents: string) => {
        setAvailableBeans(JSON.parse(contents));
      },
      (err: string) => {
        if (err) setAvailableBeans([]);
      },
    );
  }, []);

  const [beanInput, setBeanInput] = useState('');
  const [beanInputVisible, setBeanInputVisible] = useState(false);

  return (
    <View style={styles.BeanListScreen}>
      <ScrollView
        style={styles.BeanList}
        contentContainerStyle={{
          rowGap: 16,
        }}>
        {availableBeans.map((bean: string, index) => {
          return (
            <View key={bean} style={styles.BeanRow}>
              <Pressable
                onPress={() => navigation.navigate('Pours', {beanTitle: bean})}>
                <Text style={styles.BeanTitle}>{bean}</Text>
              </Pressable>
              <Pressable
                style={styles.BeanDeleteButton}
                onPress={() =>
                  LocalStorageModule.readFile(
                    'beanList',
                    (contents: string) => {
                      const currBeans = [...JSON.parse(contents)];
                      const beanName = currBeans.splice(index, 1);
                      LocalStorageModule.saveFile(
                        'beanList',
                        JSON.stringify(currBeans),
                      );

                      LocalStorageModule.deleteFile(
                        beanName[0],
                        (confirmation: string) => {
                          console.log(confirmation);
                        },
                        (err: string) => {
                          console.log(err);
                        },
                      );
                      setAvailableBeans(currBeans || []);
                    },
                    (err: string) => {},
                  )
                }>
                <Text style={styles.BeanDeleteButtonText}>delete</Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
      {
        // DEBUG: DELETE FILE
        /* <Pressable
        onPress={() =>
          LocalStorageModule.deleteFile(
            'test',
            (confirmation: string) => {
              console.log(confirmation);
            },
            (err: string) => {
              console.log(err);
            },
          )
        }>
        <Text style={styles.BeanTitle}>delete</Text>
      </Pressable> */
      }
      <Pressable
        onPress={() => {
          setBeanInputVisible(true);
        }}
        style={styles.BeanAddButton}>
        <Text style={styles.BeanAddButtonText}>Add a New Bean</Text>
      </Pressable>
      {beanInputVisible && (
        <View style={styles.BeanInputForm}>
          <TextInput
            style={styles.BeanInput}
            value={beanInput}
            onChangeText={v => setBeanInput(v)}
          />
          <View style={styles.BeanInputFormButtonContainer}>
            <Pressable
              onPress={() => {
                setBeanInputVisible(false);
                setBeanInput('');
              }}>
              <Text style={styles.BeanFormButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setAvailableBeans(prev => {
                  const newBeans = [...prev];
                  if (newBeans.includes(beanInput)) {
                    return newBeans;
                  }

                  newBeans.push(beanInput);
                  LocalStorageModule.saveFile(
                    'beanList',
                    JSON.stringify(newBeans),
                  );
                  return newBeans;
                });
                setBeanInputVisible(false);
                setBeanInput('');
              }}>
              <Text style={styles.BeanFormButtonText}>Add</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  BeanListScreen: {
    height: '100%',
  },
  BeanList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  BeanRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  BeanTitle: {
    fontSize: 30,
    fontFamily: 'AtomicAge-Regular',
    color: 'black',
    backgroundColor: 'orange',
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
  },
  BeanDeleteButton: {
    backgroundColor: 'black',
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  BeanDeleteButtonText: {
    fontSize: 20,
    fontFamily: 'AtomicAge-Regular',
    color: 'white',
  },
  BeanAddButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  BeanAddButtonText: {
    fontSize: 30,
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'orange',
    fontFamily: 'AtomicAge-Regular',
    padding: 10,
  },
  BeanInputForm: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
    position: 'absolute',
    bottom: 60,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 1,
  },
  BeanFormButtonText: {
    fontSize: 30,
    fontFamily: 'AtomicAge-Regular',
    color: 'black',
  },
  BeanInputFormButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  BeanInput: {
    width: '90%',
    height: 45,
    borderColor: 'black',
    borderWidth: 1,
    color: 'black',
  },
});
export default BeanList;
