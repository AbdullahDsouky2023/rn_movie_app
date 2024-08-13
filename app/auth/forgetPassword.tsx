
// app/auth/signin.tsx
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc'
import HeaderComponent from '../../components/auth/signin/HeaderComponent';
import SiginFormComponent from '../../components/auth/signin/SiginFormComponent';
import { Text, View } from 'react-native'
import InputComponent from '../../components/auth/signin/form/InputComponent';
import { ResetPassworSchemaType, ResetPaswordSchema } from '../schemas/signInSchema';
import { z } from 'zod';
import Button from '../../components/Button';
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

  const handleSignIn = () => {
    try {
        setIsLoading(true)
        ResetPaswordSchema.parse(formData);
      console.log('Form is valid. Signing in with:', formData);
      router.replace('/auth/createPassword')
      // Add your sign-in logic here
    } catch (error) {
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
      <HeaderComponent title={'Forget Password'} />
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
      <Button loading={isLoading} title='Continue' style={{marginTop:20}} onPress={() => handleSignIn()} />    

    </SafeAreaView>
  );
}