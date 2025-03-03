import { Dark, LIGHTBLACK } from '@/src/config/global-themes';
import { Text, View, Modal, StyleSheet, Pressable } from 'react-native';


interface Props {
    modalVisible: boolean;
    transparent?: boolean;

    setOpenModal?: () => void;
    setWishDelete?: () => void;
}

export const ModalMenu = ({modalVisible = false, setOpenModal, transparent = false, setWishDelete}:Props) => {
    return (
        <Modal
          animationType="fade"
          transparent={transparent}
          visible={modalVisible}
        >
          <Pressable 
            style={style.backdrop}
            onPress={setOpenModal}
          >
            <View 
                style={style.modalContainer}
            >

                <Pressable
                    onPress={setWishDelete}
                    style={({pressed}) => [
                        {
                            backgroundColor: pressed ? 'rgba(132, 132, 132, 0.4)' : 'white'
                        },
                        style.deleteButton
                    ]}
                >
                    <Text style={style.textButton}>Delete</Text>
                </Pressable>

            </View>
          </Pressable>
        </Modal>
    );
};



const style = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flex: 1,
        position: 'relative'
    },

    modalContainer: {
        position: 'absolute',
        right: 15,
        top: 50,
        backgroundColor: 'white',
        width: 200,
        borderRadius: 10
    },

    deleteButton: {
        borderRadius: 10,
        // backgroundColor: "red",
        paddingVertical: 15,

    },

    textButton: {
        fontSize: 16,
        fontWeight: 500,
        color: Dark,
        paddingHorizontal: 15
    }
})