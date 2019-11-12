import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from '../config'
import {
    Content,
    Button,
    Icon,
    Text,
    Spinner
} from 'native-base'

class CaptureLocationButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locationLoad: false,
            latitude: 0,
            longitude: 0
        }
    }

    getGeolocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    locationLoad: true,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                this.props.handleLocation(position)
            },
            error => {
                alert(error.message)
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )
    }

    componentDidMount() {
        this.getGeolocation()
    }


    render () {
        return(
            <Content style={styles.mainWrapper}>
                <Button 
                    full 
                    success
                    onPress={() => {
                        this.setState({
                            locationLoad: false,
                            latitude: 0,
                            longitude: 0
                        })
                        this.getGeolocation()
                    }}
                    >
                    {
                        this.state.locationLoad
                        ? (
                            <Icon type='FontAwesome' name='map-marker'/>
                        )
                        : (
                            <Spinner color={Colors.icon}/>
                        )
                    }
                </Button>
                {
                    this.state.locationLoad
                    ? (
                        <Text>{`Latitud: ${this.state.latitude.toFixed(6)} - Longitud: ${this.state.longitude.toFixed(6)}`}</Text>
                    )
                    : (
                        null
                    )
                }
            </Content>
        )
    }
}

const styles = StyleSheet.create({
    mainWrapper: {
        display: 'flex',
        marginVertical: 10
    }
})

export default CaptureLocationButton