import {PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type ListItemProps = PropsWithChildren<{
  parentIndex: number;
  dataItem: {[key: string]: string}[];
}>;

const ListItem = ({
  parentIndex,
  dataItem,
}: ListItemProps): React.JSX.Element => {
  const inG = Number(dataItem[0].val);
  const outG = Number(dataItem[1].val);
  const numerator = inG ? 1 : 0;
  const denominator = Math.round((outG / inG) * 10) / 10 || 0;

  return (
    <View style={[styles.list, parentIndex % 2 !== 0 && styles.listItemOdd]}>
      {dataItem.map((item, index) => {
        return (
          <Text key={item.key + index} style={[styles.listItem]}>
            {item.key === 'ratio' ? `${numerator}:${denominator}` : item.val}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
  },

  listItem: {
    flex: 1,
    fontWeight: '600',
    fontFamily: 'AtomicAge-Regular',
    textAlign: 'center',
    borderRightColor: 'white',
    borderRightWidth: 1,
    fontSize: 20,
  },
  listItemOdd: {
    backgroundColor: 'beige',
  },
});

export default ListItem;
