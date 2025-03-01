import { Platform, StyleSheet } from "react-native";


export const PRIMARY = '#FFB344'
export const Dark = '#3A3A3C'
export const LIGHTBLACK = '#44464E'
export const WHITE = '#FFF'
export const GRAY = '#D1D1D6'
export const LIGHTGRAY = '#b0b0b4'
export const BACKGROUNDGLOBAL = '#f8f8f8'


export const globalThemes = StyleSheet.create({

    headerNotas: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 5,
        paddingVertical: 10,
    },

    hideButton: {
        display: 'none'
    },

    showButton: {
        display: 'flex'
    },

    buttonHover: {
        backgroundColor: '#d9d8d8',
        padding: 5,
        borderRadius: '100%'
    },

    inputTitle: {
        height: 50,
        fontSize: 20,
        fontWeight: 500,
    },

    inputDescription: {
        
        height: 'auto',
        marginTop: 10,
        fontSize: 16,
        fontWeight: 400,
        color: LIGHTBLACK
    },

    currentDate: {
        fontSize: 13,
        color: LIGHTGRAY,
        paddingHorizontal: 5
        
    }
    
})