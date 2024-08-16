import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { RFPercentage } from 'react-native-responsive-fontsize';
import tw from 'twrnc'
interface OtpInputProps {
  onComplete: (pin: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ onComplete }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<TextInput[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every(digit => digit !== '')) {
      Keyboard.dismiss();
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
   
      <Text style={tw`text-lg text-slate-500 mt-8 px-4 text-center`}>
        Set a 4-digit PIN to prevent others from accessing this profile
            </Text>
            <View style={styles.container}>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => {
              if (ref) inputRefs.current[index] = ref;
            }}
            style={[styles.otpInput,tw`rounded-full font-bold h-[85px] border-slate-300 w-[85px]`]}
            maxLength={1}
            keyboardType="numeric"
            value={digit ? '•' : digit}
            
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
          />
        ))}
      </View>
     
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:40
  },
  title: {
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    gap:10,
    width: '100%',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: RFPercentage(5.1),
    textAlign: 'center',
   
  },
});

export default OtpInput;