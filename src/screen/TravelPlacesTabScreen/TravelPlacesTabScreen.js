import React, { Component } from 'react';
import { 
    View,
    Text,
    StatusBar,
    Platform,
    RefreshControl,
    StyleSheet
} from 'react-native';
import { Constants } from 'expo';
import * as ExpoIcon from '@expo/vector-icons/';
import GridView from 'react-native-super-grid';
import AppStyle from '../../styles/AppStyle';
import { SearchBar } from 'react-native-elements';
import ProgressiveImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import PlacesData from '../../api/Places-Data.json';

const { primaryThemeColor, primaryBackgroundColor, lightGrey } = AppStyle;

class TravelPlacesTabScreen extends Component {

    static navigationOptions = {

        title: 'Home',
        tabBarIcon: ({ focused, tintColor }) => (<ExpoIcon.FontAwesome
            name={focused ? 'map' : 'map-o'}
            color={focused ? primaryThemeColor : lightGrey}
            size={responsiveFontSize(3.2)}
        />)
    };

    constructor(props) {

        super(props);
        this.state = {

            searchQuery: '',
            isRefreshing: false
        };
    };

    _handleSearch = (text) => this.setState({ searchQuery: text });
    _onRefresh = () => console.log('Refreshing...');

    _renderPlacesList = (place) => {

        let { name, country, images } = place;
        let { navigate } = this.props.navigation;

        return (
            <TouchableBounce onPress={() => navigate('TravelPlacesDetailViewScreen', { placeData: place })} style={[styles.itemContainer, { backgroundColor: 'transparent' }]}>

                <ProgressiveImage
                    source={{ uri: images[0] }}
                    imageStyle={{ borderRadius: 10, backgroundColor: '#F0F0F0' }}
                    indicator={Progress.CircleSnail}
                    indicatorProps={{
                        size: 52,
                        color: primaryThemeColor
                    }}
                    style={{
                        position: 'absolute',
                        borderRadius: 10,
                        backgroundColor: primaryBackgroundColor,
                        width: '100%',
                        height: '100%',
                    }} />

                <TouchableBounce style={{ position: 'absolute', top: responsiveHeight(2), left: responsiveWidth(2), justifyContent: 'center' }}>
                    <ExpoIcon.AntDesign
                        name={'hearto'}
                        color={'#FFF'}
                        style={{ marginHorizontal: responsiveWidth(2), textAlign: 'center' }}
                        size={responsiveFontSize(4.4)}
                    />
                </TouchableBounce>

                <View style={{ flexDirection: 'row', borderRadius: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: responsiveWidth(3.20) }}>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.itemName}>{name}</Text>
                        <Text style={styles.itemCountry}>{country}</Text>
                    </View>
                    
                    <View style={{ justifyContent: 'center' }}>
                        <ExpoIcon.AntDesign
                            name={'rightcircleo'}
                            color={'#FFF'}
                            style={{ marginHorizontal: responsiveWidth(2), textAlign: 'center' }}
                            size={responsiveFontSize(5.0)}
                        />
                    </View>
                    
                </View>
                
            </TouchableBounce>
        );
    }

    render() {

        let { searchQuery } = this.state;

        let filteredPlacesData = [...PlacesData].filter(place => {

            let { name } = place;

            if (searchQuery === '') return place;
            else if (name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) return place;

        });

        return (
            <View style={styles.container}>

                <StatusBar barStyle={'dark-content'} animated />

                <SearchBar
                    noIcon
                    lightTheme
                    platform={'ios'}
                    value={this.state.searchQuery}
                    onChangeText={this._handleSearch}
                    cancelButtonTitle={'cancel'}
                    // icon={{ name: 'search', color: '#404040', style: { fontSize: 32, marginBottom: responsiveHeight(0.0) } }}
                    clearIcon={{ name: 'close', color: '#404040', style: { fontSize: 28, marginTop: responsiveHeight(0.2) } }}
                    cancelButtonTitle={'Cancel'}
                    containerStyle={{
                        borderWidth: 0,
                        borderTopColor: 'transparent',
                        borderBottomColor: 'rgba(0, 0, 0, 0.05)',
                        backgroundColor: primaryBackgroundColor,
                    }}
                    inputStyle={{ color: '#404040', paddingLeft: responsiveWidth(4), fontSize: responsiveFontSize(4.0), fontFamily: 'Nunito', backgroundColor: 'transparent', height: responsiveHeight(7) }}
                    placeholder={'Search...'} />
  
                {
                    filteredPlacesData.length === 0 ? (

                        <View style={{ alignItems: 'center', backgroundColor: 'transparent', paddingTop: responsiveHeight(5) }}>
                            <Text style={{ fontSize: 24, fontFamily: 'Nunito' }}>Place not found</Text>
                        </View>

                    ) : (

                        <GridView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this._onRefresh}
                                />
                            }                            
                            itemDimension={responsiveHeight(32)}
                            spacing={16}
                            items={filteredPlacesData}
                            style={styles.gridView}
                            renderItem={item => this._renderPlacesList(item)}
                        />
                    )

                }
                
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: primaryBackgroundColor
    },
    gridView: {
        
        flex: 1,
        backgroundColor: primaryBackgroundColor
    },
    itemContainer: {

        justifyContent: 'flex-end',
        borderRadius: 10,
        height: responsiveHeight(60),
    },
    itemName: {
        
        color: '#FFF',
        fontSize: responsiveFontSize(3.6),
        fontFamily: 'Nunito'
    },
    itemCountry: {

        color: '#FFF',
        fontSize: responsiveFontSize(2.8),
        fontFamily: 'Nunito'
    },
});

export default TravelPlacesTabScreen;