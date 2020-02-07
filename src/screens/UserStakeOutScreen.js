import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
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
import { stakeoutLocalUser } from '../actions/transformActivitiesActions'

class UserStakeOutScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ubicacion: {
                coords: {}
            },
            lecAct: null,
            lecActPhoto: false,
            lecRea: null,
            lecReaPhoto: false
        }
    }

    static navigationOptions = {
        title: 'Levantar Usuario',
        drawerLabel: () => (null)
    }

    componentDidMount(){
        this.getGeolocation()
    }

    saveUser = () => {
        const user = this.props.navigation.getParam('user')
        const { lecActPhoto, lecReaPhoto, ubicacion, lecAct, lecRea } = this.state
        const newUser = {
            info: user,
            lecAct,
            lecRea,
            lecActPhoto,
            lecReaPhoto,
            ubicacion,
            node: this.props.navigation.getParam('node')
        }

        this.props.stakeoutLocalUser(newUser)
    }

    back = () => {
        const node = this.props.navigation.getParam('node')
        const activity = this.props.navigation.getParam('activity')
        this.props.navigation.navigate('NodeStakeOut', {
            node: node,
            activity: activity
        })
    }

    handleChangeNode = val => {
        this.setState({
            node: val
        })
    }

    handleChangeLecture = (type, value) => {
        switch (type) {
            case 1:
                this.setState({
                    lecAct: value
                })
                break;
            case 2:
                this.setState({
                    lecRea: value
                })
                break;
            default:
                break;
        }
    }

    handlePhotoCapture = photo => {
        switch (photo.type) {
            case 1:
                this.setState({
                    lecActPhoto: photo
                })
                break;
            case 2:
                this.setState({
                    lecReaPhoto: photo
                })
                break;
            default:
                break;
        }
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
        const node = this.props.navigation.getParam('node')
        return (
            <Container>
                <Header 
                    androidStatusBarColor='black' 
                    style={{backgroundColor: Colors.background}}>
                    <Left>
                        <Button transparent
                            onPress={ () => {
                                this.props.navigation.navigate('NodeStakeOut', {
                                    node: this.props.navigation.getParam('node'),
                                    activity: this.props.navigation.getParam('activity')
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
                                disabled 
                                value={user.meter}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Marca Medidor</Label>
                            <Input
                                disabled 
                                value={user.brand}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Código</Label>
                            <Input 
                                disabled
                                value={`${user.code}`}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Dirección</Label>
                            <Input
                                disabled
                                value={user.address}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label>Nodo</Label>
                            <Input 
                                disabled
                                value={`${node.number}`}
                                onChangeText={val => {
                                    this.handleChangeNode(val)
                                }}
                                />
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
                            <Input 
                                value={this.state.lecAct}
                                onChangeText={value => {
                                    this.handleChangeLecture(1,value)
                                }}
                                />
                        </Item>
                        <Item stackedLabel>
                            <Label>Foto Lectura Activa</Label>
                            <CapturePhotoButton handlePhoto={this.handlePhotoCapture} typePhoto={1}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Lectura Reactiva</Label>
                            <Input 
                                value={this.state.lecRea}
                                onChangeText={value => {
                                    this.handleChangeLecture(2,value)
                                }}
                                />
                        </Item>
                        <Item stackedLabel>
                            <Label>Foto Lectura Reactiva</Label>
                            <CapturePhotoButton handlePhoto={this.handlePhotoCapture} typePhoto={2}/>
                        </Item>
                        <Item stackedLabel>
                            <Label>Guardar</Label>
                            <Button iconLeft full success
                                style={styles.photoButton}
                                onPress={this.saveUser}
                                >
                                <Icon name='save' type='MaterialIcons'/>
                                <Text style={{color: 'white'}}>Guardar</Text>
                            </Button>
                        </Item>
                        <Item stackedLabel>
                            <Label>Regresar</Label>
                            <Button iconLeft full warning
                                style={styles.photoButton}
                                onPress={this.back}
                                >
                                <Icon name='arrow-back' type='MaterialIcons'/>
                                <Text style={{color: 'white'}}>Atras</Text>
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
    balance: state.balance,
    api: state.api
})

const mapDispatchToProps = dispatch => ({
    stakeoutLocalUser: (user) => {
        dispatch(stakeoutLocalUser(user))
    } 
})

export default connect(mapStateToProps, mapDispatchToProps)(UserStakeOutScreen)