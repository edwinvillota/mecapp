import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    ScrollView,
    StyleSheet
} from 'react-native'
import { Colors } from '../config'
import { 
    Header,
    Title,
    Body,
    Content,
    Icon,
    Container,
    Card,
    CardItem,
    Text,
    Right,
} from 'native-base'

class ConfigScreen extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        drawerLabel: 'Configuración',
        drawerIcon: ({tintColor}) => (
            <Icon name='settings' size={24} style={[{width: 24, height: 24},{color: tintColor}]}/>
        )
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Header androidStatusBarColor='black' style={{backgroundColor: Colors.background}}>
                        <Body>
                            <Title>
                                Configuración
                            </Title>
                        </Body>
                    </Header>
                    <Container>
                        <Content>
                            <Card>
                                <CardItem>
                                    <Text>Conexiones</Text>
                                </CardItem>
                                <CardItem>
                                    <Icon active type='Entypo' name='network'/>
                                    <Text>Internet</Text>
                                    <Right>
                                        <Icon name="checkcircle" type='AntDesign'/>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Icon active type='AntDesign' name='API'/>
                                    <Text>API</Text>
                                    <Right>
                                        <Icon name="checkcircle" type='AntDesign'/>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Icon active type='MaterialIcons' name='compare-arrows'/>
                                    <Text>Websocket</Text>
                                    <Right>
                                        <Icon name="checkcircle" type='AntDesign'/>
                                    </Right>
                                </CardItem>
                            </Card>
                            <Card>
                                <CardItem>
                                    <Text>Almacenamiento</Text>
                                </CardItem>
                                <CardItem>
                                    <Icon active type='MaterialIcons' name='memory'/>
                                    <Text>Memoria Interna</Text>
                                    <Right>
                                        <Icon name="checkcircle" type='AntDesign'/>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Text>Espacio disponible: 4GB</Text>
                                </CardItem>
                                <CardItem>
                                    <Icon active type='MaterialIcons' name='sd-card'/>
                                    <Text>Memoria Externa</Text>
                                    <Right>
                                        <Icon name="checkcircle" type='AntDesign'/>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Text>Espacio disponible: 16GB</Text>
                                </CardItem>
                            </Card>
                        </Content>
                    </Container>
                </View>
            </ScrollView>
        )
    }
}

const ConfigStyles = StyleSheet.create({

})

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ConfigScreen)