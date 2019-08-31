import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../actions'
import {
    AppRegistry,
    View,
    Text,
    AsyncStorage
} from 'react-native'
import { Content, Form, Item, Input, Button, Icon, Spinner } from 'native-base'

class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            id: false,
            password: false
        }
    }


    componentDidUpdate() {
        const { isAuthenticated, navigation } = this.props 
        if (isAuthenticated) {
            navigation.navigate('Home')
        }
    }

    
    onSignIn = e => {
        // Validate user
        const user = {
            CC: this.state.id,
            password: this.state.password
        }

        this.props.login(user)
    }

    render() {
        const {
            isRequesting,
            isAuthenticated
        } = this.props

        return (
                <Content>
                    <Form>
                        <Item>
                            <Input 
                                placeholder="Identificación"
                                onChangeText={(value) => this.setState({id: value})}
                                />
                        </Item>
                        <Item last>
                            <Input 
                                secureTextEntry
                                placeholder="Contraseña"
                                onChangeText={(value) => this.setState({password: value})}
                                />
                        </Item>
                    </Form>
                    <Button 
                        block 
                        iconLeft
                        onPress={this.onSignIn}
                        >
                        { isRequesting ? (
                            <Spinner color='white'/>
                        ) : (
                            <Icon name='log-in'/>
                        )
                        }
                        <Text style={{marginHorizontal: 5, color: 'white'}} >INGRESAR</Text>
                    </Button>
                    <Text>{this.state.storage}</Text>
                </Content>
        )
    }
}


const mapStateToProps = (state) => ({
    isRequesting: state.authentication.isRequesting,
    error: state.authentication.error,
    isAuthenticated: state.authentication.isAuthenticated,
    status: state.authentication.status,
    data: state.authentication.data
})

const mapDispatchToProps = (dispatch) => ({
    login: (user) => {
        dispatch(login(user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)

AppRegistry.registerComponent('pics2folder', LoginForm)