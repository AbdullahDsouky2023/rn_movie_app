// components/InputComponent.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Modal } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons
import { Calendar } from 'react-native-calendars';

interface InputComponentProps {
  label: string;
  textContentType: 'emailAddress' | 'password' | 'name' | 'telephoneNumber';
  isPassword?: boolean;
  isDate?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  error?: string
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  textContentType,
  isPassword = false,
  isDate = false,

  value, error,
  onChangeText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelect = (date: any) => {
    onChangeText(date.dateString);
    setShowCalendar(false);
  };
  return (
    <View style={tw``}>
      <Text style={tw`text-lg mb-2 my-2 text-slate-500`}>{label}</Text>
      <View style={tw`relative`}>
        <TextInput
          textContentType={textContentType}
          secureTextEntry={isPassword && !showPassword}
          value={value}
          onFocus={() => isDate && setShowCalendar(true)}

          onChangeText={onChangeText}
          style={tw`border p-4 rounded-full border-slate-400 p-3`}
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
        {isDate && (
          <Pressable
            onPress={() => setShowCalendar(true)}
            style={tw`absolute right-4 top-4`}
          >
            <Ionicons name="calendar" size={24} color="gray" />
          </Pressable>
        )}
        {error && <Text style={tw`text-red-500 px-4 pt-2`}>{error}</Text>}
      </View>
      <Modal visible={showCalendar} transparent={true} animationType="slide">
        <View style={tw`flex-1 justify-end`}>
          <View style={tw`bg-white p-4`}>
            <Calendar
              onDayPress={handleDateSelect}
              markedDates={{ [value]: { selected: true } }}
            />
            <Pressable
              onPress={() => setShowCalendar(false)}
              style={tw`mt-4 bg-blue-500 p-2 rounded`}
            >
              <Text style={tw`text-white text-center`}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>


    </View >
  );
};

export default InputComponent;