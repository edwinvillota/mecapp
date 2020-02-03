import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    ScrollView
} from 'react-native'
import { Fab, Button, Icon, Header, Left, Body, Title, Right } from 'native-base'
import TransformersViewer from '../components/TransformersViewer'
import { Colors } from '../config'
import { getAllTransformers } from '../actions'
import { getAsignedTransformerActivities } from '../actions/transformActivitiesActions'

class TransformerScreen extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        title: 'Transformadores',
        drawerLabel: () => (null)
    }

    handleRefreshTransformers = () => {
        this.props.getAsignedTransformerActivities()
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <Header androidStatusBarColor='black' style={{backgroundColor: Colors.background}}>
                    <Left>
                        <Button transparent
                            onPress={ () => {
                                this.props.navigation.navigate('Balances')
                            }}
                            >
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Transformadores</Title>
                    </Body>
                </Header>
                <TransformersViewer navigation={this.props.navigation} />
                <Fab
                    active={true}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={this.handleRefreshTransformers}
                    >
                    <Icon name="sync" />
                </Fab>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    balance: state.balance
})

const mapDispatchToProps = dispatch => ({
    getAllTransformers: () => {
        dispatch(getAllTransformers())
    },
    getAsignedTransformerActivities: () => {
        dispatch(getAsignedTransformerActivities())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TransformerScreen)

