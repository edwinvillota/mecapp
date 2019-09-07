import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    ScrollView
} from 'react-native'
import { Header, Left, Button, Title, Body, Icon } from 'native-base'
import { Colors } from '../config'

export default class TransformerViewScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    static navigationOptions = {
        title: 'Transformador',
        drawerLabel: () => (null)
    }

    render () {
        return (
            <View style={{flex: 1}}>
                <Header androidStatusBarColor='black' style={{backgroundColor: Colors.background}}>
                    <Left>
                        <Button transparent
                            onPress={ () => {
                                this.props.navigation.navigate('Balances')
                            }}
                            >
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.navigation.getParam('structure')}</Title>
                    </Body>
                </Header>
            </View>
        )
    }
}
