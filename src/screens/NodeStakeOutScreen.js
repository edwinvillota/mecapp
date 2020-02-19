import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    ScrollView,
    Modal,
    StyleSheet
} from 'react-native'
import { Colors } from '../config'
import { Header, Left, Button, Icon, Body, Title } from 'native-base'
import LocalTransformerUserList from '../components/LocalTransformerUserList'
import { 
    getLocalTransformerUsers, 
    clearActualTransformerUsers,
    clearActualNodeUsers,
    getNodeUsers,
    clearActualStakeoutUser
} from '../actions/transformActivitiesActions'
import NodeUserList from '../components/NodeUserList'

class NodeStakeOutScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userListModalVisible: false
        }
    }

    static navigationOptions = {
        title: 'Levantar Nodo',
        drawerLabel: () => (null)
    }

    handleCloseSearchModal = () => {
        this.setState({
            userListModalVisible: false
        })
    }

    render () {
        const activity = this.props.navigation.getParam('activity')
        const node = this.props.navigation.getParam('node')

        return (
            <View style={{flex: 1}}>
                <Header
                    androidStatusBarColor='black'
                    style={{backgroundColor: Colors.background}}
                    >
                    <Left>
                        <Button transparent
                            onPress={() => {
                                this.props.clearActualNodeUsers()
                                this.props.navigation.navigate('StakeOut', {
                                    activity: activity
                                })
                            }}
                            >
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>{`Levatar Nodo ${node.number}`}</Title>
                    </Body>
                </Header>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.userListModalVisible}
                    onRequestClose={() => {
                        this.props.clearActualTransformerUsers()
                        this.setState({
                            userListModalVisible: false
                        })
                    }}
                    >
                    <ScrollView
                        style={styles.modal__userList}
                        >

                        <LocalTransformerUserList 
                            navigation={this.props.navigation}
                            node={node}
                            activity={activity}
                            handleCloseSearchModal={this.handleCloseSearchModal}
                            />
                    </ScrollView>
                </Modal>
                <ScrollView>
                    <View style={styles.main__container}>
                        <Text style={styles.section__title}>Usuarios Levantados</Text>
                        <View style={styles.list__wrapper}>
                            <NodeUserList
                                node={node}
                                />
                        </View>
                        <Text style={styles.section__title}>Otras Cargas</Text>
                        <View style={styles.list__wrapper}>

                        </View>
                        <Text style={styles.section__title}>Acciones</Text>
                        <View style={styles.action__wrapper}>
                            <Button 
                                style={[styles.action__button, styles.cedUser__button]}
                                onPress={() => {
                                    this.props.getLocalTransformerUsers(activity.transformer_id, '')
                                    this.setState({
                                        userListModalVisible: true
                                    })
                                }}
                                >
                                <Text style={styles.action__text}>Usuario Cedenar</Text>
                            </Button>
                            <Button 
                                style={[styles.action__button, styles.newUser__button]}
                                onPress={() => {
                                    this.props.clearActualStakeoutUser()
                                    this.props.navigation.navigate('UserStakeOut', {
                                        activity: activity,
                                        node: node,
                                        mode: 'new'
                                    })
                                }}
                                >
                                <Text style={styles.action__text}>Usuario Nuevo</Text>
                            </Button>
                            <Button 
                                style={[styles.action__button, styles.oc__button]}
                                >
                                <Text style={styles.action__text}>Otras Cargas</Text>
                            </Button>
                            <Button 
                                style={[styles.action__button, styles.notFound__button]}
                                >
                                <Text style={styles.action__text}>No Encontrado</Text>
                            </Button>
                        </View>
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
    main__container: {
        display: 'flex',
        padding: 15
    },
    list__wrapper: {
        display: 'flex',
        backgroundColor: '#F6F6F6',
        minHeight: 60,
        marginBottom: 15,
        padding: 10
    },
    action__wrapper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        minHeight: 60,
        marginBottom: 15,
        padding: 10,
        justifyContent: 'space-between'
    },
    action__button: {
        height: 40,
        width: '22%',
        borderRadius: 0
    },
    action__text: {
        textAlign: 'center',
        color: 'white',
    },
    cedUser__button: {
        backgroundColor: '#7AB78B'
    },
    newUser__button: {
        backgroundColor: '#0281A9'
    },
    oc__button: {
        backgroundColor: '#6E7AE8'
    },
    notFound__button: {
        backgroundColor: '#C84646'
    },
    modal__userList: {
        backgroundColor: '#F6F6F6',
        padding: 15,
        height: '100%'
    }

})

const mapStateToProps = state => ({
    transformActivities: state.transformActivities
})

const mapDispatchToProps = dispatch => ({
    getLocalTransformerUsers: (t_id, structure) => {
        dispatch(getLocalTransformerUsers(t_id, structure))
    },
    clearActualTransformerUsers: () => {
        dispatch(clearActualTransformerUsers())
    },
    clearActualNodeUsers: () => {
        dispatch(clearActualNodeUsers())
    },
    getNodeUsers: (node) => {
        dispatch(getNodeUsers(node))
    },
    clearActualStakeoutUser: () => {
        dispatch(clearActualStakeoutUser())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NodeStakeOutScreen)