import { View, Text, Image, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker';
import tw from 'twrnc'
import { AntDesign } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'
import Button from '../Button';
interface ImagePickerComponentProps {
    onImageUrlChange: (url: string) => void;
  }
const ImageComponent: React.FC<ImagePickerComponentProps> = ({onImageUrlChange}) => {
    const [imageUri, setImageUri] = useState<string | null>(null);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        setImageUri(response.assets[0].uri);
        onImageUrlChange(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert('Error', 'No user is currently signed in');
      return;
    }

    try {
      // Upload image to Firebase Storage
      const reference = storage().ref(`userImages/${currentUser.uid}`);
      await reference.putFile(imageUri);

      // Get the download URL
      const url = await reference.getDownloadURL();
        console.log('the url of the image ',url)
      // Update user document in Firestore
    //   await firestore().collection('users').doc(currentUser.uid).update({
    //     Pin: url
    //   });

      Alert.alert('Success', 'Image uploaded and profile updated');
      onImageUrlChange(url);
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  return (
    <Pressable onPress={selectImage}>
    {imageUri ? 
     <Image source={{uri: imageUri}}
style={[{
    height:100,
    width:100,
    borderRadius:'50%',
    alignSelf:'center',
    overflow:'hidden'
},tw`rounded-full`]}
/>:    <Image source={require('../../assets/profile/Avatar/user.png')}
style={{
    height:100,
    width:100,
    borderRadius:'50%',
    alignSelf:'center'
}}
/>
 

}
<View style={tw`bg-violet-500 w-[35px] h-[35px] self-center rounded-full flex items-center justify-center top-[-30px] left-[30px]`}>
<AntDesign name="edit" size={22} color="white" />
    </View>
    </Pressable>
  )
}

export default ImageComponent