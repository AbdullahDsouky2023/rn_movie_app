//first function get the room or create one if not exist using currentChannelName from order attributes
useEffect(() => {
    const ref = collection(db, 'chatRooms');
    //currentChannelName = EXp : user_15_provider_order_15
    const unsubscribe = onSnapshot(ref, (chatRooms) => {
      const data = chatRooms?.docs?.map((doc) => {
        return {
          ...doc.data(),
          _id: doc.id, // Add a unique ID for GiftedChat
        };
      });

      // Check if the chat room exists
      const chatRoomExists = data.some(room => room.name === currentChannelName);
      if (!chatRoomExists) {
        // If the chat room does not exist, create it
        addDoc(ref, {
          name: currentChannelName,
          createdAt: new Date(),
        }).catch((error) => {
          console.log("Error creating chat room:", error);
        });
      } else {
        const room = data?.filter((room) => room?.name === currentChannelName);
        SetCurrentChatRoom(room);
      }
    });

    return unsubscribe;
  }, [currentChannelName]);
//second function get the messages  collection for this chat rorom
  useEffect(() => {
    if (CurrentChatRoom?.length > 0) {
      const messagesCollection = collection(db, `chatRooms/${CurrentChatRoom[0]?._id}/messages`);
      const unsubscribe = onSnapshot(messagesCollection, (querySnapshot) => {
        const orderedMessages = querySnapshot.docs.sort((a, b) => {
          return a.data().createdAt > b.data().createdAt ? -1 : 1;
        }).map((doc) => ({
          ...doc.data(),
          _id: doc.id,
          createdAt: doc.data().createdAt?.toDate(),
        }));
        setMessages(orderedMessages);
      });

      return unsubscribe;
    }
  }, [CurrentChatRoom]);