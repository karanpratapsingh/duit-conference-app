import TravelPlacesTabScreen from '../screen/TravelPlacesTabScreen/TravelPlacesTabScreen';
import TravelPlacesDetailViewScreen from '../screen/TravelPlacesTabScreen/TravelPlacesDetailViewScreen';
import FavouritePlacesTabScreen from '../screen/FavouritePlacesTabScreen/FavouritePlacesTabScreen';
import ReachOutTabScreen from '../screen/ReachOutTabScreen/ReachOutTabScreen';
import UserProfileTabScreen from '../screen/UserProfileTabScreen/UserProfileTabScreen';

import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import AppStyle from '../styles/AppStyle';

const AppTabNavigator = createMaterialTopTabNavigator({

    TravelPlacesTabScreen: { screen: TravelPlacesTabScreen },
    FavouritePlacesTabScreen: { screen: FavouritePlacesTabScreen },
    ReachOutTabScreen: { screen: ReachOutTabScreen },
    UserProfileTabScreen: { screen: UserProfileTabScreen }
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