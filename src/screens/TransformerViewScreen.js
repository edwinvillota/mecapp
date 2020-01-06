import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    ScrollView,
    StyleSheet
} from 'react-native'
import { Header, Left, Button, Title, Body, Icon, Text, Tabs, Tab, TabHeading, Spinner, ActionSheet} from 'native-base'
import { Colors } from '../config'
import { getTransformerData, setTransformerRequestStatus, 
         getTransformerStakeOuts
} from '../actions'

class TransformerViewScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fabActive: false,
        }
    }

    static navigationOptions = {
        title: 'Transformador',
        drawerLabel: () => (null)
    }

    handleStakeOut = () => {
        this.props.navigation.navigate('StakeOut',{
            transformer_id: this.props.navigation.getParam('transformer_id'),
            structure: this.props.navigation.getParam('structure')
        })
    }

    render () {
        let { transformer_info, users } = this.props.balance.transformer_data 
        let { requestStatus } = this.props.balance
        const BUTTONS = ['Levantamiento', 'Toma de Lecturas', 'Borrar', 'Cancelar']
        return (
            <View style={{flex: 1}}>
                <Header androidStatusBarColor='black' style={{backgroundColor: Colors.background}}>
                    <Left>
                        <Button transparent
                            onPress={ () => {
                                this.props.navigation.navigate('Transformers')
                            }}
                            >
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.navigation.getParam('structure')}</Title>
                    </Body>
                </Header>
                { (requestStatus === 'SUCCESS') ? 
                    (   
                        <Tabs>
                            <Tab heading={ <TabHeading style={styles.tabHeading} ><Icon type='MaterialIcons' name='dashboard'/><Text></Text></TabHeading> }>
                                <ScrollView>
                                    <Text>{`Estructura: ${transformer_info.structure}`}</Text>
                                    <Button full info
                                        onPress={() => {
                                            ActionSheet.show(
                                                {
                                                    options: BUTTONS,
                                                    cancelButtonIndex: 3,
                                                    destructiveButtonIndex: 2,
                                                    title: 'NUEVA ACCIÓN'
                                                },
                                                buttonIndex => {
                                                    switch (buttonIndex) {
                                                        case 0:
                                                            this.handleStakeOut()
                                                            break;
                                                    
                                                        default:
                                                            break;
                                                    }
                                                }
                                            )
                                        }}
                                        >
                                        <Text>Acciones</Text>
                                    </Button>
                                </ScrollView>
                            </Tab>
                            <Tab heading={ <TabHeading style={styles.tabHeading}><Icon type='MaterialIcons' name='home'/></TabHeading> }>
                                <ScrollView>
                                {users.length ? users.map((u, i) => (
                                    <Text key={i}>{u.meter}</Text>
                                )) : null}
                                </ScrollView>
                            </Tab>
                            <Tab heading={ <TabHeading style={styles.tabHeading}><Icon type='MaterialIcons' name='warning'/></TabHeading> }>
                            </Tab>
                            <Tab heading={ <TabHeading style={styles.tabHeading}><Icon type='MaterialIcons' name='business'/></TabHeading> }>
                            </Tab>
                        </Tabs>) :
                    (<Spinner/>)
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabHeading: {
        backgroundColor: Colors.background
    }
})

const mapStateToProps = state => ({
    balance: state.balance,
    transformActivities: state.transformActivities
})

const mapDispatchToProps = dispatch => ({
    getTransformerData: (id) => {
        dispatch(getTransformerData(id))
    },
    setTransformerRequestStatus: (newStatus) => {
        dispatch(setTransformerRequestStatus(newStatus))
    },
    getTransformerStakeOuts: (transformer_id) => {
        dispatch(getTransformerStakeOuts(transformer_id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TransformerViewScreen)