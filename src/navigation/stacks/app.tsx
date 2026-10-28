import { NavigationContainer } from '@react-navigation/native';

import { PublicStack } from './public';
import PrivateStack from './private';

type Props = {
  isAuthenticated: boolean;
  requiresBiometrics: boolean;
};

export default function AppStack({
  isAuthenticated,
  requiresBiometrics
}: Props) {

  const canAccessPrivateStack =
    isAuthenticated && !requiresBiometrics;

  return (
    <NavigationContainer>
      {canAccessPrivateStack ? (
        <PrivateStack />
      ) : (
        <PublicStack />
      )}
    </NavigationContainer>
  );
}