import {StyleSheet, Text, View} from 'react-native';

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <View>
      <Text style={styles.HomeText}>
        This app is vastly overengineered for what it does. It's basically just
        forms, tables and memory. It has a bunch of extra features it doesn't
        need, because it is a playground to learn React Native. Now disengage
        your brain and use the menu to select the only available page.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  HomeText: {
    fontSize: 30,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
export default Home;
