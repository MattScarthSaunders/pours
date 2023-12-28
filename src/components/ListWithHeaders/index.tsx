/* eslint-disable curly */
import React, {PropsWithChildren} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ListItem from '../ListItem';

type ListWithHeadersProps = PropsWithChildren<{
  headers: {key: string}[];
  data: {[key: string]: string}[][];
}>;

const ListWithHeaders = ({
  headers,
  data,
}: ListWithHeadersProps): React.JSX.Element => {
  return (
    <View>
      <View style={styles.list}>
        {headers.map(header => {
          return <Text style={styles.listItem}>{header.key}</Text>;
        })}
      </View>
      <ScrollView>
        {data.map((dataItem: {[key: string]: string}[], index) => {
          return (
            <ListItem
              parentIndex={index}
              key={index + Math.random()}
              dataItem={dataItem}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },

  listItem: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'AtomicAge-Regular',
    textAlign: 'center',
    flex: 1,
  },
});

export default ListWithHeaders;