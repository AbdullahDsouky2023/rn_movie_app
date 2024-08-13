import { Stack } from "expo-router"
import { SafeAreaView } from "react-native"

export const AuthLayout = ()=>{
    return(
        <SafeAreaView>

        <Stack>
            <Stack.Screen name="signup"  options={{title:'Sign Up'}}/>
            <Stack.Screen name="signin"  options={{title:'Sign In'}}/>
            <Stack.Screen name="forgetPassword"  options={{title:'ForgetPasswordScreen'}}/>
            <Stack.Screen name="createPassword"  
            options={{title:'ForgetPasswordConfirmScreen'}}/>
        </Stack>
            </SafeAreaView>
    )
}
