import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Modal,
    Alert
} from 'react-native'
import {
    Button,
    Icon,
    Text,
    Container,
    Content,
    Card,
    CardItem,

} from 'native-base'
import ImagePicker from 'react-native-image-picker'
import { Dimensions } from 'react-native'

const RNFS = require('react-native-fs')


class CapturePhotoButton extends Component {
    constructor() {
        super()
        this.state = {
            uri: false,
            modalVisible: false
        }
    }

    handlePress = e => {
        e.preventDefault()

        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        }


        ImagePicker.launchCamera(options, (response) => {
            if(!response.didCancel){
                this.setState({
                    uri: response.uri
                })
            }
        })

    }

    render(){
        return(
            <Card transparent>
                <CardItem cardBody>
                    {
                        this.state.uri ? (
                            <Image 
                            onPress={() => {
                                this.setState({
                                    modalVisible: true
                                })
                            }}
                            source={{uri: this.state.uri}}
                            style={{
                                marginTop: 10,
                                height: 200,
                                width: null,
                                flex: 1
                            }}
                            />
                        ) : (null)
                    }

                </CardItem>
                <CardItem>
                    <Button iconLeft full bordered
                        style={styles.photoButton}
                        onPress={this.handlePress}
                        >
                        <Icon name='photo-camera' type="MaterialIcons"/>
                        <Text style={styles.buttonText}>Capturar</Text>
                    </Button>
                    <Button iconLeft full bordered success
                        disabled={!this.state.uri}
                        style={styles.photoButton}
                        onPress={() => {
                            this.setState({
                                modalVisible: true
                            })
                        }}
                        >
                        <Icon name='remove-red-eye' type="MaterialIcons"/>
                        <Text style={styles.buttonText}>Vista Previa</Text>
                    </Button>
                </CardItem>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({
                            modalVisible: false
                        })
                    }}
                    >
                        <View>
                            <View>
                                {
                                    this.state.uri ? (
                                        <Image source={{uri: this.state.uri}} 
                                            style={{
                                                height: '100%'
                                            }}
                                        />
                                    ) : (
                                        null
                                    )
                                }

                            </View>
                        </View>

                </Modal>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    photoButton: {
        marginVertical: 10
    },
    buttonText: {
    }
})

export default CapturePhotoButton