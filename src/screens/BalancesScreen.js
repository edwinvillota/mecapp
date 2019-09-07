import React, { Component } from 'react'
import { 
    View,
    ScrollView,
    Text
} from 'react-native'
import {
    Card,
    CardItem,
    Icon,
    Right
} from 'native-base'
import VectorIcon from 'react-native-vector-icons/FontAwesome'

import PageHeader from '../components/PageHeader'

export default class BalancesScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            active: false
        }
    }

    static navigationOptions = {
        title: 'Balances Energéticos',
        drawerIcon: ({tintColor}) => (
            <VectorIcon name='percent' size={24} style={[{width: 24, height: 24}, {color: tintColor}]}/>
        )
    }

    render () {
        const { state, navigate } = this.props.navigation
        return (
            <View style={{flex: 1}}>
                <PageHeader text='Balances Energéticos'/>
                <Card>
                    <CardItem button
                        onPress={() => navigate('Transformers')}
                        >
                        <Icon active name='flash' style={{color: '#EBB004'}}/>
                        <Text>Transformadores</Text>
                        <Right>
                            <Icon name='arrow-forward'/>
                        </Right>
                    </CardItem>
                </Card>
            </View>
        )
    }
}