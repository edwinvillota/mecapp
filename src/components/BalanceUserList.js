import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native'
import { Colors } from '../config'
import { List, ListItem, Text, Item, Button, Icon, Input, Content, Container } from 'native-base'

class BalanceUserList extends Component {
    constructor(props)  {
        super(props)
        this.state = {
            
        }
    }

    render () {
        const { balance } = this.props
        const users = balance.transformer_data.users
        const userRows = users.map((u, i) => (
            <ListItem key={i}>
                <TouchableOpacity style={styles.touchableOpacity}>
                    <Text style={styles.textListItem}>{`${u.brand} - ${u.meter}`}</Text>
                </TouchableOpacity>
            </ListItem>
        ))

        return (
            <Content>
                <List>
                    {userRows}
                </List>
            </Content>
        )
    }
}

const styles = StyleSheet.create({
    searchWrapper: {
        marginVertical: 5,
        marginHorizontal: 10
    },
    touchableOpacity: {
        flex: 1
    },
    textListItem: {
        flex: 1
    }
})

const mapStateToProps = state => ({
    balance: state.balance
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BalanceUserList)