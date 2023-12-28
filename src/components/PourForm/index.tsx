import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type PourFormProps = PropsWithChildren<{
  headers: {[key: string]: string}[];
  currentFormData: {key: string; val: string}[];
  setCurrentFormData: React.Dispatch<
    React.SetStateAction<
      {
        key: string;
        val: string;
      }[]
    >
  >;
}>;

const PourForm = ({
  headers,
  currentFormData,
  setCurrentFormData,
}: PourFormProps): React.JSX.Element => {
  return (
    <View style={styles.formContainer}>
      <View style={styles.list}>
        {headers.map(header => {
          return <Text style={styles.listItem}>{header.key}</Text>;
        })}
      </View>
      <View style={styles.inputContainer}>
        {currentFormData.map((item, index) => {
          return (
            <TextInput
              keyboardType={item.key === 'profile' ? 'default' : 'numeric'}
              style={styles.inputBox}
              value={item.key === 'ratio' ? '-' : currentFormData[index].val}
              onChangeText={v =>
                setCurrentFormData(prev => {
                  const newData = [...prev];
                  newData[index].val = v;
                  return newData;
                })
              }
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {position: 'absolute', bottom: 70, width: '100%'},
  list: {
    flexDirection: 'row',
  },
  listItem: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'AtomicAge-Regular',
    textAlign: 'center',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputBox: {
    fontSize: 18,
    fontWeight: '400',
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
});

export default PourForm;
