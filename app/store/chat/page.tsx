"use client";

import React, { useCallback } from "react";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import Talk from "talkjs";
import { Session, Inbox } from "@talkjs/react";


export default function InboxPage() {
  const appId = "tixw1Njw";
  const userId = "sample_user_alice";
  const otherUserId = "nina";
  const conversationId = "sample_conversation";

  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: userId,
        name: "Frank",
        role: "default", 
      }),
    []
  );

  const syncConversation = useCallback(
    (session: Talk.Session) => {
      const otherUser = new Talk.User({
        id: otherUserId,
        name: "Nina",
        role: "default",
      });

      const conversation = session.getOrCreateConversation(conversationId);
      
      conversation.setParticipant(session.me);
      conversation.setParticipant(otherUser);

      return conversation;
    },
    []
  );

  // custom loading spinner 
  const LoadingFallback = (
    <Flex w="full" h="full" align="center" justify="center">
      <Spinner color="#5cac7d" size="xl" />
    </Flex>
  );

  return (
    <Box 
        h="calc(100vh - 120px)" 
      maxW="1400px" 
        w="full"
        mx="auto" 
        rounded="2xl" 
        overflow="hidden" 
        border="1px solid" 
        borderColor="whiteAlpha.100"
        bg="#1A1C23"
        position="relative"
    >
        <Session appId={appId} syncUser={syncUser}>
            <Inbox
                syncConversation={syncConversation}
                style={{ width: '100%', height: '100%',backgroundColor: 'black' }}
                loadingComponent={LoadingFallback} 
               
            />
        </Session>
    </Box>
  );
}