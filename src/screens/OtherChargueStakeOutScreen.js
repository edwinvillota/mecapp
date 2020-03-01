import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Alert
} from 'react-native'
import {
    Button
} from 'native-base'
import TextField from '../components/TextField'
import SelectField from '../components/SelectField'
import LocationField from '../components/LocationField'
import PhotoField from '../components/PhotoField'
import Validator from '../clases/Validator'
import {
    stakeoutOtherChargue,
    getNodeOCS
} from '../actions/transformActivitiesActions'

class OtherChargueStakeOutScreen extends Component {    
    constructor (props) {
        super(props)

        this.state = {
            props: {
                type: '',
                comment: '',
                location: '',
                oc_photo: '',
                power: ''
            },
            errors: {
                type: false,
                comment: false,
                location: false,
                oc_photo: false,
                power: false
            }
        }
    }
    
    static navigationOptions = {
        title: 'Levantar Otras Cargas',
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
        const {
            type,
            comment,
            location,
            oc_photo,
            power
        } = this.state.props

        const v = new Validator()

        const validType = v.validateNoEmpty(type, 'Tipo')
        const validLocation = v.validateLocation(location)
        const validOcPhoto= v.validatePhoto(oc_photo)
        const validPower = v.validateNoEmpty(power, 'Potencia')

        this.setState({
            errors: {
                type: !validType.isValid,
                comment: false,
                location: !validLocation.isValid,
                oc_photo: !validOcPhoto.isValid,
                power: !validPower.isValid
            }
        })

        const errValues = [
            !validType.isValid,
            !validLocation.isValid,
            !validOcPhoto.isValid,
            !validPower.isValid
        ]

        const isValidInfo = errValues.includes(true)

        if (!isValidInfo) {
            const node = this.props.navigation.getParam('node')
            const newOc = {
                type: type,
                location: location,
                oc_photo: oc_photo,
                power: power,
                comment: comment,
                node: node,
                activity: this.props.navigation.getParam('activity')
            }

            this.handleSave(newOc)
        }
    }

    handleSave = (newOc) => {
        this.props.stakeoutOtherChargue(newOc)
        Alert.alert(
            'Exito',
            'Se guardo correctamente la otra carga',
            [
                {text: 'OK', onPress: () => this.handleCancel()}
            ]
        )
        this.props.getNodeOCS(newOc.node)
    }

    handleCancel = () => {
        this.setState({
            props: {
                type: '',
                comment: '',
                location: '',
                oc_photo: ''
            }
        })
        this.props.navigation.navigate('NodeStakeOut', {
            node: this.props.navigation.getParam('node'),
            activity: this.props.navigation.getParam('activity')
        })
    }

    render () {
        return (
            <ScrollView>
                <View style={styles.main__wrapper}>
                    <Text style={styles.section__title}>Levantar Otra Carga</Text>
                    <SelectField 
                        name='type'
                        label='Tipo'
                        preloadData={this.state.props.type}
                        handleChange={this.handleChange}
                        options={[
                            {label: 'Lampara', value: 'lamp'},
                            {label: 'Reflector', value: 'reflector'},
                            {label: 'CATV', value: 'catv'},
                            {label: 'Otra', value: 'other'},
                        ]}
                        error={this.state.errors.type}
                        />
                    <LocationField 
                        name='location'
                        label='Ubicación GPS'
                        value={this.state.props.location}
                        handleChange={this.handleChange}
                        error={this.state.errors.location}
                        />
                    <PhotoField
                        name='oc_photo'
                        label='Fotografía'
                        value={this.state.props.oc_photo}
                        handleChange={this.handleChange}
                        error={this.state.errors.oc_photo}
                        />
                    <TextField 
                        name='power'
                        label='Potencia W'
                        preloadData={this.state.props.power}
                        placeholder='Potencia ...'
                        keyboardType='numeric'
                        handleChange={this.handleChange}
                        error={this.state.errors.power}
                    />
                    <TextField 
                        name='comment' 
                        label='Observación'
                        preloadData={this.state.props.comment}
                        placeholder='Observación ...' 
                        keyboardType='default'
                        handleChange = {this.handleChange}
                        error={this.state.errors.comment}
                        />
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
    stakeoutOtherChargue: (oc) => {
        dispatch(stakeoutOtherChargue(oc))
    },
    getNodeOCS: (node) => {
        dispatch(getNodeOCS(node))
    } 
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherChargueStakeOutScreen)