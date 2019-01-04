import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';
import * as ExpoIcon from '@expo/vector-icons/';
import AppStyle from '../styles/AppStyle';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const { primaryThemeColor, lightGrey } = AppStyle;

class ShortListedPlacesTabScreen extends Component {

    static navigationOptions = {

        title: 'Shortlist',
        tabBarIcon: ({ focused, tintColor }) => (<ExpoIcon.AntDesign
            name={'star'}
            color={focused ? primaryThemeColor : lightGrey}
            size={responsiveFontSize(3.6)}
        />)
    };

    render() {

        return (
            <View style={styles.container}>
                <Text>ShortListedPlacesTabScreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    }
});

export default ShortListedPlacesTabScreen;