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
            haveMacro: false 
        }
    }

    render(){
        return(
            <Content>
                <Text style={styles.header}>Información Transformador</Text>
                <Item stackedLabel>
                    <Label>Tiene Macromedidor</Label>
                    <CheckBox 
                        color={Colors.primary}
                        checked={this.state.haveMacro}
                        onPress={(e) => {
                            this.setState({
                                haveMacro: !this.state.haveMacro
                            })
                        }}
                        />
                </Item>
                {
                    this.state.haveMacro
                    ? (
                        <Content>
                        <Item stackedLabel>
                            <Label>Serie Macromedidor</Label>
                            <Input />
                        </Item>

                        </Content>
                    )
                    : (
                        null
                    )
                }
                <Item stackedLabel>
                    <Label>Foto Transformador</Label>
                    <CapturePhotoButton handlePhoto={() => {
                        console.log('Foto Tomada')
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