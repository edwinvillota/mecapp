import React, { Component } from 'react'
import {
    View,
    Text
} from 'react-native'
import { Colors } from '../config'
import { Header, Left, Button, Icon, Body, Title, H3, Accordion} from 'native-base'
import { BarChart, Grid } from 'react-native-svg-charts'
import BalanceUserList from '../components/BalanceUserList'
import { Dimensions } from 'react-native'

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
                <BarChart
                    style={{ height: 200}}
                    data={[30,52]}
                    svg={{ fill: 'rgba(248,157,70,.5)' }}
                    contentInset={{top: 30, bottom: 30}}
                    >
                    <Grid/>
                </BarChart>
                <H3 style={{color: 'white', backgroundColor: 'black', paddingVertical: 10}}>Crear Nodo</H3>
                <Button info>
                    <Text style={{color: 'white'}}>Crear Nodo</Text>
                </Button>
                <Button success>
                    <Text style={{color: 'white'}}>Ver Nodos</Text>
                </Button>

                {/* <BalanceUserList navigation={this.props.navigation}/> */}
            </View>
        )
    }
}

