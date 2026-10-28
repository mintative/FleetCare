import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    gradient: {
        borderRadius: 30,
        marginTop: 30
    },
    container: {
        width: "100%",
        padding: 20,
        
        minHeight: 200,
        overflow: "hidden",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    info: {
        flex: 1,
        minWidth: 0,
        marginRight: 12,
    },

    label: {
        color: "#DCE3FF",
        fontSize: 15,
        fontWeight: "600",
        letterSpacing: 1.2,
    },

    totalRow: {
        flexDirection: "row",
        alignItems: "baseline",
        flexWrap: "wrap",
        marginTop: 8,
    },

    totalNumber: {
        color: "#FFFFFF",
        fontSize: 48,
        fontWeight: "700",
        lineHeight: 68,
    },

    vehicleLabel: {
        color: "#FFFFFF",
        fontSize: 18,
        marginLeft: 8,
    },

    badge: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "rgba(255,255,255,0.18)",
        paddingHorizontal: 12,
        paddingVertical: 9,
        borderRadius: 24,
        marginTop: 12,
    },

    check: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
        marginRight: 8,
    },

    badgeText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
    },

    availability: {
        alignItems: "center",
        width: 90,
        flexShrink: 0,
    },

    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 9,
        borderColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },

    percentage: {
        color: "#FFFFFF",
        fontSize: 23,
        fontWeight: "700",
    },

    availabilityLabel: {
        color: "#E0E4FF",
        fontSize: 14,
        marginTop: 12,
    },

    progressTrack: {
        width: "100%",
        height: 10,
        backgroundColor: "rgba(255,255,255,0.22)",
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 28,
    },

    progress: {
        height: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
        marginTop: 18,
    },

    stat: {
        flexDirection: "row",
        alignItems: "center",
    },

    activeDot: {
        width: 11,
        height: 11,
        borderRadius: 6,
        backgroundColor: "#FFFFFF",
        marginRight: 7,
    },

    inactiveDot: {
        width: 11,
        height: 11,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        marginRight: 7,
    },

    statText: {
        color: "#FFFFFF",
        fontSize: 13,
    },
});