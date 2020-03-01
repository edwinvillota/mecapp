import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    Text,
    Alert
} from 'react-native'

import {
    Button
} from 'native-base'
import SelectField from '../components/SelectField'
import TextField from '../components/TextField'
import LocationField from '../components/LocationField'
import PhotoField from '../components/PhotoField'
import { ScrollView } from 'react-native'
import Validator from '../clases/Validator'
import { clearActualStakeoutUser } from '../actions/transformActivitiesActions'


class BadLinkStakeOutScreen extends Component {
    constructor (props) {
        super(props)
        this.state = {
            props: {
                type: 'bad_link',
                location: '',
                photo: '',
                meter_photo: '',
                new_transformer: '',
                new_transformer_photo: ''
            },
            errors: {
                type: false,
                location: false,
                photo: false,
                meter_photo: false,
                new_transformer: false,
                new_transformer_photo: false
            }
        }
    }

    static navigationOptions = {
        title: 'Usuario no encontrado',
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

    handleCancel = () => {
        this.props.clearActualStakeoutUser()
        this.setState({
            props: {
                type: 'bad_link',
                location: '',
                photo: '',
                meter_photo: '',
                new_transformer: '',
                new_transformer_photo: ''
            }
        })
        this.props.navigation.navigate('NodeStakeOut', {
            node: this.props.navigation.getParam('node'),
            activity: this.props.navigation.getParam('activity')
        })
    }

    handleValidate = () => {
        const {
            type,
            location,
            photo,
            meter_photo,
            new_transformer,
            new_transformer_photo
        } = this.state.props

        if (type === 'bad_link') {
            const v = new Validator()

            const validLocation = v.validateLocation(location)
            const validPhoto = v.validatePhoto(photo)
            const validMeterPhoto = v.validatePhoto(meter_photo)
            const validNewTransformer = v.validateNoEmpty(new_transformer)
            const validNewTransformerPhoto = v.validatePhoto(new_transformer_photo)

            this.setState({
                errors: {
                    location: !validLocation.isValid,
                    photo: !validPhoto.isValid,
                    meter_photo: !validMeterPhoto.isValid,
                    new_transformer: !validNewTransformer.isValid,
                    new_transformer_photo: !validNewTransformerPhoto.isValid
                }
            })

            const errValues = [
                !validLocation.isValid,
                !validPhoto.isValid,
                !validMeterPhoto.isValid,
                !validNewTransformer.isValid,
                !validNewTransformerPhoto.isValid
            ]

            const isValidInfo = errValues.includes(true)

            if (!isValidInfo) {
                const newBadLink = {
                    type,
                    location,
                    photo,
                    meter_photo,
                    new_transformer,
                    new_transformer_photo
                }
                this.handleSave(newBadLink)
            } else {
                console.log('Información incorrecta')
            }
        } else if (type === 'not_found') {
            const v = new Validator()

            const validType = v.validateNoEmpty(type)

            this.setState({
                errors: {
                    type: !validType.isValid
                }
            })

            const errValues = [
                !validType.isValid
            ]

            const isValidInfo = errValues.includes(true)

            if (!isValidInfo) {
                const newBadLink = {
                    type 
                }
                this.handleSave(newBadLink)
            } else {
                console.log('Información incorrecta')
            }
        }
    }

    handleSave = (badlink) => {
        const activity = this.props.navigation.getParam('activity')
        
    }

    render() {
        const user = this.props.transformActivities.actual_stakeout_user
        const node = this.props.navigationOptions
        return (
            <ScrollView>
                <View style={styles.main__wrapper}>
                    <Text style={styles.section__title}>Levantar usuario no encontrado</Text>
                    <SelectField 
                        name='user_type'
                        label='Tipo de Usuario'
                        preloadData={`${user.type}`}
                        handleChange={this.handleChange}
                        options={[
                            {label: 'Normal', value: 'Normal'},
                            {label: 'Destacado', value: 'Outstanding'},
                        ]}
                        disable={true}
                        />
                    <TextField 
                        name='meter' 
                        label='Medidor'
                        preloadData={`${user.meter}`}
                        placeholder='Serial medidor...' 
                        keyboardType='numeric'
                        handleChange = {this.handleChange}
                        disable={true}
                        />
                    <TextField 
                        name='brand' 
                        label='Marca' 
                        preloadData={user.brand}
                        placeholder='Marca medidor...' 
                        keyboardType='default'
                        handleChange = {this.handleChange}
                        disable={true}
                        />
                    <TextField 
                        name='code' 
                        label='Código Interno' 
                        preloadData={`${user.code}`}
                        placeholder='Código Interno...' 
                        keyboardType='numeric'
                        handleChange = {this.handleChange}
                        disable={true}
                        />    
                    <TextField 
                        name='address' 
                        label='Dirección' 
                        preloadData={`${user.address}`}
                        placeholder='Dirección...' 
                        keyboardType='default'
                        handleChange = {this.handleChange}
                        disable={true}
                        />                   
                    <TextField 
                        name='factor' 
                        label='Factor de Conversión' 
                        preloadData={`${user.factor}`}
                        placeholder='Factor de Conversión...' 
                        keyboardType='numeric'
                        handleChange = {this.handleChange}
                        disable={true}
                        />
                    <Text style={styles.section__title}>Levantar usuario no encontrado</Text>
                    <SelectField
                        name='type'
                        label='Tipo'
                        preloadData={this.state.props.type}
                        handleChange={this.handleChange}
                        options={[
                            {label: 'No encontrado', value: 'not_found'},
                            {label: 'Mal Amarre', value: 'bad_link'}
                        ]}
                        error={this.state.errors.type}
                        />
                        {
                            (this.state.props.type === 'bad_link')
                            ? (
                                <View>
                                    <LocationField 
                                        name='location'
                                        label='Ubicación GPS'
                                        value={this.state.props.location}
                                        handleChange={this.handleChange}
                                        error={this.state.errors.location}
                                        />
                                    <PhotoField 
                                        name='photo'
                                        label='Foto del predio'
                                        value={this.state.props.photo}
                                        handleChange={this.handleChange}
                                        error={this.state.errors.photo}
                                        />
                                    <PhotoField 
                                        name='meter_photo'
                                        label='Foto del medidor'
                                        value={this.state.props.meter_photo}
                                        handleChange={this.handleChange}
                                        error={this.state.errors.meter_photo}
                                        />
                                    <TextField 
                                        name='new_transformer'
                                        label='Transformador Real'
                                        preloadData={this.state.props.new_transformer}
                                        handleChange={this.handleChange}
                                        error={this.state.errors.new_transformer}
                                        />
                                    <PhotoField 
                                        name='new_transformer_photo'
                                        label='Foto del transformador real'
                                        value={this.state.props.new_transformer_photo}
                                        handleChange={this.handleChange}
                                        error={this.state.errors.new_transformer_photo}
                                        />
                                </View>
                            ) 
                            : (null)
                        }
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
    clearActualStakeoutUser: () => {
        dispatch(clearActualStakeoutUser())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BadLinkStakeOutScreen)