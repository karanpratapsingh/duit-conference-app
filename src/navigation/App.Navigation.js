import TravelPlacesTabScreen from '../screen/TravelPlacesTabScreen';
import ShortListedPlacesTabScreen from '../screen/ShortListedPlacesTabScreen';
import AppStyle from '../styles/AppStyle';
import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';

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

export default AppContainer = createAppContainer(AppTabNavigator);