import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet
} from 'react-native'
import { Accordion, Text, View, Icon, Grid, Col, Row } from 'native-base'

class UserAccordion extends Component {
    constructor() {
        super()
    }

    _renderHeader(item, expanded) {
        const backgroundColor = !item.lecturas[0].anomalia ? '#CCCCCC' : '#FF5050' 
        return (
            <View style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
                alignItems: "center" ,
                backgroundColor: backgroundColor }}>
                <Text style={{ fontWeight: "600" }}>
                  {item.usuario}
                </Text>
                <Text>
                    {'M: '}{item.medidor}
                </Text>
                <Text>
                    {'HD: '}{item.homedisplay}
                </Text>
                {expanded
                  ? <Icon style={{ fontSize: 18 }} name="remove" />
                  : <Icon style={{ fontSize: 18 }} name="add" />}
              </View>
        )
    }

    _renderContent(item) {
        return (
            <Grid style={{padding: 10}}>
                <Row>
                    <Col>
                        <Text style={styles.title}>TIPO</Text>
                        <Text>{item.tipo}</Text>
                    </Col>
                    <Col>
                        <Text style={styles.title}>ANOMALÍA</Text>
                        <Text>{item.lecturas[0].anomalia}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.title}>LECTURA</Text>
                        <Text>{item.lecturas[0].lectura_activa}</Text>
                    </Col>
                    <Col>
                        <Text style={styles.title}>FECHA LECTURA</Text>
                        <Text>{item.lecturas[0].fecha_lectura}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.title}>NOMBRE</Text>
                        <Text>{item.novainfo[0].nombre}</Text>
                    </Col>
                    <Col>
                        <Text style={styles.title}>DIRECCIÓN</Text>
                        <Text>{item.novainfo[0].direccion}</Text>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Text style={styles.title}>MARCA</Text>
                        <Text>{item.novainfo[0].marca_nova}</Text>
                    </Col>
                    <Col>
                        <Text style={styles.title}>MEDIDOR</Text>
                        <Text>{item.novainfo[0].medidor}</Text>
                    </Col>
                </Row>
            </Grid>
        )
    }

    render() {
        const {dataArray} = this.props
        return (
            <Accordion 
                dataArray={dataArray}
                animation={true}
                expanded={true}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
            />
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '600'
    }
})

export default UserAccordion