import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    Modal
} from 'react-native'
import {
    Text,
    Button,
    Icon
} from 'native-base'
import NewNodeModal from './NewNode'
import {
    addLocalStakeoutNode
} from '../actions/transformActivitiesActions'

class NodeList extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <View style={styles.main__wrapper}>
                <CreateNode 
                    transformActivities={this.props.transformActivities}
                    addLocalStakeoutNode={this.props.addLocalStakeoutNode}
                    />
            </View>
        )
    }
}

class CreateNode extends Component {
    constructor(props) {
        super(props)
        this.state= {
            newNodeModalOpen: false
        }
    }

    handleAddNode = (node) => {
        const {
            actual_activity,
        } = this.props.transformActivities

        const newNode = {
            number: node.number,
            location: `(${node.coords.latitude},${node.coords.longitude}`,
            parent_node: node.parentNode,
            stakeout_id: actual_activity.id
        }

        this.props.addLocalStakeoutNode(newNode)
    }

    _renderNodes = () => {
        const {
            actual_nodes_loaded,
            actual_nodes
        } = this.props.transformActivities

        if (actual_nodes_loaded && actual_nodes.length > 0) {
            const compNodes = actual_nodes.map((node, i) => (
                <Node key={i} node={node}/>
            ))
            
            return compNodes
        } else {
            return (
                <Text>No hay nodos para mostrar</Text>
            )
        }
    }

    render () {
        const {
            actual_nodes_loaded,
            actual_nodes
        } = this.props.transformActivities

        return (
            <View style={createStyles.main__wrapper}>
                <Modal 
                    animationType='slide'
                    transparent={false}
                    visible={this.state.newNodeModalOpen}
                    onRequestClose={() => {
                        this.setState({
                            newNodeModalOpen: false
                        })
                    }}
                    >
                    <NewNodeModal
                        handleAddNode={this.handleAddNode}
                        nodeNumber={actual_nodes.length}
                        onClose={() => {
                            this.setState({
                                newNodeModalOpen: false
                            })
                        }}
                        />
               </Modal>
               {
                   this._renderNodes()
               }
                <Button
                    iconLeft
                    full
                    style={createStyles.button__add}
                    onPress={() => {
                        this.setState({
                            newNodeModalOpen: true
                        })
                    }}
                    >
                    <Icon type='AntDesign' name='plus' />
                    <Text>Crear Nodo</Text>
                </Button>
            </View>
        )
    }
}

class Node extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        const { node } = this.props
        return (
            <View style={nodeStyles.main__wrapper}> 
                <View style={nodeStyles.number__wrapper}>
                    <Text style={nodeStyles.number__text}>{node.number}</Text>
                </View>
                <Text style={nodeStyles.node__text}>{`Nodo ${node.number}`}</Text>
                <View style={nodeStyles.actions__wrapper}>
                    <Button 
                        style={nodeStyles.action__button}
                        icon
                        onPress={() => {
                            alert('Eliminar')
                        }}
                        >
                        <Icon type='AntDesign' name='delete' style={[nodeStyles.action__icon, nodeStyles.action__delete]}/>
                    </Button>
                    <Button 
                        style={nodeStyles.action__button}
                        icon
                        onPress={() => {
                            alert('Ver')
                        }}
                        >
                        <Icon type='AntDesign' name='eyeo' style={[nodeStyles.action__icon, nodeStyles.action__view]}/>
                    </Button>
                    <Button 
                        style={nodeStyles.action__button}
                        icon
                        onPress={() => {
                            alert('Editar')
                        }}
                        >
                        <Icon type='AntDesign' name='edit' style={[nodeStyles.action__icon, nodeStyles.action__edit]}/>
                    </Button>
                </View>
            </View>
        )
    }
}

const nodeStyles = StyleSheet.create({
    main__wrapper: {
        display: "flex",
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'white',
        marginBottom: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 3
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        justifyContent: 'space-between'
    },
    number__wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6E8B98',
        height: 40,
        width: 40
    },
    number__text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    actions__wrapper: {
        display: 'flex',
        flexDirection: 'row',
        height: 40,
        width: 120
    },
    action__button: {
        display: 'flex',
        padding: 0,
        height: 40,
        width: 40,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    action__icon: {
        textAlign: 'center',
        lineHeight: 40,
        margin: 0,
        padding: 0,
        fontSize: 16,
        width: 40,
        height: 40
    },
    action__delete: {
        backgroundColor: '#C75959'
    },
    action__view: {
        backgroundColor: '#0894A7'
    },
    action__edit: {
        backgroundColor: '#6E7AE8'
    },
    node__text: {
        height: 40,
        fontSize: 14,
        lineHeight: 40
    }
})

const createStyles = StyleSheet.create({
    main__wrapper: {
        display: "flex"
    },
    button__add: {
        height: 40,
        backgroundColor: '#7AB78B'
    }
})

const styles = StyleSheet.create({
    main__wrapper: {
        display: 'flex'
    }
})

const mapStateToProps = state => ({
    transformActivities: state.transformActivities
})

const mapDispatchToProps = dispatch => ({
    addLocalStakeoutNode: (node) => {
        dispatch(addLocalStakeoutNode(node))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NodeList)