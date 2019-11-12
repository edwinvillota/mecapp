import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from '../config'
import {
    Content,
    Text,
    Item,
    Input,
    Label,
    CheckBox
} from 'native-base'
import CapturePhotoButton from './CapturePhotoButton'


class ZeroNodeInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            isNodeZero: false,
            haveMacro: false,
            macro: '',
            transformerPhoto: false
        }
    }

    handleUpdateInfo = (newZeroInfo) => {
        this.props.handleChangeZeroInfo(newZeroInfo)
    }

    render(){
        const {
            haveMacro,
            macro,
            transformerPhoto
        } = this.props.ZeroInfo
        return(
            <Content>
                <Text style={styles.header}>Información Transformador</Text>
                <Item stackedLabel>
                    <Label>Tiene Macromedidor</Label>
                    <CheckBox 
                        color={Colors.primary}
                        checked={haveMacro}
                        onPress={(e) => {
                            this.handleUpdateInfo({
                                type: 'HAVE_MACRO',
                                value: !haveMacro
                            })
                        }}
                        />
                </Item>
                {
                    haveMacro
                    ? (
                        <Content>
                        <Item stackedLabel>
                            <Label>Serie Macromedidor</Label>
                            <Input 
                                value={macro}
                                onChangeText={(value) => {
                                    this.handleUpdateInfo({
                                        type: 'MACRO',
                                        value: value
                                    })
                                }}
                                />
                        </Item>

                        </Content>
                    )
                    : (
                        null
                    )
                }
                <Item stackedLabel>
                    <Label>Foto Transformador</Label>
                    <CapturePhotoButton handlePhoto={(newPhoto) => {
                        this.handleUpdateInfo({
                            type: 'TRANSFORMER_PHOTO',
                            photo: newPhoto
                        })
                    }}/>
                </Item>

            </Content>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.background,
        textAlign: "center",
        textAlignVertical: 'center',
        color: 'white',
        height: 50
    }
})

export default ZeroNodeInfo