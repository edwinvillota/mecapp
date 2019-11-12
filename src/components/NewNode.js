import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from '../config'
import { 
    Container, Header, Icon, Left, Text, Footer, Content, Button, Body, Title, FooterTab, Input, Item,
    Form, Picker, Label  
} from 'native-base'
import ZeroNodeInfo from '../components/ZeroNodeInfo'
import CaptureLocationButton from '../components/CaptureLocationButton'

class NewNode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            zeroInfo: {
                haveMacro: false,
                macro: '',
                transformerPhoto: false
            },
            parentNode: 0,
            coords: {
                latitude: '', 
                longitude: ''
            }
        }
    }

    handleSave = () => {
        const { 
            zeroInfo,
            parentNode,
            coords
        } = this.state
        this.props.handleAddNode({
            number: this.props.nodeNumber,
            zeroInfo,
            parentNode,
            coords
        })
        this.setState({
            zeroInfo: {
                haveMacro: false,
                macro: '',
                transformerPhoto: false
            },
            parentNode: 0,
            coords: {
                latitude: '', 
                longitude: ''
            }
        }, this.props.onClose())
    }

    createParentValues = () => {
        const length = this.props.nodeNumber
        let values = []
        if (length >= 0) {
            for (let i = 0; i < length; i++) {
                values.push(
                    <Picker.Item key={i} label={`Nodo ${i}`} value={i}/>
                )
            }
            return values
        } else {
            values.push(
                <Picker.Item key={0} label='Nodo 0' value={0}/>
            )
        }
    }

    handleLocation = (location) => {
        this.setState({
            coords: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        })
    }

    handleParentChange = (value) => {
        this.setState({
            parentNode: value
        })
    }

    handleChangeZeroInfo = (newZeroInfo) => {
        const {zeroInfo} = this.state
        switch (newZeroInfo.type) {
            case 'HAVE_MACRO':
                if (newZeroInfo.value) {
                    this.setState({
                        zeroInfo: {
                            ...zeroInfo,
                            haveMacro: newZeroInfo.value
                        }
                    })
                } else {
                    this.setState({
                        zeroInfo: {
                            ...zeroInfo,
                            haveMacro: newZeroInfo.value,
                            macro: '',
                        }
                    })
                }
                break;
            case 'MACRO':
                this.setState({
                    zeroInfo: {
                        ...zeroInfo,
                        macro: newZeroInfo.value
                    }
                })
                break;
            case 'TRANSFORMER_PHOTO':
                this.setState({
                    zeroInfo: {
                        ...zeroInfo,
                        transformerPhoto: newZeroInfo.photo
                    }
                })
                break;
            default:
                break;
        }
    }

    render () {
        return(
            <Container>
                <Header style={styles.header} androidStatusBarColor={Colors.background}>
                    <Left>
                        <Button 
                            style={styles.closeButton}
                            onPress={this.props.onClose}
                            >
                            <Icon name='close'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>
                            Nuevo Nodo
                        </Title>
                    </Body>
                </Header>
                <Content style={styles.mainWrapper}>
                    <Form style={styles.form}>
                        <Item stackedLabel>
                            <Label>Número de Nodo</Label>
                            <Input disabled value={this.props.nodeNumber.toString()}/>

                        </Item>
                        {this.props.nodeNumber === 0
                            ? (
                                <ZeroNodeInfo 
                                    ZeroInfo={this.state.zeroInfo}
                                    handleChangeZeroInfo={this.handleChangeZeroInfo}
                                    />
                            ) 
                            : (
                                <Item picker inlineLabel>
                                    <Label>Nodo Padre</Label>
                                    <Picker
                                        mode='dropdown'
                                        selectedValue={this.state.parentNode}
                                        onValueChange={this.handleParentChange.bind(this)}
                                        >
                                        {this.createParentValues()}
                                    </Picker>
                                </Item>
                            )
                        }
                        <Item stackedLabel style={styles.customButton}>
                            <Label>Georeferencia</Label>
                            <CaptureLocationButton 
                                handleLocation={this.handleLocation}
                                style={styles.customButton} 
                                />
                        </Item>
                    </Form>
                </Content>
                <Footer style={styles.footer}>
                    <FooterTab>
                        <Button 
                            full 
                            style={styles.saveButton}
                            onPress={this.handleSave}
                            >
                            <Icon name='save'/> 
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.background
    },
    closeButton: {
        backgroundColor: Colors.background
    },
    footer: {
        backgroundColor: Colors.background
    },
    saveButton: {
        backgroundColor: Colors.background,
    },
    mainWrapper: {
    },
    form: {
        
    },
    customButton: {
        height: 120
    }
})

export default NewNode