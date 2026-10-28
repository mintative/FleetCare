import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
    },
    

    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#192235',
        marginBottom: 8,
    },

    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#78849F',
        marginBottom: 28,
    },

    scrollContent: {
        flexGrow: 1,
        paddingBottom: 80,
        paddingHorizontal: 20,
    },

    row: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 26,
    },

    half: {
        flex: 1,
        minWidth: 0,
    },

    field: {
        marginBottom: 26,
    },

    actions: {
        marginTop: 8,
        marginBottom: 24,
    },
});