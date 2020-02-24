import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Modal,
    Image
} from 'react-native'
import {
    Button,
    Icon
} from 'native-base'
import ImagePicker from 'react-native-image-picker'

class PhotoField extends Component {

    constructor (props) {
        super (props)
        this.state = {
            value: '',
            previewVisible: false
        }
    }

    handleOpenCamera = e => {
        e.preventDefault()

        const options = {
            title: 'Capturar Fotografía',
            noData: true,
            maxWidth: 800,
            maxHeight: 600,
            quality: 0.8,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }

        ImagePicker.launchCamera(options, (response) => {
            if (!response.didCancel) {
                this.setState({
                    value: response.uri
                })
                this.props.handleChange(this.props.name, response.uri)
            }
        })


    }

    render () {
        const captured = this.props.value ? true : false
        return (
            <View style={[
                styles.main__wrapper,
                this.props.error ? styles.error : null
                ]}>
                <Text style={styles.label}>{this.props.label}</Text>
                <View style={styles.photo__wrapper}>
                    <Text style={styles.photo__text}>{captured ? this.props.value : 'Sin Capturar'}</Text>
                    <View style={styles.action__wrapper}>
                        {
                            captured 
                            ? (
                                <Button
                                    icon
                                    transparent
                                    style={styles.action__button}
                                    onPress={() => {
                                        this.setState({
                                            previewVisible: true
                                        })
                                    }}
                                    >
                                    <Icon type='AntDesign' name='eyeo' style={[styles.action__icon, styles.action__capture]}/>
                                </Button>
                            ) : (null)
                        }
                        <Button
                            icon
                            transparent
                            style={styles.action__button}
                            onPress={this.handleOpenCamera}
                            >
                            <Icon type='AntDesign' name='camerao' style={[styles.action__icon, styles.action__preview]}/>
                        </Button>
                    </View>
                </View>
                <Modal  
                    animationType='fade'
                    transparent={false}
                    visible={this.state.previewVisible}
                    onRequestClose={() => {
                        this.setState({
                            previewVisible: false
                        })
                    }}
                    >
                        <View style={styles.modal__wrapper}>
                            <View style={styles.image__wrapper}>
                                <Image 
                                    source={{uri: this.state.value}}
                                    style={styles.image}
                                />
                            </View>
                        </View>
                </Modal>
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
    photo__wrapper: {
        display: 'flex',
        flexDirection: 'row',
        height: 40,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C3C3C3'
    },
    photo__text: {
        height: 40,
        lineHeight: 40,
        overflow: 'hidden',
        maxWidth: '75%'
    },
    action__wrapper: {
        display: 'flex',
        flexDirection: 'row',
        height: 40
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
        fontSize: 20,
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 40,
        margin: 0,
        padding: 0
    },
    action__capture: {
        color: '#27B660'
    },
    action__preview: {
        color: '#44C1C1'
    },
    error: {
        paddingLeft: 10,
        borderLeftWidth: 5,
        borderLeftColor: 'red'
    },
    modal__wrapper: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    image__wrapper: {
        display:'flex',
        height: 250,
        width: '100%'
    },
    image: {
        height: '100%'
    }
})

export default PhotoField