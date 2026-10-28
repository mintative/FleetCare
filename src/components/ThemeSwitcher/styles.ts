import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
    container: {
        marginTop: 30,
    },
    title: {

        textTransform: "uppercase",
    },
    segmentedContainer: {
        marginTop: 10,

        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 40,
        padding: 5,

        
    

    },

    segment: {
        flex: 1,
        minWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        paddingHorizontal: 4,
        paddingVertical: 15,
        flexDirection: "row",
        gap: 10,
        alignItem: "center",


    },

    activeSegment: {

        elevation: 4,
        shadowColor: '#000000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.12,
        shadowRadius: 2,

        borderRadius: 24,
    },

    segmentText: {
        fontSize: 16,
        fontWeight: '600',
    },

    activeSegmentText: {
        color: '#000',
    },
});