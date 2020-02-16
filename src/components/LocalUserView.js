import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    StyleSheet,
    View,
    Image
} from 'react-native'
import {
    Text
} from 'native-base'
import Validator from '../clases/Validator'

class LocalUserView extends Component {
    constructor () {
        super()
    }

    _renderProps () {
        const user = this.props.user
        const keys = Object.keys(user)

        return keys.map((k, i) => (
            <View key={i} style={styles.prop_wrapper}>
                <Text style={styles.prop__name}>{k}</Text>
                <Text style={styles.prop__value}>{user[k]}</Text>
            </View>
        ))
    }

    _renderLectures () {
        const v = new Validator()
        const lectures = this.props.lectures
        if (lectures.length > 0) {
            return lectures.map((l, i) => {
                
                const haveReactive = v.validateLecture(l.reactive_lecture).isValid

                return (
                    <View style={styles.lecture__wrapper} key={i}>
                        <View style={styles.prop_wrapper}>
                            <Text style={styles.prop__name}>Lectura Activa</Text>
                            <Text style={styles.prop__value}>{l.active_lecture}</Text>
                        </View> 
                        <View style={styles.lecture__photo}>
                            <Image source={{uri: l.active_photo}} style={styles.user__image}/>
                        </View>
                        {
                            haveReactive 
                            ? (
                                <View style={styles.prop_wrapper}>
                                    <Text style={styles.prop__name}>Lectura Reactiva</Text>
                                    <Text style={styles.prop__value}>{l.reactive_lecture}</Text>
                                </View> 
                            ) : 
                            (null)
                        }
                        {
                            haveReactive 
                            ? (
                                <View style={styles.lecture__photo}>
                                    <Image source={{uri: l.reactive_photo}} style={styles.user__image}/>
                                </View>
                            ) : 
                            (null)
                        }
                    </View>
                )
            })
        } else {
            return null
        }
    }

    render ( ) {
        const user_photo = this.props.user.user_photo

        return (
            <View style={styles.main__wrapper}>
                <Text style={styles.section__title}>Foto del Predio</Text>
                <View style={styles.image__wrapper}>
                    {
                        (user_photo !== 'uncaptured')
                        ? (<Image source={{uri: user_photo}} style={styles.user__image}/>)
                        : (<Text>No hay fotografias disponibles</Text>)
                    }
                </View>
                <Text style={styles.section__title}>Información del Usuario</Text>
                <View style={styles.props__wrapper}> 
                    {this._renderProps()}
                </View>
                <Text style={styles.section__title}>Lecturas</Text>
                <View style={styles.lecture__wrapper}>
                    {this._renderLectures()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    section__title: {
        fontSize: 16,
        marginBottom: 15
    },
    main__wrapper: {
        display: 'flex',
        padding: 15
    },
    image__wrapper: {
        display: 'flex',
        height: 200,
        backgroundColor: '#F6F6F6',
        marginVertical: 15
    },
    prop_wrapper: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#F6F6F6',
        padding: 10
    },
    prop__name: {
        fontSize: 14,
        fontWeight: 'bold',
        width: 120,
        color: 'black',
    },
    prop__value: {
        fontSize: 14,
        maxWidth: 200
    },
    user__image: {
        height: '100%'
    },
    lecture__wrapper: {
        display: 'flex',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#F6F6F6',
    },
    lecture__photo: {
        display: 'flex',
        padding: 10,
        height: 200,
        backgroundColor: '#F6F6F6',
        marginVertical: 15
    }

})

export default LocalUserView