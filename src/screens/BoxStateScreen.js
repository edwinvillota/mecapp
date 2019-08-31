import React, { Component } from 'react'
import {
    View,
    ScrollView,
    Button
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import PageHeader from '../components/PageHeader'
import BoxState from '../components/BoxState'

export default class BoxStateScreen extends Component {
    static navigationOptions = {
        title: 'Estado de Caja',
        drawerIcon: ({tintColor}) => (
            <Icon name='th' size={24} style={[{width: 24, height: 24}, {color: tintColor}]} />
        )
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <PageHeader text='Estado de Caja' />
                    <BoxState />
                </View>
            </ScrollView>
        )
    }
}