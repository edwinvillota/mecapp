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
import { removeOtherChargue } from '../actions/transformActivitiesActions'

class NodeOCSList extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleRemoveOC = (oc) => {
        Alert.alert(
            'Confirmación',
            '¿Esta seguro de borrar la carga?',
            [
                {text:'SI', onPress: () => {
                    const { node } = this.props
                    this.props.removeOtherChargue(oc, node)
                }},
                {text: 'NO', onPress: () => {
                    console.log('Cancelado')
                }}
            ]
        )
    }

    _renderItems = () => {
        const ocs = this.props.transformActivities.actual_node_ocs

        if (ocs.length > 0) {
            return ocs.map((oc, key) => (
                <OCItem 
                    key={key} 
                    oc={oc}
                    handleRemoveOC={this.handleRemoveOC}
                    />
            ))
        } else {
            return null
        }
    }

    render() {
        return (
            <View style={styles.main__wrapper}>
                {
                    this._renderItems()
                }
            </View>
        )
    }
}

class OCItem extends Component {
    constructor (props) {
        super(props)

    }

    render () {
        const oc = this.props.oc
        return (
            <View style={OCStyles.main__wrapper}>
                <View style={OCStyles.icon__wrapper}>
                    <Icon type='Entypo' name='light-bulb' style={OCStyles.icon}/>
                </View>
                <View style={OCStyles.info__wrapper}>
                    <Text style={OCStyles.info__text}>{`Tipo: ${oc.type} - Potencia: ${oc.power}`}</Text>
                </View>
                <View style={OCStyles.actions__wrapper}>
                    <Button
                        style={[OCStyles.action__button, OCStyles.action__delete]}
                        icon
                        onPress={() => {
                            this.props.handleRemoveOC(oc)
                        }}
                        >
                        <Icon style={OCStyles.action__icon} type='AntDesign' name='delete'/>
                    </Button>
                </View>
            </View>
        )
    }

}

const OCStyles = StyleSheet.create({
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
        alignItems: 'center',
        backgroundColor: '#FFD335'
    },
    icon: {
        textAlign: 'center',
        lineHeight: 40,
        margin: 0,
        padding: 0,
        fontSize: 18,
        width: 40,
        height: 40,
        color: '#525252'
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
    removeOtherChargue: (oc, node) => {
        dispatch(removeOtherChargue(oc, node))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NodeOCSList)