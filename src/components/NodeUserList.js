import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native'
import {Text} from 'native-base'
import { Colors } from '../config'


class NodeUserList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const users = this.props.transformActivities.actualStakeOut.users
        const list = users.map((u, i) => (
        <Text key={i}>{`Nodo: ${u.node} --> ${u.info.brand}-${u.info.meter}`}</Text>
        ))
        return (
            <View style={{flex: 1}}>
                <Text>Listado de usuarios levantados...</Text>
                {list}
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => ({
    transformActivities: state.transformActivities
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(NodeUserList)