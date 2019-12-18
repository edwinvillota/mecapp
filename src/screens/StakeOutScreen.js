import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    ScrollView
} from 'react-native'
import { Colors } from '../config'
import { Header, Left, Button, Icon, Body, Title, H3, Accordion} from 'native-base'
import { BarChart, Grid } from 'react-native-svg-charts'
import AddNode from '../components/AddNode'
import { addTransformerStakeOut, addStakeoutNode, delStakeoutNode} from '../actions'

class StakeOutScreen extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        title: 'Nuevo Levantamiento',
        drawerLabel: () => (null)
    }

    componentDidMount() {
        const id = this.props.navigation.getParam('transformer_id')
        this.props.addTransformerStakeOut(id)
    }


    handleStakeOutNode = (nodeNumber) => {
        this.props.navigation.navigate('NodeStakeOut', {
            node_id: nodeNumber
        })
    }

    handleAddNode = (newNode) => {
        this.props.addStakeoutNode(newNode)
    }

    handleRemoveNode = (node) => {
        this.props.delStakeoutNode(node)
    }

    render () {
        const stakeout = this.props.transformActivities.actualStakeOut
        console.log(this.props.transformActivities)
        return (
            <View style={{flex: 1}}>
                <Header 
                    androidStatusBarColor='black' 
                    style={{backgroundColor: Colors.background}}>
                    <Left>
                        <Button transparent
                            onPress={ () => {
                                this.props.navigation.navigate('Transformers')
                            }}
                            >
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Levantamiento</Title>
                    </Body>
                </Header>
                <ScrollView>
                <BarChart
                    style={{ height: 200}}
                    data={[30,52]}
                    svg={{ fill: 'rgba(248,157,70,.2)', stroke: 'rgba(248,157,70,1)'}}
                    contentInset={{top: 30, bottom: 30}}
                    >
                    <Grid/>
                </BarChart>
                <AddNode 
                    handleStakeOutNode={this.handleStakeOutNode}
                    handleAddNode={this.handleAddNode}
                    handleRemoveNode={this.handleRemoveNode}
                    nodes={this.props.transformActivities.actualStakeOut.nodes || []}
                    />
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    transformActivities: state.transformActivities
})

const mapDispatchToProps = dispatch => ({
    addTransformerStakeOut: (transformer_id) => {
        dispatch(addTransformerStakeOut(transformer_id))
    },
    addStakeoutNode: (newNode) => {
        dispatch(addStakeoutNode(newNode))
    },
    delStakeoutNode: (node) => {
        dispatch(delStakeoutNode(node))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StakeOutScreen)

