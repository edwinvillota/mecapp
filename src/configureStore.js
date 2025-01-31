import {createStore, applyMiddleware} from 'redux'
import Reducers from './reducers'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
        'boxstate',
        'transformActivities',
        'balance'
    ],
    blacklist: [
        'authentication',
        'sidebar',
        'api'
    ]
}

const persistedReducer = persistReducer(persistConfig, Reducers)

export default configureStore = () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return {store: store, persistor: persistor}
}

