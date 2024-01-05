import {StyleSheet, Text, View} from 'react-native';

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <View>
      <Text>
        This app is vastly overengineer for what it does, It's basically just
        forms, tables and memory. It has a bunch of extra features it doesn't
        need, because it is a playground to learn React Native. Now stop
        thinking about it and use the menu to select the only available page.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Home;
