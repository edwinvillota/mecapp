import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native'
import { delStakeoutUser } from '../actions'
import { 
    Text,
    List,
    ListItem,
    Right,
    Icon,
    Left,
    Button,
    Body
} from 'native-base'


class NodeUserList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const node = this.props.node
        const users = this.props.transformActivities.actualStakeOut.users.filter(u => u.node === node) || []
        const list = users.map((u, i) => (
        <ListItem key={i} icon>
            <Left>
                <Button style={{backgroundColor: 'coral'}}
                    onPress={() => {this.props.delStakeoutUser(u)}}
                    >
                    <Icon active name='delete' type='AntDesign' />
                </Button>
            </Left>
            <Body>
                <Text>{`${u.info.brand}-${u.info.meter}`}</Text>
            </Body>
        </ListItem>
        ))
        return (
            <View style={{flex: 1}}>
                <List>
                    {list}
                </List>
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
    delStakeoutUser: (user) => {
        dispatch(delStakeoutUser(user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(NodeUserList)