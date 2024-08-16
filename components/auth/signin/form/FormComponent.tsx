import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import InputComponent from './InputComponent'
import { signInSchema, SignInSchemaType } from '../../../../app/schemas/signInSchema'
import { z } from 'zod'
import Button from '../../../Button'
import tw from 'twrnc'
import auth from '@react-native-firebase/auth'
import { router } from 'expo-router'
import { checkUserExists } from '../../../../utils/auth/helpers'
type Props = {}

const FormComponent = (props: Props) => {
    const [formData, setFormData] = useState<SignInSchemaType>({
        email: '',
        password: '',
      });
      const [errors, setErrors] = useState<Partial<SignInSchemaType>>({});
      const [isLoading,setIsLoading] = useState(false)
      const handleChange = (field: keyof SignInSchemaType) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: undefined }));
        }
      };
    
      const handleSignIn = async() => {
        try {
            setIsLoading(true)
          signInSchema.parse(formData);
          const { exist,methodRegister} =   await    checkUserExists(formData.email)
          console.log('Form is valid. Signing in with:', exist,methodRegister);
      if(exist && methodRegister === 'email'){

        const res = await auth().signInWithEmailAndPassword(formData.email,formData.password)
        if(res){
          console.log('te')
          router.replace('/home')
        }
      }else {
        Alert.alert('Invalid Email')

      }
          // Add your sign-in logic here
        } catch (error) {
          if (error instanceof z.ZodError) {
            const newErrors = error.errors.reduce((acc, curr) => {
              const field = curr.path[0] as keyof SignInSchemaType;
              acc[field] = curr.message;
              return acc;
            }, {} as Partial<SignInSchemaType>);
            setErrors(newErrors);
          }else {
            console.log('error' ,error)
            Alert.alert('Invalid Email Or Password')
          }
        }finally{
            setIsLoading(false)
            // setFormData({
            //   email:'',
            //   password:''
            // })

        }
      };
  return (
    <View style={tw`mt-5 flex  gap-2`}>

    <InputComponent
        label="Email"
        textContentType="emailAddress"
        value={formData.email}
        onChangeText={handleChange('email')}
        error={errors.email}
      />
      <InputComponent
        label="Password"
        textContentType="password"
        isPassword
        value={formData.password}
        onChangeText={handleChange('password')}
        error={errors.password}
      />
      <Button style={{marginTop:10}} loading={isLoading} title='Continue' onPress={() => handleSignIn()} />
  </View>
  )
}

export default FormComponent