import React, { Component } from 'react';
import { 
    View,
    Text,
    RefreshControl,
    StyleSheet
} from 'react-native';
import { Constants } from 'expo';
import * as ExpoIcon from '@expo/vector-icons/';
import GridView from 'react-native-super-grid';
import AppStyle from '../styles/AppStyle';
import { SearchBar } from 'react-native-elements';
import ProgressiveImage from 'react-native-image-progress';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import PlacesData from '../api/Places-Data.json';

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
    // _onRefresh = () => alert('Refreshing...');

    _renderPlaces = (place) => {

        let { name, country, images } = place;

        return (
            <TouchableBounce style={[styles.itemContainer, { backgroundColor: 'hotpink' }]}>

                <ProgressiveImage

                    source={{ uri: images[0] }}
                    imageStyle={{ borderRadius: 10 }}
                    style={{
                        position: 'absolute',
                        borderRadius: 10,
                        backgroundColor: '#F0F0F0',
                        width: '100%',
                        height: '100%',
                    }} />

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
                            size={responsiveFontSize(4.0)}
                        />
                    </View>
                    
                </View>
                
            </TouchableBounce>
        );
    }

    render() {

        const items = [
            { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
            { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
            { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
            { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
            { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
            { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
            { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
            { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
            { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
            { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
        ];


        let { searchQuery } = this.state;

        let filteredPlacesData = [...PlacesData].filter((place, _) => {

            if (searchQuery === '') return place;
            else if (name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) return place;

        });

        return (
            <View style={styles.container}>

                <SearchBar
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
                    inputStyle={{ color: '#000', fontSize: 40, fontWeight: '300', backgroundColor: 'transparent', height: responsiveHeight(8) }}
                    placeholder={'Search'} />

                
                {
                    filteredPlacesData.length === 0 ? (

                        <View style={{ alignItems: 'center', backgroundColor: 'transparent', paddingTop: responsiveHeight(5) }}>
                            <Text style={{ fontSize: 24, fontWeight: '300' }}>No user found</Text>
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
                            items={PlacesData}
                            style={styles.gridView}
                            renderItem={item => this._renderPlaces(item)}
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
        height: responsiveHeight(40),
    },
    itemName: {
        
        color: '#FFF',
        fontSize: 24,
        fontWeight: '500'
    },
    itemCountry: {

        color: '#FFF',
        fontSize: 18,
        fontWeight: '400'
    },
});

export default TravelPlacesTabScreen;