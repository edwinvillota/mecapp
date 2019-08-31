import { Platform } from 'react-native'
const RNFS = require('react-native-fs')

export const Colors = {
    background: '#202E39',
    secondary: '#13C7AC',
    primary: '#FF6A52',
    inactive: '#959FA7',
    text: '#FFFFFF',
    icon: 'white'
}

export const dirHome = Platform.select({
    ios: `${RNFS.DocumentDirectoryPath}/TestFolder`,
    android: `${RNFS.ExternalStorageDirectoryPath}/TestFolder`
})