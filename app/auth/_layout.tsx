import { Stack } from "expo-router"

export const AuthLayout = ()=>{
    return(
        <Stack>
            <Stack.Screen name="signup"  options={{title:'Sign Up'}}/>
            <Stack.Screen name="signin"  options={{title:'Sign In'}}/>
            <Stack.Screen name="forgetPassword"  options={{title:'ForgetPasswordScreen'}}/>
            <Stack.Screen name="forgetPasswordConfirm"  options={{title:'ForgetPasswordConfirmScreen'}}/>
        </Stack>
    )
}
