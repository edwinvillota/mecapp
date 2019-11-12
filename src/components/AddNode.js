import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    Modal,
    Image,
    View
} from 'react-native'
import { Colors } from '../config'
import { Content, Text, Button, Icon, Grid, Col, Row, Accordion, Left} from 'native-base'
import NewNodeModal from '../components/NewNode'
import { node } from 'prop-types'

class AddNode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nodes: [],
            addModalVisible: false,
            newNumber: 0
        }
    }

    handleAddNode = (newNode) => {
        const { nodes } = this.state
        nodes.push(newNode)
    }

    handleRemoveNode = (nodeNumber) => {
        const { nodes } = this.state
        const newNodes = nodes.filter(n => n.number !== nodeNumber)
        this.setState({
            nodes: newNodes
        })
    }

    handlePressButton = () => {
        const {nodes} = this.state
        let newNumber
        if(nodes.length) {
            newNumber = nodes.length
        } else {
            newNumber = 0
        }
        this.setState({
            addModalVisible: true,
            newNumber: newNumber
        })
    }

    nodesToAccordionData = () => {
        const {nodes} = this.state
        if (nodes.length) {
            const accordionNodesData = nodes.map((n, i) => (
                {title: n.number, parentNode: n.parentNode, coords: n.coords, zeroInfo: n.zeroInfo}
            )) 
            return accordionNodesData
        }
    }

    _renderAccordionContent = (node) => {
        return(
            <Content padder
                style={{
                    borderStyle: 'solid',
                    borderColor: Colors.background,
                    borderWidth: 2
                }}
                >
                <Text style={styles.propsTitle}>Nodo Padre</Text>
                <Text>{node.parentNode}</Text>
                <Text style={styles.propsTitle}>Latitud</Text>
                <Text>{node.coords.latitude}</Text>
                <Text style={styles.propsTitle}>Longitud</Text>
                <Text>{node.coords.longitude}</Text>
                {
                    node.title === 0 
                    ? (
                        <Content>
                            <Text style={styles.propsTitle}>Macromedidor</Text>
                            <Text>{node.zeroInfo.haveMacro ? node.zeroInfo.macro : 'NO TIENE'}</Text>
                            <Text style={styles.propsTitle}>Foto Transformador</Text>
                            <Image 
                                source={{uri: node.zeroInfo.transformerPhoto.uri}}
                                style={{
                                    height: 320
                                }}
                                />
                        </Content>
                    )
                    : (
                        null
                    )
                }
            </Content>
        )
    }

    _renderAccordionHeader = (node, expanded) => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5,
                backgroundColor: Colors.background
            }}
            >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start'
                }}>
                <Text
                    style={{
                        color: Colors.text,
                        textAlignVertical: 'center'
                    }}
                    >
                    {`Nodo ${node.title}`}
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end'
            }}>
                <Button icon={true} transparent style={styles.barButton} small
                    onPress={() => {
                        alert('Levantar Nodo')
                    }}
                    >
                    <Icon name='tasks' type='FontAwesome' style={{color: Colors.secondary, fontSize: 20, marginRight: 0, marginLeft: 0}}/>
                </Button>
                <Button icon={true} transparent style={styles.barButton} small
                    onPress={() => {
                        this.handleRemoveNode(node.title)
                    }}
                    >
                    <Icon name='delete' type='AntDesign' style={{color: Colors.delete, fontSize: 20, marginRight: 0, marginLeft: 0}}/>
                </Button>
                {
                    expanded
                    ? <Icon name='up' type='AntDesign' style={{color: Colors.icon, fontSize: 20, margin: 0, alignSelf: 'center'}}/>
                    : <Icon name='down' type='AntDesign' style={{color: Colors.icon, fontSize: 20, margin: 0, alignSelf: 'center'}} />
                }
            </View>

        </View>
    )

    render(){
        return(
           <Content style={styles.mainWrapper}>
               <Grid>
                    <Row>
                        <Button
                            success
                            onPress={this.handlePressButton}
                            >
                            <Icon name='add'/>
                        </Button>
                        <Text style={styles.header}>
                            AGREGAR NODOS
                        </Text>
                    </Row>
                    <Row>
                        <Accordion 
                            dataArray={this.nodesToAccordionData()}
                            renderContent={this._renderAccordionContent}
                            renderHeader={this._renderAccordionHeader}
                            />
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
                        handleAddNode={this.handleAddNode}
                        nodeNumber={this.state.newNumber}
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
    },
    propsTitle: {
        fontWeight: 'bold'
    },
    barButton: {
        alignSelf: 'flex-end',
        paddingTop: 0,
        paddingBottom: 0,
        height: 35,
        width: 35,
        justifyContent: 'center'
    }
})

export default AddNode