import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    AppRegistry,
    StyleSheet,
    View,
    Text
} from 'react-native'
import {
    Content,
    Header,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Form,
    Item,
    Input, 
    Label,
    Container
} from 'native-base'
import { Colors } from '../config'
import CapturePhotoButton from '../components/CapturePhotoButton'

class UserStakeOutScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ubicacion: {
                coords: {}
            }
        }
    }

    static navigationOptions = {
        title: 'Levantar Usuario',
        drawerLabel: () => (null)
    }

    componentDidMount(){
        this.getGeolocation()
    }

    getGeolocation = () => {
        navigator.geolocation.getCurrentPosition(
            posicion => {
                const ubicacion = posicion;
                this.setState({ ubicacion })
            }, 
            error => {
                alert(error.message)
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
    }

    render() {
        const user = this.props.navigation.getParam('user')
        return (
            <Container>
                <Header 
                    androidStatusBarColor='black' 
                    style={{backgroundColor: Colors.background}}>
                    <Left>
                        <Button transparent
                            onPress={ () => {
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
                        <Title>Levantar Usuario</Title>
                    </Body>
                </Header>
                <Content padder={true}>
                    <Form>
                        <Item stackedLabel>
                            <Label>Serie Medidor</Label>
                            <Input 
                                value={user.meter}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Marca Medidor</Label>
                            <Input 
                                value={user.brand}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Código</Label>
                            <Input 
                                value={`${user.code}`}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Dirección</Label>
                            <Input 
                                value={user.address}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Nodo</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel>
                            <Label>Ubicación</Label>
                            <Left style={{marginVertical: 10}}>
                                <Text style={styles.coordsText}>{`Latitud: ${this.state.ubicacion.coords.latitude}`}</Text>
                                <Text style={styles.coordsText}>{`Longitud: ${this.state.ubicacion.coords.longitude}`}</Text>
                            </Left>
                            <Button iconLeft full bordered
                                onPress={this.getGeolocation}
                                >
                                <Icon name='gps-fixed' type='MaterialIcons'/>
                                <Text>Actualizar</Text>
                            </Button>
                        </Item>
                        <Item stackedLabel>
                            <Label>Lectura Activa</Label>
                            <Input />
                        </Item>
                        <Item stackedLabel>
                            <Label>Foto Lectura Activa</Label>
                            <CapturePhotoButton />
                        </Item>
                        <Item stackedLabel>
                            <Label>Lectura Reactiva</Label>
                            <CapturePhotoButton />
                        </Item>
                        <Item stackedLabel>
                            <Label>Guardar</Label>
                            <Button iconLeft full success
                                style={styles.photoButton}
                                >
                                <Icon name='save' type='MaterialIcons'/>
                                <Text style={{color: 'white'}}>Guardar</Text>
                            </Button>
                        </Item>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    photoButton: {
        marginVertical: 10
    }
})

const mapStateToProps = state => ({
    balance: state.balance 
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(UserStakeOutScreen)