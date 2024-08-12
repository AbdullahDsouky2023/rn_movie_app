import { View, Text, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Button from '../../Button'
import InputComponent from './form/InputComponent'
import { signInSchema, SignInSchemaType } from '../../../app/schemas/signInSchema'
import { z } from 'zod'
import FormComponent from './form/FormComponent'

type Props = {}

const SiginFormComponent = (props: Props) => {

  return (
    <View style={tw`mt-5`}>
   <FormComponent/>
    </View>
  )
}

export default SiginFormComponent