import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  isCancelledResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';

// Web client ID (client_type 3) from android/app/google-services.json — required for idToken
const WEB_CLIENT_ID =
  '929205060312-o298f0udh3pp0870jttuf3d38bk5m712.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
  offlineAccess: true,
});

export type GoogleSignInResult =
  | { ok: true; email: string; idToken: string; userInfo: NonNullable<unknown> }
  | { ok: false; cancelled?: boolean; message: string };

export const signInWithGoogle = async (): Promise<GoogleSignInResult> => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Force account picker instead of silently reusing the last Google session
    try {
      await GoogleSignin.signOut();
    } catch {
      // no active Google session
    }

    const response = await GoogleSignin.signIn();

    if (isCancelledResponse(response)) {
      return { ok: false, cancelled: true, message: 'Sign in cancelled' };
    }

    if (!isSuccessResponse(response)) {
      return { ok: false, message: 'Google sign in was not completed' };
    }

    const email = response.data?.user?.email?.trim();
    let idToken = response.data?.idToken?.trim() || null;

    if (!idToken) {
      try {
        const tokens = await GoogleSignin.getTokens();
        idToken = tokens?.idToken?.trim() || null;
      } catch {
        idToken = null;
      }
    }

    if (!email || !idToken) {
      return {
        ok: false,
        message:
          'Could not verify your Google account. Choose an account and try again.',
      };
    }

    return { ok: true, email, idToken, userInfo: response.data };
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          return { ok: false, cancelled: true, message: 'Sign in cancelled' };
        case statusCodes.IN_PROGRESS:
          return { ok: false, message: 'Sign in already in progress' };
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          return { ok: false, message: 'Google Play Services not available' };
        default:
          return { ok: false, message: 'Google sign in failed' };
      }
    }
    return { ok: false, message: 'Google sign in failed' };
  }
};
