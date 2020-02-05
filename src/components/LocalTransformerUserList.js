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
    Spinner
} from 'native-base'

class LocalTransformerUserList extends Component {
    constructor(props) {
        super(props)
    }

    _renderUserItems = () => {
        const users = this.props.transformActivities.actual_transformer_users
        
        return users.map((u, i) => (
            <View key={i} style={styles.userItem__wrapper}>
                <View style={styles.status__wrapper}>
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
                        style={styles.action__button}
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
    }
})

const mapStateToProps = state => ({
    transformActivities: state.transformActivities
})

const mapDispatchToProps = dipatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(LocalTransformerUserList)