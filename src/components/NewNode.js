import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Colors } from '../config'
import { 
    Container, Header, Icon, Left, Text, Footer, Content, Button, Body, Title, FooterTab, Input, Item,
    Form,    
    Label
} from 'native-base'
import ZeroNodeInfo from '../components/ZeroNodeInfo'
import CaptureLocationButton from '../components/CaptureLocationButton'

class NewNode extends Component {
    constructor(props) {
        super(props)
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
                <Content>
                    <Form>
                        <Item stackedLabel>
                            <Label>Número de Nodo</Label>
                            <Input disabled value='0'/>

                        </Item>
                        {!0 
                            ? (
                                <ZeroNodeInfo/>
                            ) 
                            : (null)
                        }
                        <Item stackedLabel>
                            <Label>Georeferencia</Label>
                            <CaptureLocationButton />
                        </Item>
                    </Form>
                </Content>
                <Footer style={styles.footer}>
                    <FooterTab>
                        <Button full style={styles.saveButton}>
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
    }
})

export default NewNode