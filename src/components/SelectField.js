import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Picker
} from 'react-native'
import {
    Icon
} from 'native-base'

class SelectField extends Component {
    constructor(props) {
        super(props)
    }   

    _renderOptions = () => {
        const options = this.props.options

        return options.map((opt, key) => (
            <Picker.Item label={opt.label} value={opt.value} key={key}/>
        ))
    }

    handleChange = (itemValue, itemIndex) => {
        this.setState({
            value: itemValue
        })
        this.props.handleChange(this.props.name, itemValue)
    }

    render () {
        return (
            <View style={[
                styles.main__wrapper,
                this.props.error ? styles.error : null
                ]}>
                <Text style={styles.label}>{this.props.label}</Text>
                <View style={styles.picker__wrapper}>
                    <Picker
                        enabled={!this.props.disable}
                        style={styles.picker}
                        selectedValue={this.props.preloadData ? this.props.preloadData : 'Normal'}
                        value={this.props.preloadData ? this.props.preloadData : ''}
                        onValueChange={(itemValue, itemIndex) => this.handleChange(itemValue, itemIndex)}
                        >
                        {
                            this._renderOptions()
                        }
                    </Picker>
                </View>
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
        color: '#939393',
    },
    picker__wrapper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C3C3C3',
    },
    picker: {
        display: 'flex',
        height: 40,
        paddingHorizontal: 10,
        width: '100%',
        color: 'black'
    },
    error: {
        paddingLeft: 10,
        borderLeftWidth: 5,
        borderLeftColor: 'red'
    }
})

export default SelectField