import React, { Component } from 'react';
import { 
    View,
    Text,
    StatusBar,
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
        tabBarIcon: ({ focused, tintColor }) => (<ExpoIcon.Entypo
            name={'aircraft'}
            color={focused ? primaryThemeColor : lightGrey}
            size={responsiveFontSize(4.0)}
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
            <TouchableBounce onPress={() => navigate('TravelPlacesDetailViewScreen', { placeData: place })} style={[styles.itemContainer, { backgroundColor: 'hotpink' }]}>

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

                <TouchableBounce style={{ position: 'absolute', top: 10, left: 4, justifyContent: 'center' }}>
                    <ExpoIcon.Ionicons
                        name={'ios-bookmark'}
                        color={'#FFF'}
                        style={{ marginHorizontal: responsiveWidth(2), textAlign: 'center' }}
                        size={responsiveFontSize(5.4)}
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

                {/* <SearchBar
                    noIcon
                    lightTheme
                    platform={'ios'}
                    value={this.state.searchQuery}
                    onChangeText={this._handleSearch}
                    cancelButtonTitle={'cancel'}
                    containerStyle={{
                        borderWidth: 0,
                        borderTopColor: 'transparent',
                        borderBottomColor: 'rgba(0, 0, 0, 0.05)',
                        backgroundColor: primaryBackgroundColor,
                    }}
                    inputStyle={{ color: '#000', fontSize: 36, fontFamily: 'Nunito', backgroundColor: 'transparent', height: responsiveHeight(8) }}
                    placeholder={'Search...'} /> */}
  
                {/* {
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
                            spacing={12}
                            items={filteredPlacesData}
                            style={styles.gridView}
                            renderItem={item => this._renderPlacesList(item)}
                        />
                    )

                } */}
                
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
        height: responsiveHeight(48),
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