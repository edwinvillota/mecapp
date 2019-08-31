import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllTransformers } from '../actions'
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { Content, View, List, ListItem, Left, Right, Icon } from 'native-base'
import BoxState from './BoxState';

class TransformerViewer extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this.props.getAllTransformers()
    }

    render() {
        const {transformers} = this.props.balance
        let items = false
        if (transformers.length) {
            items = transformers.map((t, i) => (
                <ListItem button={true} key={i}>
                    <Left>
                        <Text>{t.structure}</Text>
                    </Left>
                    <Right>
                        <Icon name='arrow-forward'/>
                    </Right>
                </ListItem>
            ))
        }
        return  (
            <Content>
                <List style={styles.transformerList}>
                    {items}
                </List>
            </Content>
        )
    }
}

const styles = StyleSheet.create({
    transformerList: {
    }
})

const mapStateToProps = state => ({
    balance: state.balance
})

const mapDispatchToProps = dispatch => ({
    getAllTransformers: () => {
        dispatch(getAllTransformers())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TransformerViewer)

AppRegistry.registerComponent('pics2folder', BoxState)  