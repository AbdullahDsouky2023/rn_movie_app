import { View, Text, Pressable, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AuthenticationToken } from 'react-native-fbsdk-next';
import { router } from 'expo-router';
import { sha256 } from 'react-native-sha256';
import { storage } from '../../../app/_layout';
import firestore from '@react-native-firebase/firestore'
type Props = {}
// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '45934948539-72ssk9v56fa43jqivcccu9bi6dhcpndp.apps.googleusercontent.com', // Get this from your Firebase console
});
const SignInWithProviders = (props: Props) => {
  const [loading, setIsLoading] = useState<boolean>(false)
  async function onGoogleButtonPress() {
    try {
      setIsLoading(true)
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  }

  // Facebook Sign-In
  async function onFacebookButtonPress() {
    try {
      const nonce = '123456';
      const nonceSha256 = await sha256(nonce);
      // Attempt login with permissions and limited login
      const result = await LoginManager.logInWithPermissions(
        ['public_profile', 'email'],
        'limited',
        nonceSha256,
      );

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccessToken
      const data = await AuthenticationToken.getAuthenticationTokenIOS();

      if (!data) {
        throw 'Something went wrong obtaining authentication token';
      }

      // Create a Firebase credential with the AuthenticationToken
      // and the nonce (Firebase will validates the hash against the nonce)
      const facebookCredential = auth.FacebookAuthProvider.credential(data.authenticationToken, nonce);

      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.error(error);
    }
  }
  const handelGoogleAuth = async () => {
    try {

      const user = await onGoogleButtonPress()
      if (user) {

        storage.set('user', JSON.stringify(user));
        await firestore().collection('users').doc(user?.user?.uid).set({
          name: user?.user.displayName,
          createdAt: firestore.FieldValue.serverTimestamp(),
          method:'google',
          phoneNumber:user?.user.phoneNumber,
          photoUrl:user?.user.photoURL,
          email: user?.user.email,
          // Add any other custom fields you need
        });
        router.replace('/home')
      }
    } catch (error) {
      console.log('error google aut h ', error)
    }
  }
 
  return (
    <>
    {
      loading&& 
      <ActivityIndicator/>
    }
      <Pressable style={tw`border rounded-full flex items-center  mt-5 flex-row p-4 gap-4 justify-center border-slate-500`}
        onPress={handelGoogleAuth}

      >
        <Image source={require('../../../assets/auth/google.png')} height={30} width={30} />
        <Text style={tw`font-bold text-lg`}>
          Continue with Google
        </Text>
      </Pressable>
      <Pressable
        onPress={() => onFacebookButtonPress().then((user) => {
          console.log('facebook login user', user)
          router.replace('/home')
        }).catch((err) => {
          console.error('error ', err)
        })
        }
        style={tw`border rounded-full flex items-center  mt-5 flex-row p-4 gap-4 justify-center border-slate-500`}>
        <Image source={require('../../../assets/auth/Facebook.png')} height={35} width={35} />
        <Text style={tw`font-bold text-lg`}>
          Continue with Facebook
        </Text>
      </Pressable>

    </>
  )
}

export default SignInWithProviders