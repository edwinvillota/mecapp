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
    Input,
    Form,
    Item,
    Label,
    Button
} from 'native-base'
import { setApiIp } from '../actions/apiActions'

class ConfigScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newApiIp: ''
        }
    }

    static navigationOptions = {
        drawerLabel: 'Configuración',
        drawerIcon: ({tintColor}) => (
            <Icon name='settings' size={24} style={[{width: 24, height: 24},{color: tintColor}]}/>
        )
    }

    handleChangeAPIIP = () => {
        const newApiIp = this.state.newApiIp

        if (newApiIp.trim().length) {
            this.props.setApiIp(newApiIp)
        }
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
                            <View style={ConfigStyles.api__mainwrapper}>
                                <Form style={ConfigStyles.api__form}>
                                    <Text>{this.props.api.url}</Text>
                                    <Item stackedLabel>
                                        <Label>IP API</Label>
                                        <Input 
                                            value={this.state.newApiIp}
                                            onChangeText={text => {
                                                this.setState({
                                                    newApiIp: text
                                                })
                                            }}
                                        />
                                    </Item>
                                    <Button
                                        full
                                        onPress={this.handleChangeAPIIP}
                                        >
                                        <Text>Cambiar API IP</Text>
                                    </Button>
                                </Form>
                            </View>
                        </Content>
                    </Container>
                </View>
            </ScrollView>
        )
    }
}

const ConfigStyles = StyleSheet.create({
    api__mainwrapper: {
        display: 'flex'
    },
    api__form: {

    }
})

const mapStateToProps = state => ({
    api: state.api
})

const mapDispatchToProps = dispatch => ({
    setApiIp: (newApiIp) => {
        dispatch(setApiIp(newApiIp))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfigScreen)