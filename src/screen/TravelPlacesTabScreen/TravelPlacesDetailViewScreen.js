import React, { Component } from 'react';
import { 
    View,
    Text,
    StatusBar,
    StyleSheet
} from 'react-native';
import { Constants } from 'expo';
import * as ExpoIcon from '@expo/vector-icons/';
import ProgressiveImage from 'react-native-image-progress';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import * as Progress from 'react-native-progress';
import AppStyle from '../../styles/AppStyle';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const { primaryThemeColor, primaryBackgroundColor, lightGrey } = AppStyle;

class TravelPlacesDetailViewScreen extends Component {

    constructor(props) {

        super(props);
        this.state = {
            
            activeSlide: 1
        }
    };

    get _renderPagination() {

        const { activeSlide } = this.state;
        let { placeData: { name, images } } = this.props.navigation.state.params;
        
        return (
            <Pagination
                dotsLength={images.length}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: 'transparent' }}
                dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    _renderCarousel = ({ imageUri, index }) => {

        let { placeData: { images } } = this.props.navigation.state.params;

        return (
            <View style={{ backgroundColor: 'red', borderRadius: 10, height: responsiveHeight(48), marginTop: responsiveHeight(4) }}>
                
                <ProgressiveImage
                    source={{ uri: images[index] }}
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

            </View>
        );
    }

    render() {

        let { placeData: { name, country, estimated_cost, images } } = this.props.navigation.state.params;
        let { goBack } = this.props.navigation;

        return (
            <View style={styles.container}>

                <StatusBar barStyle={'light-content'} animated />
            
                <ProgressiveImage
                    source={{ uri: images[0] }}
                    imageStyle={{ borderRadius: 0, backgroundColor: '#F0F0F0' }}
                    indicator={Progress.CircleSnail}
                    indicatorProps={{
                        size: 80,
                        color: primaryThemeColor
                    }}
                    blurRadius={25}
                    style={{

                        zIndex: -4,
                        position: 'absolute',
                        backgroundColor: primaryBackgroundColor,
                        width: '100%',
                        height: '100%',
                    }} />

                <View style={{ alignItems: 'flex-start', width: responsiveWidth(100), marginTop: Constants.statusBarHeight + responsiveHeight(1) }}>
                    <TouchableBounce onPress={() => goBack()}>
                        <ExpoIcon.AntDesign
                            name={'leftcircleo'}
                            color={'#FFF'}
                            style={{ marginHorizontal: responsiveWidth(2), textAlign: 'center' }}
                            size={responsiveFontSize(5.6)}
                        />
                    </TouchableBounce>
                </View>
                
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    autoplay                 
                    autoplayDelay={500}
                    autoplayInterval={3000}
                    data={images}
                    firstItem={1}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                    renderItem={this._renderCarousel}
                    sliderWidth={responsiveWidth(100)}
                    itemWidth={responsiveWidth(80)}
                />
                { this._renderPagination }

                <Text style={{ color: 'white', marginBottom: responsiveHeight(1), fontSize: responsiveFontSize(5.4), fontFamily: 'Nunito' }}>{name}</Text>
                <Text style={{ color: 'white', marginBottom: responsiveHeight(1), fontSize: responsiveFontSize(3.6), fontFamily: 'Nunito' }}>{country}</Text>
                
                <TouchableBounce onPress={() => alert('[Booking Place] -> ' + estimated_cost)} style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderRadius: 5, height: responsiveHeight(8), width: responsiveWidth(94), marginBottom: responsiveHeight(2), paddingVertical: 4, paddingHorizontal: 16, paddingLeft: responsiveWidth(40), backgroundColor: primaryThemeColor }}>
                    <Text style={{ color: 'white', fontSize: responsiveFontSize(3.5), fontFamily: 'Nunito' }}>Buy</Text>
                    <ExpoIcon.MaterialIcons
                        name={'flight-takeoff'}
                        color={'#FFF'}
                        style={{ marginHorizontal: responsiveWidth(2), textAlign: 'center' }}
                        size={responsiveFontSize(4.0)}
                    />
                </TouchableBounce>
            </View>
        );
    }
};

const styles = StyleSheet.create({

    container: {

        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: primaryBackgroundColor
    }
});

export default TravelPlacesDetailViewScreen;