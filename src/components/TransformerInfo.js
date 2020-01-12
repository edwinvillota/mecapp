import React, { Component } from 'react'
import { 
    StyleSheet,
    View,
    Image
} from 'react-native'
import { Colors } from '../config'
import {
    Content,
    Button,
    Icon,
    Text,
    Spinner
} from 'native-base'


class TransformerInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data_props: [
                {name: 'Capacidad', value:'45KVA'},
                {name: 'Macromedidor', value:'1829556'},
                {name: 'Ratio', value:'250/5'},
                {name: 'Usarios Cedenar', value: '4'},
                {name: 'Usuarios Nuevos', value: '2'}
            ]
        }
    }

    _renderDataProps = () => {
        const { data_props } = this.state

        return data_props.map((prop, i) => (
            <View style={styles.datawrapper__propwrapper} key={i}>
                <Text style={styles.propwrapper__name}>{prop.name}</Text>
                <Text style={styles.propwrapper__value}>{prop.value}</Text>
            </View>
        ))
    }

    render() {
        return (
            <View style={styles.main__wrapper}>
                <Text style={styles.infocard__title}>Información del Transformador</Text>
                <View style={styles.infocard__wrapper}>
                    <Image 
                        style={styles.infocard__photo}
                        source={{uri: 'https://images.pexels.com/photos/157827/pexels-photo-157827.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'}}
                        resizeMode='cover'
                        />
                    <Text style={styles.infocard__structure}>41TA025669</Text>
                    <Text style={styles.infocard__address}>Cra 37A 12 - 84 La Florida</Text>
                    <Text style={styles.infocard__town}>Pasto</Text>
                    <View style={styles.infocard__datawraper}>
                        {this._renderDataProps()}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main__wrapper: {
        display: 'flex'
    },
    infocard__wrapper: {
        display: 'flex',
        height: 350,
        backgroundColor: '#F6F6F6',
        padding: 15
    },
    infocard__title: {
        fontSize: 16,
        marginBottom: 15
    },
    infocard__photo: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignSelf: 'center'
    },
    infocard__structure: {
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    infocard__address: {
        alignSelf: 'center',
        fontSize: 10
    },
    infocard__town: {
        alignSelf: 'center',
        fontSize: 10,
        marginBottom: 10
    },
    infocard__datawraper: {
        display: 'flex',
        flexWrap: 'wrap',
        position: 'relative',
        padding: 15,
        flexGrow: 1,
        height: 110,
        backgroundColor: '#C3C3C3',
        alignContent: 'space-between',
        overflow: 'hidden'
    },
    datawrapper__propwrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '45%',
        justifyContent: 'space-between',
        height: 25
    },
    propwrapper__name: {
        fontSize: 11,
        fontWeight: 'bold'
    },
    propwrapper__value: {
        fontSize: 11
    }
})

export default TransformerInfo