import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet
} from 'react-native'
import { Badge, Text, Card } from 'native-base'

class BoxPrevInfo extends Component {
    constructor() {
        super()
    }

    render() {
        const data = this.props.data

        if (data ) {
            return (
                <Card style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 5
                    }}>
                    <Badge primary>
                        <Text>{`CC: ${data.concentrador}`}</Text>
                    </Badge>
                    <Badge info>
                        <Text>{`CL: ${data.colector}`}</Text>
                    </Badge>
                    <Badge success>
                        <Text>{`CJ: ${data.caja}`}</Text>
                    </Badge>
                </Card>
            )
        } else {
            return false
        }
    }
}

const styles = StyleSheet.create({
    badgeMargin: {
        margin: '5px'
    }
})

export default BoxPrevInfo