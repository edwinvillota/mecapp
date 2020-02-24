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

class NodeOCSList extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    _renderItems = () => {
        const ocs = this.props.transformActivities.actual_node_ocs

        if (ocs.length > 0) {
            return ocs.map((oc, key) => (
                <Text key={key}>
                    {`Tipo: ${oc.type} Potencia: ${oc.power}`}
                </Text>
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

})

export default connect(mapStateToProps, mapDispatchToProps)(NodeOCSList)