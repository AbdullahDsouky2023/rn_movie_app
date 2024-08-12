// components/InputComponent.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

interface InputComponentProps {
  label: string;
  textContentType: 'emailAddress' | 'password' | 'name' | 'telephoneNumber';
  isPassword?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  error?:string
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  textContentType,
  isPassword = false,
  value,error,
  onChangeText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={tw``}>
      <Text style={tw`text-lg mb-2 text-slate-500`}>{label}</Text>
      <View style={tw`relative`}>
        <TextInput
          textContentType={textContentType}
          secureTextEntry={isPassword && !showPassword}
          value={value}
          onChangeText={onChangeText}
          style={tw`border p-4 rounded-full border-slate-400 p-5`}
        />
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={tw`absolute right-4 top-4`}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="gray"
            />
          </Pressable>
        )}
      {error && <Text style={tw`text-red-500  px-4 pt-2`}>{error}</Text>}
      </View>

    </View>
  );
};

export default InputComponent;