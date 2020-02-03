import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    ScrollView,
    StyleSheet,
    Alert
} from 'react-native'
import { Header, Left, Button, Title, Body, Icon, Text, Tabs, Tab, TabHeading, Spinner, ActionSheet} from 'native-base'
import { Colors } from '../config'
import { getTransformerData, setTransformerRequestStatus, 
} from '../actions'
import {
    downloadTransformerToLocal,
    cleanLocalTransformerData,
    getLocalTransformerUsers,
    getLocalTransfomerDataStatus,
    clearActualActivity,
    clearActualNodes
} from '../actions/transformActivitiesActions'
import TransformerInfo from '../components/TransformerInfo'


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


    handleDownloadInfo = () => {
        const t_data  = this.props.balance.transformer_data[0]
        this.props.downloadTransformerToLocal(t_data)
    }

    handleCleanLocalInfo = () => {
        Alert.alert(
            'Esta Seguro?',
            'Se borraran permanentemente los datos del transformador',
            [
                {text: 'OK', onPress: () => {
                    const t_info = this.props.balance.transformer_data[0]
                    this.props.cleanLocalTransformerData(t_info._id, t_info.structure)
                }},
                {text: 'Cancelar', onPress: () => {
                    return
                }}
            ],
            {cancelable: true}
        )
    }

    handleGetTransformerUsers = () => {
        const t_info = this.props.balance.transformer_data.transformer_info
        this.props.getLocalTransformerUsers(t_info._id, t_info.structure)  
    }

    _renderDataStatus = () => {
        const { local_transformer_data_status } = this.props.transformActivities
        switch (local_transformer_data_status) {
            case 'QUERYING':
                return (
                    <Text style={styles.status__value, styles.status__value__querying}>
                        CONSULTANDO
                    </Text>
                )
            case 'DOWNLOADED':
                return (
                    <Text style={styles.status__value, styles.status__value__success}>
                        LISTO
                    </Text>
                )
            case 'ERROR':
                return (
                    <Text style={styles.status__value, styles.status__value__error}>
                        ERROR
                    </Text>
                )
            case 'NOT_FOUND':
                return (
                    <Text style={styles.status__value, styles.status__value__notfound}>
                        SIN DESCARGAR
                    </Text>
                )
            default:
                return null
                break;
        }
    }


    render () {
        const { requestStatus } = this.props.balance
        const { local_transformer_data_status } = this.props.transformActivities
        const activity = this.props.navigation.getParam('activity')
        const activityType = activity.type

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
                                <ScrollView style={{padding: 15}}>
                                    <TransformerInfo tinfo={this.props.balance.transformer_data[0]}/>
                                    <Text style={styles.section__title}>Actividades para ejecutar</Text>
                                    <View style={styles.activities__wrapper}>
                                        <Button
                                            disabled={(local_transformer_data_status === 'DOWNLOADED' || activityType !== 'STAKEOUT') ? false : true}
                                            style={[styles.activities__button, (local_transformer_data_status !== 'DOWNLOADED' || activityType !== 'STAKEOUT') ? styles.activities__button__disable : null]}
                                            onPress={() => {
                                                this.props.clearActualActivity()
                                                this.props.navigation.navigate('StakeOut', {
                                                    activity: activity
                                                })
                                            }}
                                            >
                                            <Text style={styles.activities__button__text}>Levantamiento</Text>
                                        </Button>
                                        <Button
                                            disabled={(local_transformer_data_status === 'DOWNLOADED' || activityType !== 'LECTURE') ? false : true}
                                            style={[styles.activities__button, (local_transformer_data_status !== 'DOWNLOADED' || activityType !== 'LECTURE') ? styles.activities__button__disable : null]}
                                            >
                                            <Text style={styles.activities__button__text}>Toma de Lecturas</Text>
                                        </Button>
                                    </View>
                                    <Text style={styles.section__title}>Gestión de Datos Locales</Text>
                                    <View style={styles.data__wrapper}>
                                        <View style={styles.data__statuswrapper}>
                                            <Text style={styles.status__name}>Estado Actual:</Text>
                                            {this._renderDataStatus()}
                                        </View>
                                        <View style={styles.data__buttonswrapper}>
                                            <Button
                                                icon
                                                disabled={(local_transformer_data_status === 'DOWNLOADED')}
                                                style={[styles.data__button, styles.data__button__download, (local_transformer_data_status === 'DOWNLOADED') ? styles.activities__button__disable : null]}
                                                onPress={this.handleDownloadInfo}
                                                >
                                                <Icon type='AntDesign' name='download'/>
                                                <Text style={styles.databutton__text}>Descargar</Text>
                                            </Button>
                                            <Button
                                                icon
                                                disabled={(local_transformer_data_status === 'NOT_FOUND')}
                                                style={[styles.data__button, styles.data__button__delete, (local_transformer_data_status === 'NOT_FOUND') ? styles.activities__button__disable : null]}
                                                onPress={this.handleCleanLocalInfo}
                                                >
                                                <Icon type='AntDesign' name='delete' />
                                                <Text style={styles.databutton__text}>Eliminar</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </ScrollView>
                            </Tab> 
                            <Tab heading={ <TabHeading style={styles.tabHeading}><Icon type='MaterialIcons' name='home'/></TabHeading> }>
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
    },
    section__title: {
        fontSize: 16,
        marginBottom: 15
    },
    activities__wrapper: {
        display: 'flex',
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#F6F6F6',
        justifyContent: 'space-between'
    },
    activities__button: {
        display: 'flex',
        justifyContent: 'center',
        width: '48%',
        backgroundColor: '#5BA87B'
    },
    activities__button__disable: {
        backgroundColor: '#C3C3C3'
    },
    activities__button__text: {
        fontSize: 11
    },
    data__wrapper: {
        display: 'flex',
        flexDirection: 'column',
        padding: 15,
        backgroundColor: '#F6F6F6',
        height: 130
    },
    data__statuswrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 15
    },
    status__name: {
        fontWeight: 'bold'
    },
    status__value: {
    },
    status__value__success: {
        color: '#17A500'
    },
    status__value__querying: {
        color: '#5796CF'
    },
    status__value__error: {
        color: '#C84646'
    },
    status__value__notfound: {
        color: '#8D7CF4'
    },
    data__buttonswrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    data__button: {
        display: 'flex',
        justifyContent: 'center',
        width: '48%'
    },
    databutton__text: {
        fontSize: 11
    },
    data__button__download: {
        backgroundColor: '#0281A9'
    },
    data__button__delete: {
        backgroundColor: '#C84646'
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
    downloadTransformerToLocal: (t_data) => {
        dispatch(downloadTransformerToLocal(t_data))
    },
    cleanLocalTransformerData: (t_id, t_structure) => {
        dispatch(cleanLocalTransformerData(t_id, t_structure))
    },
    getLocalTransformerUsers: (t_id, t_structure) => {
        dispatch(getLocalTransformerUsers(t_id, t_structure))
    },
    getLocalTransfomerDataStatus: (t_id, t_structure) => {
        dispatch(getLocalTransfomerDataStatus(t_id, t_structure))
    },
    clearActualActivity: () => {
        dispatch(clearActualActivity())
    },
    clearActualNodes: () => {
        dispatch(clearActualNodes())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TransformerViewScreen)