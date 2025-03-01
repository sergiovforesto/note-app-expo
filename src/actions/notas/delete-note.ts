import * as FileSystem from 'expo-file-system';
import { router } from 'expo-router';
import { DeviceEventEmitter } from 'react-native';


interface Props {
    fileId: string | string[];
    setWishDelete: (value: boolean) => void;
}


export const deleteNote = async({fileId, setWishDelete}:Props) => {

    const fileName = `${FileSystem.documentDirectory}todo/${fileId}`


    try {
        const fileInfo = await FileSystem.getInfoAsync(fileName);
    
        console.log('File Information:', fileInfo);

        if(fileInfo.exists) {
            await FileSystem.deleteAsync(fileName)
            console.log('Nota borrada correctamente');
            
            DeviceEventEmitter.emit('noteDeleted', fileId);
        } else {
            console.log('Archivo no existe');
        }

        setWishDelete(false)

        setTimeout(() => {
            router.push('/(tabs)')
        }, 300)

    } catch (error) {
        console.error('Error al borrar archivo: ', error);
    }
        
}