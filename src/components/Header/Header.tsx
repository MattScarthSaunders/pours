import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type HeaderProps = PropsWithChildren<{
  title: string;
}>;

const Header = ({title}: HeaderProps): React.JSX.Element => {
  return (
    <View style={styles.HeaderContainer}>
      <Text style={styles.ListWithHeadersTitle}>{title}</Text>
      <Text style={styles.ListWithHeadersBeans}>Lazy Sunday</Text>
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
