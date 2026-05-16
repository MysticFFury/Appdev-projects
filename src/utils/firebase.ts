import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

export const signInWithGoogle = async () => {
     try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      return({ userInfo: response.data });
    } else {
      // sign in was cancelled by user
      return { userInfo: null };
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          return { userInfo: null, message: 'Sign in already in progress' };
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          return { userInfo: null, message: 'Play services not available' };
        default:
          return { userInfo: null, message: 'Google sign in failed' };
      }
    } else {
      return { userInfo: null, message: 'Google sign in failed' };
    }
  }
};