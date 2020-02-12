import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    AppRegistry,
    StyleSheet,
    View,
    Text
} from 'react-native'
import {
    Button
} from 'native-base'
import { stakeoutLocalUser, clearActualStakeoutUser } from '../actions/transformActivitiesActions'
import TextField from '../components/TextField'
import SelectField from '../components/SelectField'
import LocationField from '../components/LocationField'
import PhotoField from '../components/PhotoField'
import { ScrollView } from 'react-native-gesture-handler'

class UserStakeOutScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            props: {
                user_type: 'Normal',
                meter: '',
                brand: '',
                code: '',
                address: '',
                factor: '',
                node: '',
                location: '',
                user_photo: '',
                active_lecture: '',
                active_photo: '',
                reactive_lecture: '',
                reactive_photo: ''
            }
        }
    }

    static navigationOptions = {
        title: 'Levantar Usuario',
        drawerLabel: () => (null)
    }

    handleChange = (propname, value) => {
        this.setState({
            props: {
                ...this.state.props,
                [propname]: value
            }
        })
    }

    handleSave = () => {

    }

    handleCancel = () => {
        this.props.clearActualStakeoutUser()
        this.setState({
            props: {
                user_type: 'Normal',
                meter: '',
                brand: '',
                code: '',
                address: '',
                factor: '',
                node: '',
                location: '',
                user_photo: '',
                active_lecture: '',
                active_photo: '',
                reactive_lecture: '',
                reactive_photo: ''
            }
        })
        this.props.navigation.navigate('NodeStakeOut', {
            node: this.props.navigation.getParam('node'),
            activity: this.props.navigation.getParam('activity')
        })
    }

   
    render() {
        const user = this.props.transformActivities.actual_stakeout_user
        const node = this.props.navigation.getParam('node')
        const mode = this.props.navigation.getParam('mode')
        console.log(this.state.props)
        return (
            <ScrollView>
            <View style={styles.main__wrapper}>
                <Text style={styles.section__title}>Información del Usuario</Text>
                <SelectField 
                    name='user_type'
                    label='Tipo de Usuario'
                    preloadData={(mode === 'stakeout') ? `${user.type}` : false}
                    handleChange={this.handleChange}
                    options={[
                        {label: 'Normal', value: 'Normal'},
                        {label: 'Destacado', value: 'Outstanding'},
                    ]}
                    disable={mode === 'stakeout'}
                    />
                <TextField 
                    name='meter' 
                    label='Medidor'
                    preloadData={(mode === 'stakeout') ? `${user.meter}` : false}
                    placeholder='Serial medidor...' 
                    keyboardType='numeric'
                    handleChange = {this.handleChange}
                    disable={mode === 'stakeout'}
                    />
                <TextField 
                    name='brand' 
                    label='Marca' 
                    preloadData={(mode === 'stakeout') ? user.brand : false}
                    placeholder='Marca medidor...' 
                    keyboardType='default'
                    handleChange = {this.handleChange}
                    disable={mode === 'stakeout'}
                    />
                <TextField 
                    name='code' 
                    label='Código Interno' 
                    preloadData={(mode === 'stakeout') ? `${user.code}` : false}
                    placeholder='Código Interno...' 
                    keyboardType='numeric'
                    handleChange = {this.handleChange}
                    disable={mode === 'stakeout'}
                    />    
                <TextField 
                    name='address' 
                    label='Dirección' 
                    preloadData={(mode === 'stakeout') ? `${user.address}` : false}
                    placeholder='Dirección...' 
                    keyboardType='default'
                    handleChange = {this.handleChange}
                    disable={mode === 'stakeout'}
                    />                   
                <TextField 
                    name='factor' 
                    label='Factor de Conversión' 
                    preloadData={(mode === 'stakeout') ? `${user.factor}` : false}
                    placeholder='Factor de Conversión...' 
                    keyboardType='numeric'
                    handleChange = {this.handleChange}
                    disable={mode === 'stakeout'}
                    />
                <TextField 
                    name='node' 
                    label='Nodo'
                    preloadData={(mode === 'stakeout') ? `${node.number}` : false}
                    placeholder='Nodo...' 
                    keyboardType='numeric'
                    handleChange = {this.handleChange}
                    disable={mode === 'stakeout'}
                    />
                <Text style={styles.section__title}>Información de Campo</Text>
                <LocationField 
                    name='location'
                    label='Ubicación GPS'
                    value={this.state.props.location}
                    handleChange={this.handleChange}
                />
                <PhotoField 
                    name='user_photo'
                    label='Foto del predio'
                    value={this.state.props.user_photo}
                    handleChange={this.handleChange}
                    />
                <Text style={styles.section__title}>Información de Lecturas</Text>
                <TextField 
                    name='active_lecture' 
                    label='Lectura Activa' 
                    placeholder='Lectura Activa...' 
                    keyboardType='numeric'
                    handleChange = {this.handleChange}
                    />
                <PhotoField 
                    name='active_photo'
                    label='Foto de Lectura Activa'
                    value={this.state.props.active_photo}
                    handleChange={this.handleChange}
                    />
                <TextField 
                    name='reactive_lecture' 
                    label='Lectura Reactiva' 
                    placeholder='Lectura Reactiva...' 
                    keyboardType='numeric'
                    handleChange = {this.handleChange}
                    />
                <PhotoField 
                    name='reactive_photo'
                    label='Foto de Lectura Reactiva'
                    value={this.state.props.reactive_photo}
                    handleChange={this.handleChange}
                    />
                <Text style={styles.section__title}>Acciones</Text>
                <View style={styles.action__wrapper}>
                    <Button
                        full
                        style={[styles.action__button, styles.action__save]}
                        onPress={this.handleSave}
                        >
                        <Text style={[styles.action__text]}>Guardar</Text>
                    </Button>
                    <Button
                        full
                        style={[styles.action__button, styles.action__cancel]}
                        onPress={this.handleCancel}
                        >
                        <Text style={[styles.action__text]}>Cancelar</Text>
                    </Button>
                </View>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    section__title: {
        fontSize: 16,
        marginBottom: 15,
        color: 'black',
        borderBottomWidth: 1,
        borderBottomColor: '#3C3C3C'
    },
    main__wrapper: {
        display: "flex",
        padding: 15,
        marginBottom: 15
    },
    action__wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    action__button: {
        display: 'flex',
        height: 40,
        width: '47%'
    },
    action__cancel: {
        backgroundColor: '#C84646'
    },
    action__save: {
        backgroundColor: '#7AB78B'
    },
    action__text: {
        color: 'white'
    }
})

const mapStateToProps = state => ({
    transformActivities: state.transformActivities
})

const mapDispatchToProps = dispatch => ({
    stakeoutLocalUser: (user) => {
        dispatch(stakeoutLocalUser(user))
    },
    clearActualStakeoutUser: () => {
        dispatch(clearActualStakeoutUser())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserStakeOutScreen)