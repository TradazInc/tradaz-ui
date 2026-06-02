"use client";

import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Chatbox } from "@talkjs/react-components";

import { getTalkSession } from "@talkjs/core";

function Chat() {
  const appId="tixw1Njw";
  const userId="sample_user_alice";
  const otherUserId = 'nina';
  const conversationId="sample_conversation";

   
        
       
  const session = getTalkSession({ appId, userId });

  useEffect(() => {
    session.currentUser.createIfNotExists({ name: 'Frank' });
    session.user(otherUserId).createIfNotExists({ name: 'Nina' });

    const conversation = session.conversation(conversationId);
    conversation.createIfNotExists();
    conversation.participant(otherUserId).createIfNotExists();
  }, [session, conversationId, otherUserId]);

  return (
<Box 
            h="calc(100vh - 120px)" 
            maxW="1200px" 
            mx="auto" 
            rounded="2xl" 
            overflow="hidden" 
            border="1px solid" 
            borderColor="whiteAlpha.100"
        >
            <Chatbox
                style={{ width: '100%', height: '100%' }}
                appId={appId}
                userId={userId}
                conversationId={conversationId}
            />
        </Box>
  );
}

export default Chat;