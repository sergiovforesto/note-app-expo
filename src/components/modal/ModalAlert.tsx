import { Dark } from '@/src/config/global-themes';
import { Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';


interface Props {
    title: string;
    subTitle: string;
    isNote?: boolean | undefined;
    isTask?: boolean | undefined;
    showAlert: boolean;
    transparent?: boolean;
    setOpenAlert?: () => void;
    deleteNote?: () => void;
    deleteTarea?: () => void;

}

export const ModalAlert = ({
    title,
    subTitle,
    showAlert, 
    setOpenAlert, 
    transparent = false, 
    deleteNote,
    deleteTarea,
    isNote = false,
    isTask = false
}: Props) => {

    const { width } = useWindowDimensions();

    return (
        <Modal
            animationType="fade"
            transparent={transparent}
            visible={showAlert}
        >
            <View
                style={style.backdrop}
            >
                <View style={[style.modalContainer, { width: width * 0.9 }]}>
                    <Text style={style.titleModal}>{title}</Text>
                    <Text style={style.questionModal}>{subTitle}</Text>

                    <View style={style.containerButtons}>
                        <Pressable
                            onPress={setOpenAlert}
                            style={({pressed}) => [
                                style.btnCancel,
                                {
                                    backgroundColor: pressed ? '#e0e0e0' : '#f1f1f1'
                                },
                            ]}
                        >
                            <Text style={style.btnText}>Cancelar</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => {
                                if(deleteNote) {
                                    if(isNote) return deleteNote()
                                }

                                if(deleteTarea) {
                                    if(isTask) return deleteTarea()
                                }
                            }}
                            style={({pressed}) => [
                                style.btnDelete,
                                {
                                    backgroundColor: pressed ? '#e0e0e0' : '#f1f1f1'
                                }
                            ]}
                        >
                            <Text style={[style.btnText, {color: '#FF453A'}]}>Eliminar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const style = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    modalContainer: {
        marginBottom: 20,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 25
    },

    titleModal: {
        fontSize: 16,
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: 15,
        color: Dark
    },
    questionModal: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 30,
        color: Dark
    },

    containerButtons: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },

    btnCancel: {
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 40,
        paddingVertical: 15,
        
        borderRadius: 15,
        textAlign: 'center'
    },

    btnDelete: {
        backgroundColor: '#f1f1f1',
        paddingHorizontal: 40,
        paddingVertical: 15,
        
        borderRadius: 15,
        textAlign: 'center'
    },

    btnText: {
        fontSize: 18,
        fontWeight: 500,
        color: Dark
    }

})