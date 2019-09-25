import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    ScrollView,
    StyleSheet
} from 'react-native'
import { Header, Left, Button, Title, Body, Icon, Text, Tabs, Tab, TabHeading, Spinner, Fab} from 'native-base'
import { Colors } from '../config'
import { getTransformerData, setTransformerRequestStatus } from '../actions'

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

    render () {
        let { transformer_info, users } = this.props.balance.transformer_data 
        let { requestStatus } = this.props.balance
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
                <Fab
                    active={this.state.fabActive}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: Colors.primary }}
                    position="bottomRight"
                    onPress={() => this.setState({ fabActive: !this.state.fabActive })}
                    
                    >
                    <Icon name="plus" type='Entypo'/>
                    <Button 
                        style={{ backgroundColor: '#34A34F' }}
                        onPress={() => this.props.navigation.navigate('StakeOut', {
                            structure: this.props.navigation.getParam('structure')
                        })}
                        >
                        <Icon name="paper"/>
                    </Button>
                    <Button style={{ backgroundColor: '#3B5998' }}>
                        <Icon name="gauge" type='Entypo'/>
                    </Button>
                </Fab>
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
    balance: state.balance
})

const mapDispatchToProps = dispatch => ({
    getTransformerData: (id) => {
        dispatch(getTransformerData(id))
    },
    setTransformerRequestStatus: (newStatus) => {
        dispatch(setTransformerRequestStatus(newStatus))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TransformerViewScreen)