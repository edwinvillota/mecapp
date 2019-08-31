import { PermissionsAndroid } from 'react-native'

let Permission = {}

Permission.getCamera = async () => {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
        .then(async value => {
            if (value) {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: 'Solicitud de Permiso',
                            message: 'Pics2Folder necesita acceder a la camara.',
                            buttonPositive: 'OK',
                            buttonNegative: 'NO' 
                        }
                    )
            
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('Permiso Concedido')
                    } else {
                        console.log('Permiso Denegado')
                    }
                } catch (err) {
                    console.warn(err)
                }
            }
        })

}

export default Permission