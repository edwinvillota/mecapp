import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    AppRegistry,
    View,
    Text
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Button } from 'native-base'
import { logout } from '../actions'


class LogoutScreen extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        title: 'Salir',
        drawerIcon: ({tintColor}) => (
            <Icon name='sign-out' size={24} style={[{width: 24, height: 24},{color: tintColor}]}/>
        )
    }

    logout = e => {
        this.props.logout()
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
            <View>
                <Button
                    onPress={this.logout}
                >
                    <Text>Salir</Text>
                </Button>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isAuthencated: state.authentication.isAuthencated,
    data: state.authentication.data
})

const mapDispatchToProps = dispatch => ({
    logout: () => {
        dispatch(logout())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen)

AppRegistry.registerComponent('pics2folder', LogoutScreen)