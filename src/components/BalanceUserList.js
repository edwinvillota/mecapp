import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native'
import { Colors } from '../config'
import { List, ListItem, Text, Container, Header, Item, Button, Input, Icon, TabHeading } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'

class BalanceUserList extends Component {
    constructor(props)  {
        super(props)
        this.state = {
            serial: '',
            users: this.props.balance.transformer_data.users,
            filterUsers: this.props.balance.transformer_data.users
        }
    }

    handleChangeSerial = (newSerial) => {
        this.setState({
            serial: newSerial
        })
        this.filterUsers(newSerial)
    }

    filterUsers = (serial) => {
        const regExp =  new RegExp("(" + serial + ")",'g')
        const users = this.state.users
        const filterUsers = users.filter(u => regExp.test(u.meter))
        this.setState({
            filterUsers: filterUsers
        })
    }

    

    render () {
        const { filterUsers } = this.state
        const userRows = filterUsers.map((u, i) => (
            <ListItem key={i}>
                <TouchableOpacity style={styles.touchableOpacity} disabled={u.stakeout}
                    onPress={() => {
                        this.props.handleCloseModal()
                        this.props.navigation.navigate('UserStakeOut', {
                            transformer_id: this.props.navigation.getParam('transformer_id'),
                            structure: this.props.navigation.getParam('structure'),
                            node: this.props.node_id,
                            user: u
                        })
                    }}
                    >
                    <Text style={u.stakeout ? styles.upUser : null}>{`${u.brand} - ${u.meter}`}</Text>
                </TouchableOpacity>
            </ListItem>
        ))

        return (
            <Container>
                <Header searchBar rounded
                    style={{backgroundColor: Colors.background}}
                    androidStatusBarColor='black'
                    >
                    <Item>
                        <Icon name='search'/>
                        <Input placeholder='Buscar Medidor' 
                            value={this.state.serial}
                            keyboardType="number-pad"
                            onChangeText={text => {
                                this.handleChangeSerial(text)
                            }}/>
                        <Button icon
                            onPress={this.props.handleCloseModal}>
                            <Icon name='close'/>
                        </Button>
                    </Item>
                </Header>
                <ScrollView>
                    <List>
                        {userRows}
                    </List>
                </ScrollView>
            </Container>
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
    upUser: {
        color: 'green'
    }
})

const mapStateToProps = state => ({
    balance: state.balance
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BalanceUserList)