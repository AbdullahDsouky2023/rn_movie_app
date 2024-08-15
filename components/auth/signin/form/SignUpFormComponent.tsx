import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SignUpSchemaObject, SignUpSchemaType } from '../../../../app/schemas/SiginUpSchema';
import InputComponent from './InputComponent';
import tw  from 'twrnc';
import { z } from 'zod';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '../../../Button';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Link, router } from 'expo-router';
import auth from '@react-native-firebase/auth'
import { storage } from '../../../../app/_layout';
type Props = {}

const SignUpFormComponent = (props: Props) => {
    const [formData, setFormData] = useState<SignUpSchemaType>({
        email: '',
        password: '',
        birthday:'',
        confirmPassword:''
      });
      const [errors, setErrors] = useState<Partial<SignUpSchemaType>>({});
      const [isLoading,setIsLoading] = useState(false)
      const handleSignUp = async() => {
        try {
            setIsLoading(true)
          SignUpSchemaObject.parse(formData);
         await  CreateUserFirebase(formData)
          // Add your sign-in logic hereg
        } catch (error) {
          if (error instanceof z.ZodError) {
            const newErrors = error.errors.reduce((acc, curr) => {
              const field = curr.path[0] as keyof SignUpSchemaType;
              acc[field] = curr.message;
              return acc;
            }, {} as Partial<SignUpSchemaType>);
            setErrors(newErrors);
          }
        }finally{
            setIsLoading(false)

        }
      };
      const CreateUserFirebase = async(formData:SignUpSchemaType)=>{
        try {
           const user =  await auth().createUserWithEmailAndPassword(formData.email,formData.password)
           if(user){
            await user.user.updateProfile({
              displayName:formData.birthday
            })
            storage.set('user', JSON.stringify(user));
            router.replace('/home')
           }
        } catch (error) {
          console.log('createing new user',error)
        }
      }
      const handleChange = (field: keyof SignUpSchemaType) => (value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: undefined }));
        }
      };
  return (
      
      <View style={tw`flex gap-5 mt-5`}>
    <ScrollView showsVerticalScrollIndicator={false} style={tw`flex gap-5 mt-5`}>
<InputComponent
        label="Email"
        textContentType="emailAddress"
        value={formData.email}
        onChangeText={handleChange('email')}
        error={errors.email}
        />  
<InputComponent
        label="BirthDay"
        textContentType="name"
        isDate={true}
        value={formData.birthday}
        onChangeText={handleChange('birthday')}
        error={errors.birthday}
        />  
<InputComponent
        label="Password"
        textContentType="password"
        value={formData.password}
        onChangeText={handleChange('password')}
        error={errors.password}
        isPassword={true}
      />  
<InputComponent
        label="Confirm Password"
        textContentType="password"
        value={formData.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        error={errors.confirmPassword}
        isPassword={true}
      />

    

      <Text style={{marginTop:20,fontSize:RFPercentage(1.6),fontWeight:300}}>
      By click the agree and continue button, you’re agree to Movees’
      
      <Link href={''} style={[tw`px-4`,{fontWeight:700,margin:5}]}>
 Terms and Service
 </Link> and acknlowledge the 

      </Text>
<Link href={''} style={{fontWeight:700,margin:5}}>
Privacy and Policy
</Link>
        </ScrollView>
      <Button style={{marginTop:50}} loading={isLoading} title='Agree and Continue' onPress={() => handleSignUp()} />
        </View>
  )
}

export default SignUpFormComponent