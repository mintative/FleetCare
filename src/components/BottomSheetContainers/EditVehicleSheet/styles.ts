import EStyleSheet from "react-native-extended-stylesheet";

export const styles = EStyleSheet.create({
    container: {
        flex: 1,
        padding:20
    },
    

    title: {
        fontSize: 26,
        fontWeight: '700',

        marginBottom: 8,
    },

    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#666666',
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
    imageSection: {
  marginBottom: 24,
},

imageLabel: {
  fontSize: 18,
  fontWeight: '600',
  marginBottom: 10,
},

imagePicker: {
  width: "100%",
  height: 190,
  borderWidth: 1,
  borderColor: "#D1D5DB",

  borderRadius: 14,
  overflow: "hidden",
  backgroundColor: "#F9FAFB",
},

imagePlaceholder: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
},

imageIcon: {
  fontSize: 32,
  marginBottom: 8,
  color: "#6B7280",
},

imagePickerTitle: {
  fontSize: 16,
  fontWeight: "600",
  color: "#374151",
},

imagePickerDescription: {
  marginTop: 5,
  fontSize: 13,
  color: "#6B7280",
},

vehicleImage: {
  width: "100%",
  height: "100%",
},

imageActions: {
  flexDirection: "row",
  gap: 10,
  marginTop: 12,
},

imageActionButton: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 12,
  paddingHorizontal: 8,
  borderRadius: 10,
  backgroundColor: "#E5E7EB",
},

imageActionText: {
  fontSize: 13,
  fontWeight: "600",
  color: "#374151",
},

removeImageText: {
  marginTop: 12,
  textAlign: "center",
  color: "#DC2626",
  fontSize: 14,
},

optional: {
    fontSize: 14,
    fontWeight: '400',
    color: "#666666"
  },
});