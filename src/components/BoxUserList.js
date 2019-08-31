import React, { Component } from 'react'
import {
    AppRegistry,
    Text,
} from 'react-native'
import { Card, List, ListItem } from 'native-base'

class BoxUserList extends Component {
    constructor() {
        super()
    }

    render() {
        const data = this.props.data
        let users 
        if(data.length) {
            users = data.map((user, key) => (
                <ListItem key={key}>
                    <Text>{user.usuario}</Text>
                    <Text>{user.medidor}</Text>
                    <Text>{user.homedisplay}</Text>
                </ListItem>
            ))
        } else {
            users = false
        }

        return (
            <List>
                {users}
            </List>
        )
    }
}

export default BoxUserList