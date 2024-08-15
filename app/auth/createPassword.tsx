import { View, Text, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import HeaderComponent from '../../components/auth/signin/HeaderComponent'
import InputComponent from '../../components/auth/signin/form/InputComponent'
import { CreateNewPasswordSchema, CreateNewPasswordSchemaType } from '../schemas/createPasswordSchema'
import { z } from 'zod'
import { useRouter } from 'expo-router'
import Button from '../../components/Button'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
type Props = {}

const createPassword = (props: Props) => {
  const router = useRouter()
  const [formData, setFormData] = useState<CreateNewPasswordSchemaType>({
   password:'',
   confirmPassword:''
  });
  const [errors, setErrors] = useState<Partial<CreateNewPasswordSchemaType>>({});
  const [isLoading,setIsLoading] = useState(false)
  const handleChange = (field: keyof CreateNewPasswordSchemaType) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSignIn = async() => {
    try {
        setIsLoading(true)
        CreateNewPasswordSchema.parse(formData);
      console.log('Form is valid. Signing in with:', formData);
      
    try {
      // Get the current user
      const user = auth().currentUser;
      
      if (user) {
        // Update the password
        await user.updatePassword(formData.password);
        Alert.alert('Success', 'Password has been reset successfully');
        router.replace('/'); // Navigate to home or login screen
      } else {
        Alert.alert('Error', 'No user is currently signed in');
      }
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
      Alert.alert('Error', errorMessage);    }
      // router.replace('/auth/createPassword')
      // Add your sign-in logic here
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce((acc, curr) => {
          const field = curr.path[0] as keyof CreateNewPasswordSchemaType;
          acc[field] = curr.message;
          return acc;
        }, {} as Partial<CreateNewPasswordSchemaType>);
        setErrors(newErrors);
      }
    }finally{
        setIsLoading(false)

    }
  };
  return (
    <SafeAreaView style={tw`flex-1 bg-white  gap-4 px-8`}>
      <View style={tw`flex-1 bg-white  gap-4 px-8`}>
    <HeaderComponent title={'Create New Password'} back={false} />

      <Text style={tw`mt-12 text-slate-400 mb-4`}>
      Lorem ipsum dolor sit amet, consectetur adipisci elit, sed do eiusmod tempor incididunt      </Text>

      <InputComponent
      label="Passowrord"
      textContentType="password"
      isPassword={true}
      value={formData.password}
      onChangeText={handleChange('password')}
      error={errors.password}
    />
      <InputComponent
      label="confirmPassword"
      textContentType="emailAddress"
      value={formData.confirmPassword}
      isPassword={true}

      onChangeText={handleChange('confirmPassword')}
      error={errors.confirmPassword}
    />
    <Button loading={isLoading} title='Continue' style={{marginTop:20}} onPress={() => handleSignIn()} />    
</View>
  </SafeAreaView>
  )
}

export default createPassword