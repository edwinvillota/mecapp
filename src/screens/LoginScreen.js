import React, { Component } from 'react'
import {
    View,
    ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import LoginForm from '../components/LoginForm'

export default class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Iniciar Sesión',
        drawerIcon: ({tintColor}) => (
            <Icon name='sign-in' size={24} style={[{width: 24, height: 24}, {color: tintColor}]} />
        )
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <LoginForm navigation={this.props.navigation}/>
                </View>
            </ScrollView>
        )
    }
}



