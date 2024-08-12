import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router'
import { useRootNavigationState, Redirect } from 'expo-router';

export default function index() {

  const rootNavigationState = useRootNavigationState()

  if(rootNavigationState?.key)return null

    return <Redirect href={'splash'}/>
}