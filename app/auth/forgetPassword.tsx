
// app/auth/signin.tsx
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc'
import HeaderComponent from '../../components/auth/signin/HeaderComponent';
import SiginFormComponent from '../../components/auth/signin/SiginFormComponent';
import { Alert, Text, View } from 'react-native'
import InputComponent from '../../components/auth/signin/form/InputComponent';
import { ResetPassworSchemaType, ResetPaswordSchema } from '../schemas/signInSchema';
import { z } from 'zod';
import Button from '../../components/Button';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

type UserExistenceResult = {
  exist: boolean;
  methodRegister?: 'google' | 'email' | null;
};

export default function ForgetPasswordScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<ResetPassworSchemaType>({
    email: '',
  });
  const [errors, setErrors] = useState<Partial<ResetPassworSchemaType>>({});
  const [isLoading,setIsLoading] = useState(false)
  const handleChange = (field: keyof ResetPassworSchemaType) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  async function checkUserExists(email: string): Promise<UserExistenceResult> {
    try {
      const usersRef = firestore().collection('users');
      const query = await usersRef.where('email', '==', email).get();
  
      if (query.empty) {
        return { exist: false, methodRegister: null };
      } else {
        const userDoc = query.docs[0];
        const userData = userDoc.data();
        return {
          exist: true,
          methodRegister: userData.method as 'google' | 'email' | null
        };
      }
    } catch (error) {
      console.error("Error checking user existence in Firestore:", error);
      throw error;
    }
  }
  const handleResetPassword = async() => {
    try {
        setIsLoading(true)
        ResetPaswordSchema.parse(formData);
        try {
          const {methodRegister,exist} = await checkUserExists(formData.email);
        if (!exist) {
          Alert.alert('Error', 'No account found with this email address');
          return;
        }
          await auth().sendPasswordResetEmail(formData.email);
          if(methodRegister === 'email'){
            router.push('/auth/createPassword')
            Alert.alert('Success', 'Password reset email sent. Check your inbox.');
          }else {
            // Alert.alert('Oppps', 'Password reset email sent. Check your inbox.');
            router.push('/splash')

          }
        } catch (error:any) {
         console.log('Error', error.message);
        }
      // Add your sign-in logic here
    } catch (error) {
      const firebaseError = error as FirebaseAuthTypes.NativeFirebaseAuthError;
      let errorMessage = 'An error occurred. Please try again.';

      switch (firebaseError.code) {
        case 'auth/invalid-email':
          errorMessage = 'The email address is invalid.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later.';
          break;
        // Add more cases as needed
      }
      Alert.alert('Error', errorMessage);

      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce((acc, curr) => {
          const field = curr.path[0] as keyof ResetPassworSchemaType;
          acc[field] = curr.message;
          return acc;
        }, {} as Partial<ResetPassworSchemaType>);
        setErrors(newErrors);
      }
    }finally{
        setIsLoading(false)

    }
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white px-8 gap-4 `}>
      <HeaderComponent title={'Forget Password'} back={false}/>
        <Text style={tw`mt-12 text-slate-400 mb-4`}>
        Input your linked email to your Movees account below, we’ll send you a link
        </Text>

        <InputComponent
        label="Email"
        textContentType="emailAddress"
        value={formData.email}
        onChangeText={handleChange('email')}
        error={errors.email}
      />
      <Button loading={isLoading} title='Continue' style={{marginTop:20}} onPress={() => handleResetPassword()} />    

    </SafeAreaView>
  );
}