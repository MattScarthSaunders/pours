import React from 'react';
import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function BeanList(): React.JSX.Element {
  const navigation = useNavigation();

  return (
    <View>
      <Text>
        IMPLEMENTATION STATUS: oh...uhh...geez, um.... not got round to this
        yet...
      </Text>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
}

export default BeanList;
