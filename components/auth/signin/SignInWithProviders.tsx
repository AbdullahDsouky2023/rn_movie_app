import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import auth from '@react-native-firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';

type Props = {}

const SignInWithProviders = (props: Props) => {
    WebBrowser.maybeCompleteAuthSession();
    const [googleRequest, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest({
        clientId: '45934948539-72ssk9v56fa43jqivcccu9bi6dhcpndp.apps.googleusercontent.com',
      });
    
      const [facebookRequest, facebookResponse, facebookPromptAsync] = Facebook.useAuthRequest({
        clientId: 'YOUR_FACEBOOK_APP_ID',
      });
    
      React.useEffect(() => {
        if (googleResponse?.type === 'success') {
          const { id_token } = googleResponse.params;
          const credential = auth.GoogleAuthProvider.credential(id_token);
          auth().signInWithCredential(credential);
        }
      }, [googleResponse]);
    
      React.useEffect(() => {
        if (facebookResponse?.type === 'success') {
          const { access_token } = facebookResponse.params;
          const credential = auth.FacebookAuthProvider.credential(access_token);
          auth().signInWithCredential(credential);
        }
      }, [facebookResponse]);
    return (
        <>
            <Pressable style={tw`border rounded-full flex items-center  mt-5 flex-row p-4 gap-4 justify-center border-slate-500`}
  onPress={() => googlePromptAsync()}
            >
                <Image source={require('../../../assets/auth/google.png')} height={30} width={30} />
                <Text style={tw`font-bold text-lg`}>
                    Continue with Google
                </Text>
            </Pressable>
            <Pressable style={tw`border rounded-full flex items-center  mt-5 flex-row p-4 gap-4 justify-center border-slate-500`}>
                <Image source={require('../../../assets/auth/Facebook.png')} height={35} width={35} />
                <Text style={tw`font-bold text-lg`}>
                    Continue with Facebook
                </Text>
            </Pressable> 
            
                </>
    )
}

export default SignInWithProviders