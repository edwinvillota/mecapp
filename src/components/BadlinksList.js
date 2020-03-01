import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    Alert
} from 'react-native'
import {
    Text,
    Button,
    Icon,
    Spinner
} from 'native-base'
import {
    deleteBadlink
} from '../actions/transformActivitiesActions'


class BadlinkList extends Component {
    constructor (props) {
        super (props)
    }

    _renderItems = () => {
        const badlinks = this.props.transformActivities.actual_activity_badlinks

        return badlinks.map((bl, key) => (
            <BadlinkItem 
                key={key} 
                badlink={bl}
                handleRemove={this.props.deleteBadlink}
                activity={this.props.navigation.getParam('activity')}
                />
        ))
    }

    render () {
        return (
            <View style={styles.main__wrapper}>
                {
                    this._renderItems()
                }
            </View>
        )
    }
}

class BadlinkItem extends Component {
    constructor (props) {
        super (props)
    }

    handleDelete = bl => {
        Alert.alert(
            'Confirmación',
            '¿Esta seguro de eliminar el error de vinculo?',
            [
                {text: 'SI', onPress: () => {
                    this.props.handleRemove(bl, this.props.activity)
                }},
                {text: 'NO', onPress: () => {
                    console.log('Cancelado')
                }}
            ]
        )
    }

    render () {
        const bl = this.props.badlink
        return (
            <View style={ItemStyles.main__wrapper}>
                <View style={[
                    ItemStyles.icon__wrapper,
                    (bl.type === 'not_found' ? {backgroundColor: '#C75959'} : {backgroundColor: '#FFD335'})
                    ]}>
                    {
                        (bl.type === 'not_found') 
                        ? (<Icon type='Feather' name='eye-off' style={[ItemStyles.icon, {color: 'white'}]}/>)
                        : (<Icon type='AntDesign' name='exception1' style={[ItemStyles.icon]}/>)
                    }
                </View>
                <View style={ItemStyles.info__wrapper}>
                    <Text style={ItemStyles.info__text}>{`Medidor: ${bl.meter}`}</Text>
                </View>
                <View style={ItemStyles.actions__wrapper}>
                    <Button
                        style={[ItemStyles.action__button, ItemStyles.action__delete]}
                        icon
                        onPress={() => {
                            this.handleDelete(bl)
                        }}
                        >
                        <Icon style={ItemStyles.action__icon} type='AntDesign' name='delete'/>
                    </Button>
                </View>
            </View>
        )
    }
}

const ItemStyles = StyleSheet.create({
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
    icon__wrapper: {
        display: 'flex',
        width: 40,
        backgroundColor: 'transparent',
        padding: 3,
        justifyContent: "center",
        alignItems: 'center'
    },
    icon: {
        textAlign: 'center',
        lineHeight: 40,
        margin: 0,
        padding: 0,
        fontSize: 18,
        width: 40,
        height: 40
    },
    info__wrapper: {
        display: 'flex',
        paddingHorizontal: 5,
        paddingVertical: 3,
        justifyContent: "center",
        alignItems: 'flex-start',
    },
    info__text: {
        fontSize: 14,
        color: '#565656',
        width: '100%',
        textAlign: 'left',
    },
    actions__wrapper: {
        display: "flex",
        flexDirection: 'row',
        width: 40
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
    deleteBadlink: (bl, activity) => {
        dispatch(deleteBadlink(bl, activity))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BadlinkList)