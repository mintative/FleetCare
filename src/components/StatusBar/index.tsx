import { useTheme } from "../../theme/ThemeContext"
import { StatusBar as RNStatusBar } from 'react-native';

export const AppStatusBar = () => {
    const { theme, isDark } = useTheme();

    const backgroundColor = theme.background || theme.colors?.background || 'transparent';
    return (
        <RNStatusBar
            barStyle={isDark ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundColor}
            translucent={false}
            animated
        />
  );
}