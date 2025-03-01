import { Text, View, Modal, StyleSheet, Pressable, useWindowDimensions, TextInput} from 'react-native';
import { PRIMARY, WHITE } from '../config/global-themes';
import { createTarea } from '../actions/tareas/create-task';
import { TareaInterface } from '../interfaces/tarea-interface';
import { updateTarea } from '../actions/tareas/update-task';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    transparent?: boolean;
    tarea: TareaInterface;
    showInput: boolean;
    updateButton?: boolean;
    setShowUpdateButton: (value: boolean) => void;
    deleteButton?: boolean;
    setShowDeleteButton: (value: boolean) => void;
    setTarea: (value:  TareaInterface) => void;
    getTareas: () => Promise<void>
    setOpenInput: (value: boolean) => void;
    setOpenAlert: () => void;

}

export const InputTarea = ({
    showInput = true, 
    transparent = false,
    tarea,
    updateButton = false,
    setShowUpdateButton,
    deleteButton = false,
    setShowDeleteButton,
    setTarea,
    setOpenInput,
    setOpenAlert,
    getTareas,
}:Props) => {

    const { width } = useWindowDimensions();

    return (
        <Modal
            animationType="fade"
            transparent={transparent}
            visible={showInput}
        >
            <Pressable 
                style={style.backdrop}
                onPress={() => setOpenInput(!showInput)}
            >
                <View style={[style.modalContainer, { width: width * 0.9 }]}>
                    <View>
                        <TextInput 
                            placeholder='Descripción de tu tarea...'
                            onChangeText={(value) => setTarea({ ...tarea, texto: value })}
                            value={tarea.texto}
                            style={style.tareaInput}
                            placeholderTextColor="#aaaaaa"
                            selectionColor={PRIMARY}
                            multiline
                            
                        />

                        {
                            !updateButton && (
                                <Pressable
                                    style={({pressed}) => [
                                        style.buttonReady,
                                        {
                                            opacity: pressed ? 0.3 : 1
                                        }
                                    ]}
                                    disabled={tarea.texto === '' ? true : false}
                                    onPress={async() => [
                                        await createTarea({tarea, setTarea}),
                                        await getTareas(),
                                        setOpenInput(!showInput),
                                    ]}
                                >
                                    <Text style={style.buttonReadyText}>
                                        Listo
                                    </Text>
                                </Pressable>
                            )   
                        }


                        {
                            updateButton && (
                                <View style={{flexDirection: 'row-reverse', justifyContent: 'space-between'}}>
                                    <Pressable
                                        style={({pressed}) => [
                                            style.buttonReady,
                                            {
                                                opacity: pressed ? 0.3 : 1
                                            }
                                        ]}
                                        disabled={tarea.texto === '' ? true : false}
                                        onPress={async() => [
                                            await updateTarea({id: tarea.id, tarea, setTarea, setShowUpdateButton}),
                                            await getTareas(),
                                            setOpenInput(!showInput),
                                        ]}
                                    >
                                        <Text style={style.buttonReadyText}>
                                            Actualizar
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        style={({pressed}) => [
                                            style.buttonDelete,
                                            {
                                                opacity: pressed ? 0.3 : 1
                                            }
                                        ]}
                                        disabled={tarea.texto === '' ? true : false}
                                        onPress={() => [
                                            setOpenInput(false),
                                            setOpenAlert()
                                        ]}
                                    >
                                        <Ionicons name='trash-outline'size={24} color={'#ea4141dd'}/>
                                    </Pressable>
                                </View>
                            )
                        }


                    </View>

                </View>
            </Pressable>
        </Modal>
    );
};


const style = StyleSheet.create({

    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'relative',
    },


    modalContainer: {
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 25,
    },

    tareaInput: {
        fontSize: 16,
        marginBottom: 40,
    },

    buttonReady: {
        backgroundColor: WHITE,
        borderColor: PRIMARY,
        borderWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10
        
    },

    buttonReadyText: {
        textAlign: 'center',
        color: PRIMARY,
        fontSize: 18,
        fontWeight: '600', 
    },

    buttonDelete: {
        backgroundColor: WHITE,
        borderColor: '#ea4141dd',
        borderWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 10
    },

    buttonDeleteText: {
        textAlign: 'center',
        color: '#ea4141dd',
        fontSize: 18,
        fontWeight: '600', 
    }
})