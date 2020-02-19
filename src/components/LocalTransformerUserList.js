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
    Icon,
    Spinner,
    Form,
    Label,
    Input
} from 'native-base'
import {
    setActualStakeoutUser
} from '../actions/transformActivitiesActions'

class LocalTransformerUserList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchMeter: '',
            filterUsers: []
        }
    }

    handleChangeSearch = (value) => {
        const users = this.props.transformActivities.actual_transformer_users
        this.setState({
            searchMeter: value
        })
        if (value.trim().length > 0) {
            const regExp = new RegExp("(" + value + ")",'g')
            const filterUsers = users.filter(u => regExp.test(u.meter))
            this.setState({
                filterUsers: filterUsers
            })
        } else {
            this.setState({
                filterUsers: users
            })
        }
    }

    _renderUserItems = () => {
        const { searchMeter, filterUsers } = this.state 
        let users

        if (searchMeter.trim().length > 0) {
            users = filterUsers
        } else {
            users = this.props.transformActivities.actual_transformer_users
            users = users.filter(u => u.origin === 'Database')
        }

        return users.map((u, i) => (
            <View key={i} style={[
                styles.userItem__wrapper,
                (u.node_id !== 99) ? styles.disable__item : null
                ]}>
                <View style={[
                    styles.status__wrapper,
                    (u.node_id !== 99) ? styles.status__captured : null
                    ]}>
                    {
                        (u.node_id === 99)
                        ? (<Icon type='AntDesign' name='search1' style={[styles.status__icon]}/>)
                        : (<Icon type='AntDesign' name='check' style={[styles.status__icon]}/>)
                    }
                </View>
                <Text style={styles.meter__text}>{`${u.brand} - ${u.meter}`}</Text>
                <View style={styles.actions__wrapper}>
                    <Button
                        icon
                        disabled={(u.node_id !== 99)}
                        style={[
                            styles.action__button,
                            (u.node_id !== 99) ? styles.action__disable : null
                        ]}
                        onPress={() => {
                            this.props.handleCloseSearchModal()
                            this.props.setActualStakeoutUser(u)
                            this.props.navigation.navigate('UserStakeOut', {
                                activity: this.props.activity,
                                node: this.props.node,
                                mode: 'stakeout'
                            })
                        }}
                        >
                        <Icon type='AntDesign' name='arrowright' style={styles.action__icon}/> 
                    </Button>
                </View>
            </View>
        ))
    }

    render() {
        const { actual_transformer_users_loaded } = this.props.transformActivities
        return (
            <View style={styles.main__wrapper}>
                <View style={styles.search__wrapper}>
                    <Form style={styles.search__form}>
                        <Label style={styles.search__label}>Busqueda</Label>
                        <Input 
                            style={styles.search__input}
                            keyboardType='number-pad'
                            value={this.state.searchMeter}
                            placeholder='Buscar Medidor ...'
                            onChangeText={value => {
                                this.handleChangeSearch(value)
                            }}
                        />
                    </Form>
                </View>
                {
                    actual_transformer_users_loaded 
                    ? this._renderUserItems()
                    : (<Spinner color='red' />)
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main__wrapper: {
        display: 'flex'
    },
    userItem__wrapper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 40,
        marginBottom: 15,
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
    status__wrapper: {
        display: 'flex',
        height: 40,
        width: 40,
        backgroundColor: '#6E8B98',
        justifyContent: 'center',
        alignItems: 'center'
    },
    status__icon: {
        color: 'white',
        fontSize: 16
    },
    actions__wrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    action__button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        height: 40,
        width: 40,
        padding: 0
    },
    action__icon: {
        fontSize: 16,
        width: 40,
        height: 40,
        textAlign: 'center',
        lineHeight: 40,
        margin: 0,
        padding: 0
    },
    meter__text: {
        height: 40,
        fontSize: 14,
        lineHeight: 40,
        marginLeft: 10
    },
    search__wrapper: {
        display: 'flex'
    },
    search__form: {
        display: 'flex',
        width: '100%',
        margin: 0,
        padding: 0,
        height: 80,
        marginBottom: 15,
        shadowColor: 'black',
        shadowOffset: {
            width: 4,
            height: 3
        },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 2
    },
    search__input: {
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#C3C3C3',
        height: 40,
        paddingHorizontal: 10
    },  
    search__label: {
        backgroundColor: '#7AB78B',
        color: 'white',
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        padding: 10,
        height: 40
    },
    disable__item: {
        backgroundColor: '#bdc3c7'
    },
    status__captured: {
        backgroundColor: '#7AB78B'
    },
    action__disable: {
        backgroundColor: '#7f8c8d'
    }

})

const mapStateToProps = state => ({
    transformActivities: state.transformActivities
})

const mapDispatchToProps = dispatch => ({
    setActualStakeoutUser: (stakeout_user) => {
        dispatch(setActualStakeoutUser(stakeout_user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalTransformerUserList)