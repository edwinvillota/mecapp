import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    Modal
} from 'react-native'

import { Colors } from '../config'
import { Header, Left, Button, Icon, Body, Title, Content, Tab, Tabs } from 'native-base'
import BalanceUserList from '../components/BalanceUserList'
import NodeUserList from '../components/NodeUserList'


export default class NodeStakeOutScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchModalVisible: false
        }
    }

    static navigationOptions = {
        title: 'Levantar Nodo',
        drawerLabel: () => (null)
    }

    render () {
        return (
            <View style={{flex: 1}}>
                <Header
                    androidStatusBarColor='black'
                    style={{backgroundColor: Colors.background}}
                    >
                    <Left>
                        <Button transparent
                            onPress={() => {
                                this.props.navigation.navigate('StakeOut', {
                                    transformer_id: this.props.navigation.getParam('transformer_id'),
                                    structure: this.props.navigation.getParam('structure')
                                })
                            }}
                            >
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>{`Levatar Nodo ${this.props.navigation.getParam('node_id')}`}</Title>
                    </Body>
                </Header>
                <ScrollView>
                    <View style={{flex: 1, padding: 10, backgroundColor: '#333333'}}>
                            <Text
                                style={{fontSize: 20, color: 'white'}}
                                >
                                    Agregar
                            </Text>
                    </View>
                    <View style={{
                        flex: 1, 
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        padding: 10
                        }}
                        >
                        <Button iconLeft 
                            success
                            style={{width: '47%'}}
                            onPress={() => {
                                this.setState({
                                    searchModalVisible: true
                                })
                            }}
                            >
                            <Icon name='add'/>
                            <Text style={{color: 'white', marginEnd: 10}}>
                                Usuario
                            </Text>
                        </Button>
                        <Button iconLeft 
                            primary
                            style={{width: '47%'}}
                            >
                            <Icon name='add'/>
                            <Text style={{color: 'white', marginEnd: 10}}>
                                Otras Cargas
                            </Text>
                        </Button>
                        <Modal
                            animationType='slide'
                            transparent={false}
                            visible={this.state.searchModalVisible}
                            onRequestClose={() => {
                                this.setState({
                                    searchModalVisible: false
                                })
                            }}
                            >
                            <BalanceUserList 
                                navigation={this.props.navigation}
                                handleCloseModal={() => {
                                    this.setState({
                                        searchModalVisible: false
                                    })
                                }}
                                node_id={this.props.navigation.getParam('node_id')}
                                />
                        </Modal>
                    </View>
                    <View style={{flex: 1, padding: 10}}>
                        <Tabs>
                            <Tab heading='Usuarios' tabStyle={{backgroundColor: '#333333'}} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#4682B4'}}>
                                <NodeUserList
                                    node={this.props.navigation.getParam('node_id')}
                                    />
                            </Tab>
                            <Tab heading='Otras Cargas' tabStyle={{backgroundColor: '#333333'}} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#4682B4'}}>
                                <Text>Otras Cargas</Text>
                            </Tab>
                            <Tab heading='Ilegales' tabStyle={{backgroundColor: '#333333'}} textStyle={{color: 'white'}} activeTabStyle={{backgroundColor: '#4682B4'}}>
                                <Text>Ilegales</Text>
                            </Tab>
                        </Tabs>
                    </View>
                </ScrollView>
            </View>
        )
    }
}