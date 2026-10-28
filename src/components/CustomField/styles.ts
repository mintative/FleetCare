import EStyleSheet from "react-native-extended-stylesheet";
import { colors } from "../../theme/colors";

export const styles = EStyleSheet.create({
  container: {
    width: '100%',
  },

  labelContainer: {
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

  inputContainer: {
    borderWidth: 1.5,
    borderRadius: 40,
    borderColor: colors.border,
    paddingVertical:5,
    paddingHorizontal: 15,
    
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    minWidth: 0,
    fontSize: 20,
    paddingVertical: 12,
  },

  suffix: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 8,
    color: "#666666"
  },

  segmentedContainer: {

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
    
    
  },

  activeSegment: {
    backgroundColor: '#FFFFFF',
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

});