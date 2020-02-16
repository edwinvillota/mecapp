import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native'


class TextField extends Component {
    constructor (props) {
        super (props)
    }

    handleChange = (value) => {
        this.setState({
            value: value
        })
        this.props.handleChange(this.props.name, value)
    }
    
    render () {
        const {
            label,
            placeholder,
            preloadData,
            disable
        } = this.props
        return (
            <View style={[
                styles.main__wrapper,
                this.props.error ? styles.error : null
                ]}>
                <Text style={styles.label}>{label}</Text>
                <TextInput 
                    editable={!disable}
                    style={[styles.input]}
                    value={preloadData ? preloadData : ''}
                    placeholder={placeholder}
                    keyboardType={this.props.keyboardType}
                    onChangeText={value => this.handleChange(value)}
                    placeholderTextColor='#939393'
                />
            </View>
        )
    }


}

const styles = StyleSheet.create({
    main__wrapper: {
        display: 'flex',
        height: 60,
        marginBottom: 10
    },
    label: {
        height: 20,
        color: '#939393'
    },
    input: {
        height: 40,
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C3C3C3',
        paddingHorizontal: 10,
        color: 'black'
    },
    input__error: {
        borderColor: 'red'
    },
    error: {
        paddingLeft: 10,
        borderLeftWidth: 5,
        borderLeftColor: 'red'
    }
})

export default TextField