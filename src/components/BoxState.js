import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    AppRegistry,
    View,
    Text,
    StyleSheet
} from 'react-native'
import { setSearchType, setDeviceNumber, getPrevInfo } from '../actions'
import { Content, Form, Input, Item, Picker, Icon, Button, Spinner, Tabs, Tab, TabHeading } from 'native-base'
import BoxUserList from '../components/BoxUserList'
import UserAccordion from '../components/UserAccordion'
import BoxPrevInfo from '../components/BoxPrevInfo'
import { Colors } from '../config'


class BoxState extends Component {
    constructor() {
        super()
    }

    onSearchDevice = e => {
        e.preventDefault()
        this.props.getPrevInfo()
    }

    render() {
        return (
            <Content>
                <Form>
                    <Item>
                        <Input 
                            placeholder='Número de Dispositivo'
                            value={this.props.deviceNumber}
                            onChangeText={(text) => this.props.setDeviceNumber(text)}
                            />
                    </Item>
                    <Item last>
                        <Picker
                            mode='dialog'
                            selectedValue={this.props.searchType}
                            onValueChange={(val) => this.props.setSearchType(val)}
                            >
                            <Picker.Item label='Colector' value='1'/>
                            <Picker.Item label='Caja' value='2'/>
                            <Picker.Item label='Usuario' value='3'/>
                            <Picker.Item label='Medidor' value='4'/>
                            <Picker.Item label='Homedisplay' value='5'/>
                        </Picker>
                    </Item>
                </Form>
                <Button
                    block
                    iconLeft
                    success={this.props.existsDevice}
                    onPress={this.onSearchDevice}
                    >
                    {this.props.isRequesting ? (
                        <Spinner color='white'/>
                    ) : (
                        <Text style={{color: 'white'}}>BUSCAR</Text>
                    )}
                </Button>
                <BoxPrevInfo data={this.props.prevInfo ? this.props.prevInfo : false}/>
                {
                    this.props.boxInfo ? (
                        <Tabs>
                            <Tab 
                                heading={<TabHeading style={styles.tab}><Text style={{color: 'white'}}>USUARIOS</Text></TabHeading>}
                                >
                                {/* <BoxUserList data={this.props.boxInfo ? this.props.boxInfo :  []}/> */}
                                <UserAccordion dataArray={this.props.boxInfo}/>
                            </Tab>
                            <Tab heading={<TabHeading style={styles.tab}><Text style={{color: 'white'}}>ACTIVIDADES</Text></TabHeading>}>
                                <Text>Actividades para realizar</Text>
                            </Tab>
                        </Tabs>
                    ) : (
                        false
                    )
                }


            </Content>
        )
    }
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: Colors.background,
        
    }
})


const mapStateToProps = state => ({
    searchType: state.boxstate.searchType,
    deviceNumber: state.boxstate.deviceNumber,
    isRequesting: state.boxstate.isRequesting,
    existsDevice: state.boxstate.existsDevice,
    error: state.boxstate.error,
    prevInfo: state.boxstate.prevInfo,
    boxInfo: state.boxstate.boxInfo
})

const mapDispatchToProps = dispatch => ({
    setSearchType: (searchType) => {
        dispatch(setSearchType(searchType))
    },
    setDeviceNumber: (deviceNumber) => {
        dispatch(setDeviceNumber(deviceNumber))
    },
    getPrevInfo: () => {
        dispatch(getPrevInfo())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BoxState)

AppRegistry.registerComponent('pics2folder', BoxState)