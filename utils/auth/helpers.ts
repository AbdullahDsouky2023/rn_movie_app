
import firestore from '@react-native-firebase/firestore'

type UserExistenceResult = {
    exist: boolean;
    methodRegister?: 'google' | 'email' | null;
  };

 export  async function checkUserExists(email: string): Promise<UserExistenceResult> {
    try {
      const usersRef = firestore().collection('users');
      const query = await usersRef.where('email', '==', email).get();
  
      if (query.empty) {
        return { exist: false, methodRegister: null };
      } else {
        const userDoc = query.docs[0];
        const userData = userDoc.data();
        return {
          exist: true,
          methodRegister: userData.method as 'google' | 'email' | null
        };
      }
    } catch (error) {
      console.error("Error checking user existence in Firestore:", error);
      throw error;
    }
  }