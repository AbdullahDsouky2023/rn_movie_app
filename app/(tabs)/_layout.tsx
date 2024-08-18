import { Tabs } from 'expo-router';
import { Image } from 'react-native';

// Import all your icons
import homeIcon from '../../assets/tabs/home.png';
import home2Icon from '../../assets/tabs/home2.png';
import searchIcon from '../../assets/tabs/search.png';
import search2Icon from '../../assets/tabs/search2.png';
import userIcon from '../../assets/tabs/user.png';
import downloadIcon from '../../assets/tabs/download.png';
import download2Icon from '../../assets/tabs/download2.png';
import user2Icon from '../../assets/tabs/user2.png';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import tw from 'twrnc';
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel:false,
        tabBarStyle:{
          paddingVertical:30,
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          // marginBottosm:-45,
          // backgroundColor:'red',
          // borderRadius:500
        },
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={50}
            style={tw`absolute inset-0 rounded-2xl overflow-hidden`}
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.3)']}
              style={tw`absolute inset-0`}
            />
           </BlurView>
        ),

      })}
    >
      <Tabs.Screen
        name="index" // Change this to "index" for the home screen
        options={{
          headerShown:false,
          tabBarIcon: ({ color, focused }) => {
            return <Image source={focused ? home2Icon : homeIcon} style={{ width: 24, height: 50,paddingTop:10,objectFit:'contain' }} />;
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown:false,
          tabBarIcon: ({ color, focused }) => {
            return <Image source={focused ? search2Icon : searchIcon} style={{ width: 24, height: 50,paddingTop:10,objectFit:'contain' }} />;
          },
        }}
      />
      <Tabs.Screen
        name="download"
        options={{
          title: 'Download',
          tabBarIcon: ({ color, focused }) => {
            return <Image source={focused ? download2Icon : downloadIcon} style={{ width: 24, height: 50,paddingTop:10,objectFit:'contain' }} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => {
            return <Image source={focused ? user2Icon : userIcon} style={{ width: 24, height: 50,paddingTop:10,objectFit:'contain' }} />;
          },
        }}
      />
    </Tabs>
  );
}