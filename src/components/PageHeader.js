import React, {Component} from 'react'
import {Colors} from '../config'
import {AppRegistry,StyleSheet,View,Text} from 'react-native'

class PageHeader extends Component {
    constructor() {
        super()
    }

    render() {
        return(
            <View style={HeaderStyles.container}>
                <Text
                    style={HeaderStyles.text}
                    >
                    {this.props.text}
                </Text>
            </View>
        )
    }
}

const HeaderStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: 50,
        backgroundColor: Colors.background,
        paddingHorizontal: 10,
        elevation: 10,
        position: 'relative'
    },
    text: {
        fontSize: 18,
        color: Colors.text,
    }
})


export default PageHeader

AppRegistry.registerComponent('pics2folder', PageHeader)
