import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from './src/configureStore'
import { PersistGate } from 'redux-persist/integration/react'
import AppNavigator from './src'

let store = configureStore()
const App = () => (
    <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
            <AppNavigator />
        </PersistGate>
    </Provider>
)

export default App

//export default from './storybook'