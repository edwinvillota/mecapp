import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from './src/configureStore'
import AppNavigator from './src'

let store = configureStore()

const App = () => (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
)

export default App