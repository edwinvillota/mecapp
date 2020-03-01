import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native'
import { Colors } from '../config'
import { Header, Left, Button, Icon, Body, Title, Text, Spinner} from 'native-base'
import { addTransformerStakeOut, addStakeoutNode, delStakeoutNode, updateTransformerStakeOut, chargueTransformerStakeOut} from '../actions'
import { addLocalActivity, loadStakeoutNodes, getBadlinks, getStakeoutProgress} from '../actions/transformActivitiesActions'
import NodeList from '../components/NodeList'
import BadlinkList from '../components/BadlinksList'
import StakeoutProgress from '../components/StakeoutProgress'

class StakeOutScreen extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        title: 'Nuevo Levantamiento',
        drawerLabel: () => (null)
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

    handleAddLocalActivity = () => {
        const activity = this.props.navigation.getParam('activity')

        this.props.addLocalActivity(activity)
        this.props.loadStakeoutNodes(activity)
        this.props.getBadlinks(activity)
        this.props.getStakeoutProgress(activity)
    }

    render () {
        const { 
            actual_activity_loaded,
            actual_nodes_loaded,
            actual_activity_badlinks_loaded,
            actual_stakeout_progress_loaded,
        } = this.props.transformActivities
        return (
            <View style={{flex: 1}}>
                <Header 
                    androidStatusBarColor='black' 
                    style={{backgroundColor: Colors.background}}>
                    <Left>
                        <Button transparent
                            onPress={ () => {
                                const activity = this.props.navigation.getParam('activity')
                                this.props.navigation.navigate('TransformerView', {
                                    transformer_id: activity.transformer_id,
                                    structure: activity.transformer_info[0].structure,
                                    activity: activity
                                })
                            }}
                            >
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Levantamiento</Title>
                    </Body>
                </Header>
                <ScrollView style={{padding: 15}}>
                    <Text style={styles.section__title}>Estado Levantamiento</Text>
                    <View style={styles.chart__wrapper}>
                        {
                            (actual_activity_loaded && actual_stakeout_progress_loaded)
                            ? (<StakeoutProgress />)
                            : (<Spinner color='blue' />)
                        }
                        
                    </View>
                    <Text style={styles.section__title}>Nodos</Text>
                    <View style={styles.nodelist_wrapper}>
                        {
                            (actual_activity_loaded && actual_nodes_loaded) 
                            ? (<NodeList navigation={this.props.navigation}/>)
                            : (<Text>Debe cargar datos...</Text>)
                        }
                        
                    </View>
                    <Text style={styles.section__title}>Errores de Vinculo</Text>
                    <View style={styles.badlinks__wrapper}>
                        {
                            (actual_activity_loaded && actual_activity_badlinks_loaded)
                            ? (<BadlinkList navigation={this.props.navigation}/>)
                            : (<Text>No hay registros para mostrar</Text>)
                        }
                    </View>
                    <Text style={styles.section__title}>Gestion de Datos</Text>
                    <View style={styles.data_wrapper}>
                        <Button style={[styles.databutton, styles.databutton__load, actual_activity_loaded ? styles.button__disable : null]}
                            full
                            onPress={this.handleAddLocalActivity}
                            disabled={actual_activity_loaded}
                            >
                            <Text>Cargar</Text>
                        </Button>
                        <Button style={[styles.databutton, styles.databutton__delete, actual_activity_loaded ? null : styles.button__disable]}
                            full
                            disabled={!actual_activity_loaded}
                            >
                            <Text>Eliminar</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    section__title: {
        fontSize: 16,
        marginBottom: 15
    },
    chart__wrapper: {
        display: 'flex',
        height: 260,
        paddingVertical: 10,
        marginBottom: 15
    },
    nodelist_wrapper: {
        display: 'flex',
        backgroundColor: '#F6F6F6',
        padding: 10,
        marginBottom: 15
    },
    data_wrapper: {
        display: 'flex',
        backgroundColor: '#F6F6F6',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        marginBottom: 30
    },
    databutton: {
        width: '47%',
        height: 40
    },
    databutton__load: {
        backgroundColor: '#0281A9'
    },
    databutton__delete: {
        backgroundColor: '#C84646'
    },
    button__disable: {
        backgroundColor: '#C3C3C3'
    },
    badlinks__wrapper: {
        display: 'flex',
        backgroundColor: '#F6F6F6',
        padding: 10,
        marginBottom: 15
    }
})

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
    },
    updateTransformerStakeOut: (transformer_id) => {
        dispatch(updateTransformerStakeOut(transformer_id))
    },
    chargueTransformerStakeOut: (transformer_id) => {
        dispatch(chargueTransformerStakeOut(transformer_id))
    },
    addLocalActivity: (activity) => {
        dispatch(addLocalActivity(activity))
    },
    loadStakeoutNodes: (activity) => {
        dispatch(loadStakeoutNodes(activity))
    },
    getBadlinks: (activity) => {
        dispatch(getBadlinks(activity))
    },
    getStakeoutProgress: (activity) => {
        dispatch(getStakeoutProgress(activity))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StakeOutScreen)

