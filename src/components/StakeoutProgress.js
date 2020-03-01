import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    Alert
} from 'react-native'
import {
    Text
} from 'native-base'

class StakeoutProgress extends Component {
    constructor (props) {
        super (props)
    }

    render () {
        const p = this.props.transformActivities.actual_stakeout_progress

        return (
            <View style={styles.main__wrapper}>
                <View style={styles.dbUsers__wrapper}>
                    <Text style={styles.prop__title}>Usuarios Levantados</Text>
                    <Text style={styles.prop__value}>{`${p.stakeout_db_users}/${p.total_db_users}`}</Text>
                </View>
                <View style={styles.row__wrapper}>
                    <View style={styles.prop__wrapper}>
                        <Text style={styles.prop__title}>Usuarios Nuevos</Text>
                        <Text style={styles.prop__value}>{`${p.new_users}`}</Text>
                    </View>
                    <View style={styles.prop__wrapper}>
                        <Text style={styles.prop__title}>Errores de vinculo</Text>
                        <Text style={styles.prop__value}>{`${p.bad_links}`}</Text>
                    </View>
                </View>
                <View style={styles.row__wrapper}>
                    <View style={styles.prop__wrapper}>
                        <Text style={styles.prop__title}>Otras Cargas</Text>
                        <Text style={styles.prop__value}>{`${p.ocs}`}</Text>
                    </View>
                    <View style={styles.prop__wrapper}>
                        <Text style={styles.prop__title}>Nodos</Text>
                        <Text style={styles.prop__value}>{`${p.nodes}`}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main__wrapper: {
        display: "flex"
    },
    dbUsers__wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%',
        borderBottomWidth: 3,
        borderColor: '#39A6E3',
        marginBottom: 10
    },
    prop__title: {
        fontSize: 16,
        color: '#3C3C3C'
    },
    prop__value: {
        fontSize: 30
    },
    row__wrapper: {
        display: 'flex',
        flexDirection: 'row',
        height: '30%'
    },
    prop__wrapper: {
        display: 'flex',
        width: '50%',
        height: '100%',
        alignItems: 'center'
    }
})

const mapStateToProps = state => ({
    transformActivities: state.transformActivities
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(StakeoutProgress)