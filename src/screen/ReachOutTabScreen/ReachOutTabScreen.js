import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import * as ExpoIcon from '@expo/vector-icons/';
import AppStyle from '../../styles/AppStyle';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const { primaryThemeColor, primaryBackgroundColor, lightGrey } = AppStyle;

class ReachOutTabScreen extends Component {

    static navigationOptions = {

        title: 'Reach Out',
        tabBarIcon: ({ focused, tintColor }) => (<ExpoIcon.AntDesign
            name={'message1'}
            color={focused ? primaryThemeColor : lightGrey}
            size={responsiveFontSize(3.6)}
        />)
    };

    render() {

        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 40, fontFamily: 'Nunito' }}>Reach Out</Text>                
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: primaryBackgroundColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ReachOutTabScreen;