import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    Modal
} from 'react-native'
import { Colors } from '../config'
import { Content, Text, Button, Icon, Grid, Col, Row} from 'native-base'
import NewNodeModal from '../components/NewNode'

class AddNode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nodes: [],
            addModalVisible: false
        }
    }

    render(){
        return(
           <Content style={styles.mainWrapper}>
               <Grid>
                    <Row>
                        <Button
                            success
                            onPress={() => {
                                this.setState({
                                    addModalVisible: true
                                })
                            }}
                            >
                            <Icon name='add'/>
                        </Button>
                        <Text style={styles.header}>
                            AGREGAR NODOS
                        </Text>
                    </Row>
               </Grid>
               <Modal 
                    animationType='slide'
                    transparent={false}
                    visible={this.state.addModalVisible}
                    onRequestClose={() => {
                        this.setState({
                            addModalVisible: false
                        })
                    }}
                    >
                    <NewNodeModal 
                        onClose={() => {
                            this.setState({
                                addModalVisible: false
                            })
                        }}
                        />
               </Modal>
            </Content>
        )
    }
}

const styles = StyleSheet.create({
    mainWrapper: {
        padding: 10
    },
    header: {
        width: '100%',
        backgroundColor: '#333333',
        textAlign: 'left',
        textAlignVertical: 'center',
        color: 'white',
        paddingHorizontal: 10
    }
})

export default AddNode