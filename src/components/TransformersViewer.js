import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllTransformers, getTransformerData } from '../actions'
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { Content, View, List, ListItem, Left, Right, Icon } from 'native-base'

class TransformerViewer extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getAllTransformers()
    }

    render() {
        const {transformers} = this.props.balance
        let items = false
        if (transformers.length) {
            items = transformers.map((t, i) => (
                <ListItem button={true} key={i}
                    >
                    <TouchableOpacity 
                        style={{flex: 1, flexDirection: 'row'}}
                        onPress={() => {
                            this.props.getTransformerData(t._id)
                            this.props.navigation.navigate('TransformerView', {
                                transformer_id: t._id,
                                structure: t.structure
                            })
                        }}
                        >
                    <Left>
                        <Text>{t.structure}</Text>
                    </Left>
                    <Right>
                        <Icon name='arrow-forward'/>
                    </Right>
                    </TouchableOpacity>
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
    },
    getTransformerData: (id) => {
        dispatch(getTransformerData(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TransformerViewer)
