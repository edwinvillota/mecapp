import React, { Component } from 'react'
import {
    View
} from 'react-native'
import { Colors } from '../config'
import { Header, Left, Button, Icon, Body, Title } from 'native-base'
import BalanceUserList from '../components/BalanceUserList'


export default class StakeOutScreen extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        title: 'Nuevo Levantamiento',
        drawerLabel: () => (null)
    }

    render () {
        return (
            <View style={{flex: 1}}>
                <Header 
                    androidStatusBarColor='black' 
                    style={{backgroundColor: Colors.background}}>
                    <Left>
                        <Button transparent
                            onPress={ () => {
                                this.props.navigation.navigate('Transformers')
                            }}
                            >
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Levantamiento</Title>
                    </Body>
                </Header>
                <BalanceUserList />
            </View>
        )
    }
}

