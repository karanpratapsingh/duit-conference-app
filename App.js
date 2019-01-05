import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SplashScreen, Font } from 'expo';
import AppContainer from './src/navigation/App.Navigation';

export default class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      isFontLoaded: false
    };

    SplashScreen.preventAutoHide();
  };

  componentDidMount = async () => {

    await Font.loadAsync({

      'Nunito': require('./assets/fonts/Nunito-Regular.ttf')
    });

    this.setState({ ...this.state, isFontLoaded: true });

    SplashScreen.hide();
  };

  render() {

    return (

      <View style={styles.appStyle}>

        {
          this.state.isFontLoaded ? (

            // <AppContainer />
            <Text style={{ fontSize: 24, fontFamily: 'Nunito' }}>Hello, Welcome to React Native :)</Text>

          ) 
          : 
          <View></View>
        }

      </View>
    );
  }
};

const styles = StyleSheet.create({

  appStyle: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA'
  }
});
