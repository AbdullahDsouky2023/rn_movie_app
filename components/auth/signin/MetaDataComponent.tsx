import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import tw from 'twrnc'
import SignInWithProviders from './SignInWithProviders'
type Props = {}

const MetaDataComponent = (props: Props) => {
    return (
        <>
            <View style={tw`flex flex-row gap-4 mt-4  justify-center items-center`}>

                <Link href={'/auth/forgetPassword'} style={tw`text-xl text-violet-900 font-bold`} >
                    Forget Password?
                </Link>
            </View>

            <View style={tw`h-[2px] w-full bg-slate-300 mt-10`} />
            <Text style={tw`text-lg text-center mt-[-15px] bg-white w-[55px] self-center`}>
                Or
            </Text>
        
            <SignInWithProviders />
            <View style={tw`flex flex-row gap-4 mt-4  justify-center items-center`}>

                <Text style={tw`text-xl`}>
                    Don’t have account

                </Text>
                <Link href={'/auth/signup'} style={tw`text-xl text-violet-900 font-bold`} >
                    Sign Up</Link>
            </View>

        </>
    )
}

export default MetaDataComponent