import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View
} from 'react-native'
import { loginSuccess } from '../actions'
import axios from 'axios'

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props)
        this._bootstrapAsync()
    }

    _bootstrapAsync =  async () => {
        const isAuthenticated = await AsyncStorage.getItem('isAuthenticated')
        const data = await AsyncStorage.getItem('data')
        const token = await AsyncStorage.getItem('token')
        if (isAuthenticated && data && token) {
            this.props.loginSuccess(JSON.parse(data))
            axios.defaults.headers.common['Authorization'] = token
            this.props.navigation.navigate('App')
        } else {
            this.props.navigation.navigate('Auth')
        }
    }

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle='default'/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    data: state.authentication.data
})

const mapDispatchToProps = dispatch => ({
    loginSuccess: (data) => {
        dispatch(loginSuccess(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)