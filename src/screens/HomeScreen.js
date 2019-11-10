import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Button
} from 'react-native'
import {Colors} from '../config'
import PageHeader from '../components/PageHeader'
import AddNode from '../components/AddNode'


class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }
    
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({tintColor}) => (
            <Icon name='home' size={24} style={[{width: 24, height: 24},{color: tintColor}]}/>
        )
    }

    render() {
        return (
            <ScrollView>
                <View style={HomeStyles.mainView}>
                    <PageHeader text='Inicio'/>
                    <Text>{JSON.stringify(this.props.data)}</Text>
                    <AddNode/>
                </View>
            </ScrollView>
        )
    }
}

const HomeStyles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    section1: {
        height: '50%',
        marginBottom: '1%'
    },
    section2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '15%',
        padding: 10,
    },
    homeButtonContainer: {
        height: '100%',
        width: '20%',
        backgroundColor: Colors.background
    }
})

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    data: state.authentication.data
})

export default connect(mapStateToProps)(HomeScreen)

AppRegistry.registerComponent('pics2folder', HomeScreen)