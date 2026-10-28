import { useColorScheme, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import FlashMessage from 'react-native-flash-message';

import { Navigation } from './navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import { colors } from './theme/colors';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { authStore } from './stores/AuthStore';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { AppStatusBar } from './components/StatusBar';

EStyleSheet.build({
  $primaryColor: colors.primaryColor,
  $secondaryColor: colors.secondaryColor,
});


const MainContent = observer(() => {
  const { theme } = useTheme();

  return (
    <SafeAreaProvider>
      <AppStatusBar />


      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <BottomSheetModalProvider>
          <Navigation
            isAuthenticated={authStore.isAuthenticated}
            requiresBiometrics={authStore.requiresBiometrics}
          />
        </BottomSheetModalProvider>

        <FlashMessage
          position="top"
          floating
          duration={3000}
          style={{
            zIndex: 9999,
            elevation: 9999,
            borderRadius: 16,
            marginHorizontal: 16,
            marginTop: 10,
            paddingVertical: 12,
            paddingHorizontal: 16,
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#000',
          }}
          titleStyle={{
            fontSize: 16,
            fontWeight: '700',
            color: '#000',
          }}
          textStyle={{
            fontSize: 14,
            color: '#666666',
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
});

const App = observer(() => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let mounted = true;

    authStore.initialize().finally(() => {
      if (mounted) {
        setInitialized(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!initialized || (authStore.isLoading && authStore.status === 'initializing')) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <MainContent />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
});

export default App;