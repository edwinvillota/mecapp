import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllTransformers, getTransformerData, chargueTransformerStakeOut } from '../actions'
import { getAsignedTransformerActivities } from '../actions/transformActivitiesActions'
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
        this.props.getAsignedTransformerActivities()
    }

    render() {
        const asignedActivities = this.props.transformActivities.asigned_transformer_activities
        let items = false
        if (asignedActivities.length) {
            items = asignedActivities.map((a, i) => (
                <ListItem button={true} key={i}>
                    <TouchableOpacity 
                        style={{flex: 1, flexDirection: 'row'}}
                        onPress={() => {
                            this.props.getTransformerData(a.transformer_id)
                            this.props.navigation.navigate('TransformerView', {
                                transformer_id: a.transformer_id,
                                structure: a.transformer_info[0].structure,
                                activity: a
                            })
                        }}
                        >
                    <Left>
                        {
                            (a.type === 'STAKEOUT') ?
                            (<Icon type='Foundation' name='database' style={[styles.typeIcon, styles.typeIconStakeout]}/>) :
                            (<Icon type='Octicons' name='tasklist' style={[styles.typeIcon, styles.typeIconLecture]}/>)
                        }
                        <Text>{a.transformer_info[0].structure}</Text>
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
    },
    typeIcon: {
        marginRight: 10,
        marginLeft: 10
    },
    typeIconStakeout: {
        color: '#2980b9'
    },
    typeIconLecture: {
        color: '#e67e22'
    }
})

const mapStateToProps = state => ({
    balance: state.balance,
    transformActivities: state.transformActivities
})

const mapDispatchToProps = dispatch => ({
    getAllTransformers: () => {
        dispatch(getAllTransformers())
    },
    getTransformerData: (id) => {
        dispatch(getTransformerData(id))
    },
    chargueTransformerStakeOut: (transformer_id) => {
        dispatch(chargueTransformerStakeOut(transformer_id))
    },
    getAsignedTransformerActivities: () => {
        dispatch(getAsignedTransformerActivities())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TransformerViewer)
