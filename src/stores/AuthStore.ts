// src/stores/AuthStore.ts

import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics';
import Config from 'react-native-config';

const SESSION_SERVICE =
  Config.SESSION_SERVICE || 'com.example.app.session';
const BIOMETRICS_KEY = '@auth/biometrics_enabled';


const TEST_CREDENTIALS = {
  email: 'test@example.com',
  password: '123456',
};

export interface AuthUser {
  email: string;
}

interface StoredSession {
  user: AuthUser;
  sessionId: string;
}

type AuthStatus =
  | 'initializing'
  | 'unauthenticated'
  | 'authenticated'
  | 'biometric_required';

class AuthStore {
  status: AuthStatus = 'initializing';
  user: AuthUser | null = null;

  isLoading = false;
  error: string | null = null;
  isBiometricsEnabled = false;
  isBiometricsAvailable = false;

  private biometrics = new ReactNativeBiometrics();

  constructor() {
    makeAutoObservable(
      this,
      {
        biometrics: false,
      },
      { autoBind: true },
    );
  }

  get isAuthenticated(): boolean {
    return this.status === 'authenticated' && this.user !== null;
  }

  get requiresBiometrics(): boolean {
    return this.status === 'biometric_required';
  }

  async initialize(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      const [biometricsPreference, sensor] = await Promise.all([
        AsyncStorage.getItem(BIOMETRICS_KEY),
        this.biometrics.isSensorAvailable(),
      ]);

      const biometricEnabled = biometricsPreference === 'true';


      runInAction(() => {
        this.isBiometricsEnabled = biometricEnabled;
        this.isBiometricsAvailable = sensor.available;
      });

      await this.restoreSession();
    } catch {
      runInAction(() => {
        this.status = 'unauthenticated';
        this.user = null;
        this.error = 'Could not authorize.';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async restoreSession(): Promise<void> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: SESSION_SERVICE,
      });

      if (!credentials) {
        runInAction(() => {
          this.status = 'unauthenticated';
          this.user = null;
        });
        return;
      }

      const session = JSON.parse(
        credentials.password,
      ) as StoredSession;

      if (!session?.user?.email || !session.sessionId) {
        await Keychain.resetGenericPassword({
          service: SESSION_SERVICE,
        });

        runInAction(() => {
          this.status = 'unauthenticated';
          this.user = null;
        });
        return;
      }

      runInAction(() => {
        this.user = session.user;


        if (!this.isBiometricsEnabled) {
          this.status = 'authenticated';
          return;
        }


        if (this.isBiometricsAvailable) {
          this.status = 'biometric_required';
        } else {

          this.status = 'unauthenticated';
          this.user = null;
          this.error = 'Biometrics is unavailable. Please login using your password.';
        }
      });
    } catch {
      runInAction(() => {
        this.status = 'unauthenticated';
        this.user = null;
        this.error = 'Could not resore session.';
      });
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    this.isLoading = true;
    this.error = null;

    try {
      const normalizedEmail = email.trim().toLowerCase();

      if (
        normalizedEmail !== TEST_CREDENTIALS.email ||
        password !== TEST_CREDENTIALS.password
      ) {
        runInAction(() => {
          this.error = 'Wrong email or password.';
        });

        return false;
      }

      const user: AuthUser = {
        email: normalizedEmail,
      };

      const session: StoredSession = {
        user,
        sessionId: this.createSessionId(),
      };

      const saved = await Keychain.setGenericPassword(
        user.email,
        JSON.stringify(session),
        {
          service: SESSION_SERVICE,
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        },
      );

      if (!saved) {
        throw new Error('Failed to dave session.');
      }

      runInAction(() => {
        this.user = user;
        this.status = 'authenticated';
      });

      return true;
    } catch {
      runInAction(() => {
        this.error = 'Log in error. Try again.';
      });

      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async enableBiometrics(): Promise<boolean> {
    if (!this.isAuthenticated) {
      this.error = 'Login to the app first.';
      return false;
    }

    this.isLoading = true;
    this.error = null;

    try {
      const sensor = await this.biometrics.isSensorAvailable();

      if (!sensor.available) {
        runInAction(() => {
          this.isBiometricsAvailable = false;
          this.error = 'Biometrics is not available on this device.';
        });
        return false;
      }

      const result = await this.biometrics.simplePrompt({
        promptMessage: 'Prove your identity to enable biometrics',
        cancelButtonText: 'Cancel',
      });

      if (!result.success) {
        return false;
      }

      await AsyncStorage.setItem(BIOMETRICS_KEY, 'true');

      runInAction(() => {
        this.isBiometricsEnabled = true;
        this.isBiometricsAvailable = true;
      });

      return true;
    } catch {
      runInAction(() => {
        this.error = 'Failed to enable biometrics.';
      });

      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async loginWithBiometrics(): Promise<boolean> {
    if (!this.isBiometricsEnabled || !this.isBiometricsAvailable) {
      this.error = 'Biometric login is unavailable.';
      return false;
    }

    this.isLoading = true;
    this.error = null;

    try {
      const credentials = await Keychain.getGenericPassword({
        service: SESSION_SERVICE,
      });

      if (!credentials) {
        runInAction(() => {
          this.user = null;
          this.status = 'unauthenticated';
          this.error = 'Session not found. Login with password.';
        });
        return false;
      }

      const session = JSON.parse(
        credentials.password,
      ) as StoredSession;

      if (!session?.user?.email || !session.sessionId) {
        await Keychain.resetGenericPassword({
          service: SESSION_SERVICE,
        });

        runInAction(() => {
          this.user = null;
          this.status = 'unauthenticated';
          this.error = 'Saved session is not fine.';
        });
        return false;
      }

      const result = await this.biometrics.simplePrompt({
        promptMessage: 'Prove your identity to login',
        cancelButtonText: 'Cancel',
      });

      if (!result.success) {
        return false;
      }

      runInAction(() => {
        this.user = session.user;
        this.status = 'authenticated';
      });

      return true;
    } catch {
      runInAction(() => {
        this.error = 'Failed to login with biometrics.';
      });

      return false;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async disableBiometrics(): Promise<void> {
    try {
      await AsyncStorage.removeItem(BIOMETRICS_KEY);

      runInAction(() => {
        this.isBiometricsEnabled = false;

        if (this.user) {
          this.status = 'authenticated';
        }
      });
    } catch {
      runInAction(() => {
        this.error = 'Failed to disable biometrics.';
      });
    }
  }

  async logout(): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      await Keychain.resetGenericPassword({
        service: SESSION_SERVICE,
      });

      await AsyncStorage.removeItem(BIOMETRICS_KEY);

      runInAction(() => {
        this.user = null;
        this.status = 'unauthenticated';
        this.isBiometricsEnabled = false;
      });
    } catch {
      runInAction(() => {
        this.error = 'Failed to close session.';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async toggleBiometrics(): Promise<boolean> {
    if (this.isBiometricsEnabled) {
      await this.disableBiometrics();
      return false;
    } else {
      return await this.enableBiometrics();
    }
  }

  clearError(): void {
    this.error = null;
  }

  private createSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

export const authStore = new AuthStore();