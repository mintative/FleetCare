
import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../theme/colors";

export const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 20,
  },

  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
    backgroundColor:  colors.border,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 50,

  },

  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 0,
    fontSize: 20,
    color: "#192238",
  },

  filterButton: {
    padding:10,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 48,
    
  },
  filterButtonActive: {
    backgroundColor: colors.blueLight,
    borderColor: colors.blueDark,
    
  },
});