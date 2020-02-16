import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import {
    Button,
    Icon
} from 'native-base'

class LocationField extends Component {
    constructor (props) {
        super (props)
    }

    getGeolocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    value: `${position.coords.latitude},${position.coords.longitude}`
                })
                this.props.handleChange(this.props.name, `${position.coords.latitude},${position.coords.longitude}`)
            },
            error => {
                alert(error.message)
            },
            {
                enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
            }
        )
    }

    render () {
        const captured = this.props.value ? true : false
        return (
            <View style={[
                styles.main__wrapper,
                this.props.error ? styles.error : null
                ]}>
                <Text style={[styles.label]}>{this.props.label}</Text>
                <View style={[styles.location__wrapper, captured ? styles.load__location : null]}>
                    <Text style={styles.location__text}>
                        {captured ? this.props.value : 'Sin capturar'}
                    </Text>
                    <Button
                        icon
                        transparent
                        style={styles.action__button}
                        onPress={this.getGeolocation}
                        >
                        <Icon type='AntDesign' name='sync' style={styles.action__icon}/>
                    </Button>   
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main__wrapper: {
        display: 'flex',
        height: 60,
        marginBottom: 10
    },
    label: {
        height: 20,
        color: '#939393'
    },
    location__wrapper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C3C3C3',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    location__text: {
        height: 40,
        lineHeight: 40,
        color: 'black'
    },
    action__button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        height: 40,
        width: 40,
        padding: 0
    },
    action__icon: {
        fontSize: 16,
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 40,
        margin: 0,
        padding: 0,
        color: '#27B660'
    },
    load__location: {
        borderColor: '#27B660'
    },
    error: {
        paddingLeft: 10,
        borderLeftWidth: 5,
        borderLeftColor: 'red'
    }
})

export default LocationField