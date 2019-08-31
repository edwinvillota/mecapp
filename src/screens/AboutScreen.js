import React, { Component } from 'react'
import { 
    View,
    Text,
    Button
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Acerca de',
        drawerIcon: ({tintColor}) => (
            <Icon name='info' size={24} style={[{width: 24, height: 24},{color: tintColor}]}/>
        )
    }

    render() {
        return (
            <View>
                <Text>AboutScreen</Text>
            </View>
        )
    }
}