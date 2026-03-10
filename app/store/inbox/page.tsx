"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, IconButton, VStack, HStack, Badge, Avatar 
} from "@chakra-ui/react";
import { 
    LuSend, LuSearch, LuEllipsisVertical, LuPackage 
} from "react-icons/lu";

// ✅ Import types and data from your modular library
import { Message, ChatSession } from "@/app/lib/definitions";
import { MOCK_CHATS, MOCK_MESSAGES } from "@/app/lib/data";

export default function InboxPage() {
    const brandColor = "#5cac7d";
    
    // --- STATE ---
    const [selectedChat, setSelectedChat] = useState<ChatSession>(MOCK_CHATS[0]);
    const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logic: Keeps the latest message in view
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (!input.trim()) return;
        
        const newMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        // API-READY: Trigger your POST /api/messages or socket.emit here
    };

    return (
        <Flex h="calc(100vh - 120px)" maxW="1200px" mx="auto" bg="#1A1C23" rounded="2xl" overflow="hidden" border="1px solid" borderColor="whiteAlpha.100">
            
            {/* --- LEFT SIDEBAR: Conversation List --- */}
            <Box w={{ base: "80px", md: "350px" }} borderRight="1px solid" borderColor="whiteAlpha.100" display="flex" flexDirection="column">
                <Box p={4} borderBottom="1px solid" borderColor="whiteAlpha.50">
                    <Text display={{ base: "none", md: "block" }} fontSize="xl" fontWeight="black" color="white" mb={4}>Disputes</Text>
                    <Flex bg="#121212" p={2} rounded="lg" align="center" display={{ base: "none", md: "flex" }}>
                        <Icon as={LuSearch} color="gray.500" mr={2} />
                        <Input variant="subtle" border="none" placeholder="Search orders..." color="white" fontSize="sm" _focus={{ boxShadow: "none" }} />
                    </Flex>
                </Box>

                <VStack flex={1} overflowY="auto" gap={0} align="stretch" py={2}>
                    {MOCK_CHATS.map((chat) => (
                        <Flex 
                            key={chat.id} p={4} cursor="pointer" align="center" gap={3}
                            bg={selectedChat.id === chat.id ? "whiteAlpha.100" : "transparent"}
                            _hover={{ bg: "whiteAlpha.50" }}
                            onClick={() => setSelectedChat(chat)}
                        >
                        
                            <Avatar.Root size="sm">
                                <Avatar.Fallback name={chat.orderName}>
                                    <LuPackage />
                                </Avatar.Fallback>
                                <Avatar.Image src="https://bit.ly/sage-adebayo" />
                            </Avatar.Root>

                            <Box display={{ base: "none", md: "block" }} flex={1}>
                                <Flex justify="space-between" align="center">
                                    <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1}>{chat.orderName}</Text>
                                    {chat.unread && <Box boxSize="8px" bg={brandColor} rounded="full" />}
                                </Flex>
                                <Text color="gray.500" fontSize="xs" lineClamp={1}>{chat.lastMessage}</Text>
                            </Box>
                        </Flex>
                    ))}
                </VStack>
            </Box>

            {/* --- RIGHT SIDE: Chat Window --- */}
            <Flex flex={1} direction="column" bg="#121212">
                
                {/* Chat Header */}
                <Flex p={4} borderBottom="1px solid" borderColor="whiteAlpha.100" justify="space-between" align="center" bg="#1A1C23">
                    <Box>
                        <Text color="white" fontWeight="bold" fontSize="md">{selectedChat.orderName}</Text>
                        <HStack gap={2}>
                            <Badge colorScheme={selectedChat.status === 'active' ? "green" : "gray"} variant="subtle" fontSize="10px">
                                {selectedChat.status.toUpperCase()}
                            </Badge>
                            <Text color="gray.500" fontSize="xs">Order ID: {selectedChat.id}</Text>
                        </HStack>
                    </Box>
                    <IconButton aria-label="More options" variant="ghost" color="gray.400" rounded="full" size="sm">
                        <LuEllipsisVertical />
                    </IconButton>
                </Flex>

                {/* Messages Body */}
                <Box flex={1} overflowY="auto" p={6} ref={scrollRef}>
                    <VStack gap={4} align="stretch">
                        {messages.map((msg) => (
                            <Flex key={msg.id} justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
                                <Box maxW="75%">
                                    <Box 
                                        p={3} rounded="2xl" 
                                        bg={msg.sender === 'user' ? brandColor : "#1A1C23"} 
                                        color="white"
                                        borderBottomRightRadius={msg.sender === 'user' ? "4px" : "2xl"}
                                        borderBottomLeftRadius={msg.sender === 'admin' ? "4px" : "2xl"}
                                    >
                                        <Text fontSize="sm">{msg.text}</Text>
                                    </Box>
                                    <Text fontSize="10px" color="gray.500" mt={1} textAlign={msg.sender === 'user' ? 'right' : 'left'}>
                                        {msg.timestamp}
                                    </Text>
                                </Box>
                            </Flex>
                        ))}
                    </VStack>
                </Box>

                {/* Input Area */}
                <Box p={4} borderTop="1px solid" borderColor="whiteAlpha.100">
                    <Flex gap={2}>
                        <Input 
                            placeholder="Type your dispute details..." bg="#1A1C23" border="none" color="white" 
                            _focus={{ ring: "1px solid", ringColor: brandColor, boxShadow: "none" }}
                            value={input} onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button bg={brandColor} color="white" _hover={{ filter: "brightness(1.1)" }} onClick={handleSendMessage}>
                            <Icon as={LuSend} />
                        </Button>
                    </Flex>
                    <Text fontSize="10px" color="gray.600" mt={2} textAlign="center">
                        Admin usually responds within 24 hours.
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
}