import React, { Component, useReducer } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    Modal,
    ScrollView,
    Alert
} from 'react-native'
import {
    Text,
    Button,
    Icon,
    Spinner
} from 'native-base'
import LocalUserView from '../components/LocalUserView'
import {
    getActualUserLectures,
    clearActualUserLectures,
    removeDatabaseLocalUser,
    deleteNewLocalUser
} from '../actions/transformActivitiesActions'

class NodeUserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewUserModal: false,
            viewUser: false
        }
    }

    handleChangeViewUser = (user) => {
        this.setState({
            viewUserModal: true,
            viewUser: user
        })
        this.props.getActualUserLectures(user)
    }

    handleRemoveUser = (user) => {
        Alert.alert(
            'Confirmación',
            '¿Esta seguro de borrar el usuario?',
            [
                {text: 'SI', onPress: () => {
                    if (user.origin === 'Database') {
                        this.props.removeDatabaseLocalUser(user, this.props.node)
                    } else if (user.origin === 'New') {
                        this.props.deleteNewLocalUser(user, this.props.node)
                    }
                }},
                {text: 'NO', onPress: () => {
                    console.log('Cancelado')
                }}
            ]
        )
        
    }

    _renderDatabaseItems = () => {
        const { actual_node_users } = this.props.transformActivities

        const filterUsers = actual_node_users.filter(u => u.origin === 'Database') 

        if (filterUsers.length > 0) {
            return filterUsers.map((u, key) => (
                <UserItem 
                    key={key} 
                    user={u}
                    handleView={this.handleChangeViewUser}
                    handleRemoveUser={this.handleRemoveUser}
                    getActualUserLectures={this.props.getActualUserLectures}
                    />
            ))
        } else {
            return (
                <Text style={{fontSize: 11}}>No se han levantado usuarios de la base de datos</Text>
            )
        }

    }

    _renderNewItems = () => {
        const { actual_node_users } = this.props.transformActivities

        const filterUsers = actual_node_users.filter(u => u.origin === 'New')

        if (filterUsers.length > 0) {
            return filterUsers.map((u, key) => (
                <UserItem 
                    key={key} 
                    user={u}
                    handleView={this.handleChangeViewUser}
                    handleRemoveUser={this.handleRemoveUser}
                    getActualUserLectures={this.props.getActualUserLectures}
                    />
            ))
        } else {
            return (
                <Text style={{fontSize: 11}}>No se han levantado usuarios nuevos</Text>
            )
        }
    }

    render() {
        const { 
            actual_node_users_loaded,
            actual_user_lectures
         } = this.props.transformActivities

        return (
            <View style={styles.main__wrapper}>
                <Modal
                    animationType='fade'
                    transparent={false}
                    visible={this.state.viewUserModal}
                    onRequestClose={() => {
                        this.setState({
                            viewUserModal: false
                        })
                    }}
                    >
                    <ScrollView>
                        <LocalUserView 
                            user={this.state.viewUser}
                            lectures={this.props.transformActivities.actual_user_lectures}
                            />
                    </ScrollView>
                </Modal>
                <Text style={styles.section__title}>Usuarios Cedenar</Text>
                {
                    actual_node_users_loaded 
                    ? (this._renderDatabaseItems())
                    : (<Text style={{fontSize: 11}}>No se han levantado usuarios de la base de datos</Text>) 
                }
                <Text style={[styles.section__title, {marginTop: 10}]}>Usuarios Nuevos</Text>
                {
                    actual_node_users_loaded 
                    ? (this._renderNewItems())
                    : (<Text style={{fontSize: 11}}>No se han levantado usuarios nuevos</Text>) 
                }
            </View>
        )
    }
}

class UserItem extends Component {
    constructor (props) {
        super (props)
    }

    render () {
        const u = this.props.user
        return (
            <View style={userStyles.main__wrapper}>
                <View style={userStyles.meter__wrapper}>
                    <Text style={userStyles.meter__smalltext}>Medidor</Text>
                    <Text style={userStyles.meter__text}>{u.meter}</Text>
                    <Text style={userStyles.meter__smalltext}>{`Marca: ${u.brand}`}</Text>
                </View>
                <View style={userStyles.info__wrapper}>
                    <Text style={userStyles.info__smalltext}>{`Código: ${u.code}`}</Text>
                    <Text style={userStyles.info__text}>{`${u.address}`}</Text>
                    <Text style={userStyles.info__smalltext}>{`Tipo: ${u.type}`}</Text>
                </View>
                <View style={userStyles.actions__wrapper}>
                    <Button
                        style={[userStyles.action__button, userStyles.action__delete]}
                        icon
                        onPress={() => {
                            this.props.handleRemoveUser(u)
                        }}
                        >
                        <Icon style={userStyles.action__icon} type='AntDesign' name='delete'/>
                    </Button>
                    <Button
                        style={[userStyles.action__button, userStyles.action__view]}
                        icon
                        onPress={() => {
                            this.props.handleView(u)
                        }}
                        >
                        <Icon style={userStyles.action__icon} type='AntDesign' name='eyeo'/>
                    </Button>
                </View>
            </View>
        )
    }
}

const userStyles = StyleSheet.create({
    main__wrapper: {
        display: 'flex',
        flexDirection: 'row',
        height: 40,
        maxHeight: 40,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginBottom: 15,
        shadowColor: 'black',
        shadowOffset: {
            height: 3,
            width: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2,
        justifyContent: 'space-between'
    },
    meter__wrapper: {
        display: 'flex',
        width: 100,
        backgroundColor: '#0281A9',
        padding: 3,
        justifyContent: "center",
        alignItems: 'center'
    },
    meter__smalltext: {
        fontSize: 9,
        fontWeight: '100',
        color: 'white',
        width: '100%',
        textAlign: 'center',
        height: '30%',
    },
    meter__text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        width: '100%',
        textAlign: 'center',
        height: '40%',
    },
    info__wrapper: {
        display: 'flex',
        paddingHorizontal: 5,
        paddingVertical: 3,
        justifyContent: "center",
        alignItems: 'flex-start',
    },
    info__smalltext: {
        fontSize: 9,
        fontWeight: '100',
        color: '#A4A4A4',
        width: '100%',
        textAlign: 'left',
        height: '30%',
    },
    info__text: {
        fontSize: 12,
        color: '#565656',
        width: '100%',
        textAlign: 'left',
        height: '40%',
    },
    actions__wrapper: {
        display: "flex",
        flexDirection: 'row',
        width: 80
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
    }
})

const styles = StyleSheet.create({
    main__wrapper: {
        display: 'flex'
    },
    section__title: {
        fontSize: 16,
        marginBottom: 15
    },
})

const mapStateToProps = state => ({
    transformActivities: state.transformActivities
})

const mapDispatchToProps = dispatch => ({
    getActualUserLectures: (user) => {
        dispatch(getActualUserLectures(user))
    },
    clearActualUserLectures: () => {
        dispatch(clearActualUserLectures())
    },
    removeDatabaseLocalUser: (user, node) => {
        dispatch(removeDatabaseLocalUser(user, node))
    },
    deleteNewLocalUser: (user, node) => {
        dispatch(deleteNewLocalUser(user, node))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(NodeUserList)