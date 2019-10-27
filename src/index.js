import React, {Component} from 'react'
import {createStackNavigator, createSwitchNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation'
import {Colors} from './config'
import { Root } from 'native-base'

import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import AboutScreen from './screens/AboutScreen'
import BoxStateScreen from './screens/BoxStateScreen'
import LogoutScreen from './screens/LogoutScreen'
import TransformerScreen from './screens/TransformerScreen'
import BalancesScreen from './screens/BalancesScreen'
import TransformerViewScreen from './screens/TransformerViewScreen'
import StakeOutScreen from './screens/StakeOutScreen'
import UserStakeOutScreen from './screens/UserStakeOutScreen'
import ConfigScreen from './screens/ConfigScreen'

const AuthStack = createStackNavigator({
    Login: LoginScreen
})

const AppNavigator = createDrawerNavigator(
    {
        Home: HomeScreen,
        BoxState: BoxStateScreen,
        TransformerView: TransformerViewScreen,
        Transformers: TransformerScreen,
        Balances: BalancesScreen,
        StakeOut: StakeOutScreen,
        UserStakeOut: UserStakeOutScreen,
        Config: ConfigScreen,
        About: AboutScreen,
        Logout: LogoutScreen
    },
    {
        initialRouteName: 'Home',
        drawerType: 'slide',
        drawerBackgroundColor: Colors.background,
        contentOptions: {
            itemStyle: {
                borderBottomWidth: 0.5,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                borderBottomColor: Colors.inactive
            },
            labelStyle: {
            },
            activeTintColor: Colors.primary,
            inactiveTintColor: Colors.inactive,
        },
    }
)

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppNavigator,
        Auth: AuthStack
    },
    {
        initialRouteName: 'AuthLoading'
    }
))

export default class App extends Component {
    render() {
        return (
            <Root>
                <AppContainer />
            </Root>
        )
    }
}