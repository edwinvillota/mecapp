import React, { Component } from 'react'
import {
    View,
    ScrollView
} from 'react-native'
import { Fab, Button, Icon, Header, Left, Body, Title, Right } from 'native-base'
import VectorIcon from 'react-native-vector-icons/FontAwesome'
import PageHeader from '../components/PageHeader'
import TransformersViewer from '../components/TransformersViewer'
import { Colors } from '../config'

export default class TransformerScreen extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        title: 'Transformadores',
        drawerLabel: () => (null)
    }

    render(){
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
                        <Title>Transformadores</Title>
                    </Body>
                </Header>
                <TransformersViewer navigation={this.props.navigation} />
                <Fab
                    active={true}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    >
                    <Icon name="sync" />
                </Fab>
            </View>
        )
    }
}

