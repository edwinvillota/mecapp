import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Alert
} from 'react-native'
import {
    Button
} from 'native-base'
import { stakeoutLocalUser, clearActualStakeoutUser, getNodeUsers, stakeoutNewLocalUser } from '../actions/transformActivitiesActions'
import TextField from '../components/TextField'
import SelectField from '../components/SelectField'
import LocationField from '../components/LocationField'
import PhotoField from '../components/PhotoField'
import { ScrollView } from 'react-native-gesture-handler'
import Validator from '../clases/Validator'

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
                reactive_photo: '',
            },
            errors: {
                user_type: false,
                meter: false,
                brand: false,
                code: false,
                address: false,
                factor: false,
                node: false,
                location: false,
                user_photo: false,
                active_lecture: false,
                active_photo: false,
                reactive_lecture: false,
                reactive_photo: false
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

    handleValidate = () => {
        const mode = this.props.navigation.getParam('mode')

        if (mode === 'stakeout') {
            const {
                location,
                user_photo,
                active_lecture,
                active_photo,
                reactive_lecture,
                reactive_photo
            } = this.state.props

            const v = new Validator()

            const validLocation = v.validateLocation(location)
            const validUserPhoto = v.validatePhoto(user_photo)
            const validActiveLecture = v.validateLecture(active_lecture)
            const validActivePhoto = v.validatePhoto(active_photo)
            const validReactiveLecture = v.validateLecture(reactive_lecture)
            const validReactivePhoto = v.validatePhoto(reactive_photo)
            

            this.setState({
                errors: {
                    location: !validLocation.isValid,
                    user_photo: !validUserPhoto.isValid,
                    active_lecture: !validActiveLecture.isValid,
                    active_photo: !validActivePhoto.isValid,
                    // reactive_lecture: !validReactiveLecture.isValid,
                    // reactive_photo: !validReactivePhoto.isValid
                }
            })

            const errValues = [
                !validLocation.isValid,
                !validUserPhoto.isValid,
                !validActiveLecture.isValid,
                !validActivePhoto.isValid
            ]

            const isValidInfo = errValues.includes(true)

            if (!isValidInfo) {
                const node = this.props.navigation.getParam('node')
                const user = this.props.transformActivities.actual_stakeout_user
                const newUser = {
                    node: node,
                    location: this.state.props.location,
                    user_photo: user_photo,
                    info: user
                }

                const newLecture = {
                    user_id: user.id,
                    active_lecture: active_lecture,
                    reactive_lecture: reactive_lecture,
                    active_photo: active_photo,
                    reactive_photo: reactive_photo,
                    activity_id: node.stakeout_id
                }

                this.handleSave(newUser, newLecture)
            } 
        } else if (mode === 'new') {
            const {
                user_type,
                meter,
                brand,
                code,
                address,
                factor,
                node,
                location,
                user_photo,
                active_lecture,
                active_photo,
                reactive_lecture,
                reactive_photo
            } = this.state.props

            const v = new Validator()

            const validUserType = v.validateUserType(user_type)
            const validMeter = v.validateMeter(meter)
            const validBrand = v.validateNoEmpty(brand, 'Marca')
            const validCode = v.validateNoEmpty(code, 'Código')
            const validAddress = v.validateNoEmpty(address, 'Dirección')
            const validFactor = v.validateNoEmpty(factor, 'Factor')
            const validLocation = v.validateLocation(location)
            const validUserPhoto = v.validatePhoto(user_photo)
            const validActiveLecture = v.validateLecture(active_lecture)
            const validActivePhoto = v.validatePhoto(active_photo)
            const validReactiveLecture = v.validateLecture(reactive_lecture)
            const validReactivePhoto = v.validatePhoto(reactive_photo)

            this.setState({
                errors: {
                    user_type: !validUserType.isValid,
                    meter: !validMeter.isValid,
                    brand: !validBrand.isValid,
                    code: !validCode.isValid,
                    address: !validAddress.isValid,
                    factor: !validFactor.isValid,
                    location: !validLocation.isValid,
                    user_photo: !validUserPhoto.isValid,
                    active_lecture: !validActiveLecture.isValid,
                    active_photo: !validActivePhoto.isValid,
                    // reactive_lecture: !validReactiveLecture.isValid,
                    // reactive_photo: !validReactivePhoto.isValid
                }
            })

            const errValues = [
                !validUserType.isValid,
                !validMeter.isValid,
                !validBrand.isValid,
                !validCode.isValid,
                !validAddress.isValid,
                !validFactor.isValid,
                !validLocation.isValid,
                !validUserPhoto.isValid,
                !validActiveLecture.isValid,
                !validActivePhoto.isValid
            ]

            const isValidInfo = errValues.includes(true)

            if(!isValidInfo) {
                const node = this.props.navigation.getParam('node')
                const newUser = {
                    type: user_type,
                    meter: meter,
                    brand: brand,
                    code: code,
                    address: address,
                    location: location,
                    factor: factor,
                    node: node,
                    user_photo: user_photo,
                    activity: this.props.navigation.getParam('activity')
                }

                const newLecture = {
                    active_lecture: active_lecture,
                    reactive_lecture: reactive_lecture,
                    active_photo: active_photo,
                    reactive_photo: reactive_photo,
                    activity_id: node.stakeout_id
                }

                this.handleSave(newUser, newLecture)
            } else {
                console.log('No es Valido')
            }
        }
    }

    handleSave = (user, lecture) => {
        const mode = this.props.navigation.getParam('mode')

        if (mode === 'stakeout') {
            this.props.stakeoutLocalUser(user, lecture)
            Alert.alert(
                'Exito',
                'El usuario se guardo correctamente',
                [
                    {text: 'OK', onPress: () => this.handleCancel()}
                ]
            )
        } else if (mode === 'new') {
            this.props.stakeoutNewLocalUser(user, lecture)
            Alert.alert(
                'Exito',
                'El usuario se guardo correctamente',
                [
                    {text: 'OK', onPress: () => this.handleCancel()}
                ]
            )
        }
        this.props.getNodeUsers(user.node)
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
        return (
            <ScrollView>
            <View style={styles.main__wrapper}>
                <Text style={styles.section__title}>Información del Usuario</Text>
                <SelectField 
                    name='user_type'
                    label='Tipo de Usuario'
                    preloadData={(mode === 'stakeout') ? `${user.type}` : this.state.props.user_type}
                    handleChange={this.handleChange}
                    options={[
                        {label: 'Normal', value: 'Normal'},
                        {label: 'Destacado', value: 'Outstanding'},
                    ]}
                    disable={mode === 'stakeout'}
                    error={this.state.errors.user_type}
                    />
                <TextField 
                    name='meter' 
                    label='Medidor'
                    preloadData={(mode === 'stakeout') ? `${user.meter}` : this.state.props.meter}
                    placeholder='Serial medidor...' 
                    keyboardType='numeric'
                    handleChange = {this.handleChange}
                    disable={mode === 'stakeout'}
                    error={this.state.errors.meter}
                    />
                <TextField 
                    name='brand' 
                    label='Marca' 
                    preloadData={(mode === 'stakeout') ? user.brand : this.state.props.brand}
                    placeholder='Marca medidor...' 
                    keyboardType='default'
                    handleChange = {this.handleChange}
                    disable={mode === 'stakeout'}
                    error={this.state.errors.brand}
                    />
                <TextField 
                    name='code' 
                    label='Código Interno' 
                    preloadData={(mode === 'stakeout') ? `${user.code}` : this.state.props.code}
                    placeholder='Código Interno...' 
                    keyboardType='numeric'
                    handleChange = {this.handleChange}
                    disable={mode === 'stakeout'}
                    error={this.state.errors.code}
                    />    
                <TextField 
                    name='address' 
                    label='Dirección' 
                    preloadData={(mode === 'stakeout') ? `${user.address}` : this.state.props.address}
                    placeholder='Dirección...' 
                    keyboardType='default'
                    handleChange = {this.handleChange}
                    disable={mode === 'stakeout'}
                    error={this.state.errors.address}
                    />                   
                <TextField 
                    name='factor' 
                    label='Factor de Conversión' 
                    preloadData={(mode === 'stakeout') ? `${user.factor}` : this.state.props.factor}
                    placeholder='Factor de Conversión...' 
                    keyboardType='numeric'
                    handleChange = {this.handleChange}
                    disable={mode === 'stakeout'}
                    error={this.state.errors.factor}
                    />
                <TextField 
                    name='node' 
                    label='Nodo'
                    preloadData={`${node.number}`}
                    placeholder='Nodo...' 
                    keyboardType='numeric'
                    handleChange = {this.handleChange}
                    disable={true}
                    />
                <Text style={styles.section__title}>Información de Campo</Text>
                <LocationField 
                    name='location'
                    label='Ubicación GPS'
                    value={this.state.props.location}
                    handleChange={this.handleChange}
                    error={this.state.errors.location}
                />
                <PhotoField 
                    name='user_photo'
                    label='Foto del predio'
                    value={this.state.props.user_photo}
                    handleChange={this.handleChange}
                    error={this.state.errors.user_photo}
                    />
                <Text style={styles.section__title}>Información de Lecturas</Text>
                <TextField 
                    name='active_lecture' 
                    label='Lectura Activa' 
                    preloadData={this.state.props.active_lecture}
                    placeholder='Lectura Activa...' 
                    keyboardType='numeric'
                    handleChange = {this.handleChange}
                    error={this.state.errors.active_lecture}
                    />
                <PhotoField 
                    name='active_photo'
                    label='Foto de Lectura Activa'
                    value={this.state.props.active_photo}
                    handleChange={this.handleChange}
                    error={this.state.errors.active_photo}
                    />
                <TextField 
                    name='reactive_lecture' 
                    label='Lectura Reactiva'
                    preloadData={this.state.props.reactive_lecture}
                    placeholder='Lectura Reactiva...' 
                    keyboardType='numeric'
                    handleChange = {this.handleChange}
                    error={this.state.errors.reactive_lecture}
                    />
                <PhotoField 
                    name='reactive_photo'
                    label='Foto de Lectura Reactiva'
                    value={this.state.props.reactive_photo}
                    handleChange={this.handleChange}
                    error={this.state.errors.reactive_photo}
                    />
                <Text style={styles.section__title}>Acciones</Text>
                <View style={styles.action__wrapper}>
                    <Button
                        full
                        style={[styles.action__button, styles.action__save]}
                        onPress={this.handleValidate}
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
    stakeoutLocalUser: (user, lecture) => {
        dispatch(stakeoutLocalUser(user, lecture))
    },
    clearActualStakeoutUser: () => {
        dispatch(clearActualStakeoutUser())
    },
    getNodeUsers: (node) => {
        dispatch(getNodeUsers(node))
    },
    stakeoutNewLocalUser: (user, lecture) => {
        dispatch(stakeoutNewLocalUser(user, lecture))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserStakeOutScreen)