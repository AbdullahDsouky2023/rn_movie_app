import { View, Text } from 'react-native'
import React, { useState } from 'react'
import InputComponent from './InputComponent'
import { signInSchema, SignInSchemaType } from '../../../../app/schemas/signInSchema'
import { z } from 'zod'
import Button from '../../../Button'
import tw from 'twrnc'
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
    
      const handleSignIn = () => {
        try {
            setIsLoading(true)
          signInSchema.parse(formData);
          console.log('Form is valid. Signing in with:', formData);
          // Add your sign-in logic here
        } catch (error) {
          if (error instanceof z.ZodError) {
            const newErrors = error.errors.reduce((acc, curr) => {
              const field = curr.path[0] as keyof SignInSchemaType;
              acc[field] = curr.message;
              return acc;
            }, {} as Partial<SignInSchemaType>);
            setErrors(newErrors);
          }
        }finally{
            setIsLoading(false)

        }
      };
  return (
    <View style={tw`mt-10 flex  gap-4`}>

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
      <Button loading={isLoading} title='Continue' onPress={() => handleSignIn()} />
  </View>
  )
}

export default FormComponent