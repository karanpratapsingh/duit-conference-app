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

    setTimeout(() => {

      SplashScreen.hide();      
    }, 1000);
  };

  render() {

    return (

      <View style={styles.appStyle}>

        {
          this.state.isFontLoaded ? (

            <AppContainer />

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
    backgroundColor: '#FAFAFA'
  }
});
