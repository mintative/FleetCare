import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  label: {
    fontSize: 18,
    fontWeight: '600',
  },

  optional: {
    fontSize: 14,
    fontWeight: '400',
    color: "#666666"
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  dateButton: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  dateText: {
    fontSize: 15,
    color: "#111827",
  },

  placeholder: {
    color: "#9CA3AF",
  },

  calendarIcon: {
    fontSize: 20,
    color: "#6B7280",
  },

  clearButton: {
    width: 40,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
  },

  clearText: {
    fontSize: 24,
    color: "#6B7280",
  },

  pickerContainer: {
    marginTop: 8,
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
  },

  doneButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  doneText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
  },
});
