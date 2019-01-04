import TravelPlacesTabScreen from '../screen/TravelPlacesTabScreen/TravelPlacesTabScreen';
import TravelPlacesDetailViewScreen from '../screen/TravelPlacesTabScreen/TravelPlacesDetailViewScreen';
import ShortListedPlacesTabScreen from '../screen/ShortListedPlacesTabScreen/ShortListedPlacesTabScreen';
import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import AppStyle from '../styles/AppStyle';

const AppTabNavigator = createMaterialTopTabNavigator({

    TravelPlacesTabScreen: { screen: TravelPlacesTabScreen },
    ShortListedPlacesTabScreen: { screen: ShortListedPlacesTabScreen }
},{
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        optimizationsEnabled: true,
        tabBarOptions: {

            showLabel: false,
            showIcon: true,
            scrollEnabled: false,
            pressOpacity: 0.8,
            indicatorStyle: {

                height: 4,
                borderRadius: 10,
                backgroundColor: AppStyle.primaryThemeColor
            },
            iconStyle: {

                height: 32,
                width: 32,
            },
            labelStyle: {

                fontSize: 12,
            },
            style: {

                borderTopWidth: 1,
                backgroundColor: '#FFFFFF',
                borderTopColor: '#EEE'
            },
        }
});

const AppStackNavigator = createStackNavigator({

    AppTabNavigator: { screen: AppTabNavigator },
    TravelPlacesDetailViewScreen: { screen: TravelPlacesDetailViewScreen }
}, { headerMode: 'none' })

export default AppContainer = createAppContainer(AppStackNavigator);