"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
    Box, Flex, Text, Input, Button, Icon, IconButton, VStack, HStack, Badge, Avatar, Menu, Portal 
} from "@chakra-ui/react";
import { 
    LuSend, LuSearch, LuEllipsisVertical, LuPackage, LuPaperclip, LuImage, LuMic, LuVideo 
} from "react-icons/lu";

import { Message as BaseMessage, ChatSession } from "@/types/definitions";
import { MOCK_CHATS, MOCK_MESSAGES } from "@/data/data";


export interface ExtendedMessage extends BaseMessage {
    attachment?: {
        type: 'image' | 'video' | 'voice';
        url: string;
    };
}

export default function InboxPage() {
    const brandColor = "#5cac7d";
    
    // --- STATE ---
    const [selectedChat, setSelectedChat] = useState<ChatSession>(MOCK_CHATS[0]);
 
    const [messages, setMessages] = useState<ExtendedMessage[]>(MOCK_MESSAGES as ExtendedMessage[]);
    const [input, setInput] = useState("");
    
    // --- REFS ---
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [acceptType, setAcceptType] = useState<string>("*/*");

    // Auto-scroll 
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // --- REAL FILE UPLOAD LOGIC ---
    const openFilePicker = (type: 'image/*' | 'video/*' | 'audio/*') => {
        setAcceptType(type);
        setTimeout(() => {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        }, 0);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const localPreviewUrl = URL.createObjectURL(file);
        
        let attachmentType: 'image' | 'video' | 'voice' = 'image';
        if (file.type.startsWith('video/')) attachmentType = 'video';
        if (file.type.startsWith('audio/')) attachmentType = 'voice';

        const newMessage: ExtendedMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: "", 
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            attachment: {
                type: attachmentType,
                url: localPreviewUrl 
            }
        };

        setMessages((prev) => [...prev, newMessage]);
        
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSendMessage = () => {
        if (!input.trim()) return;
        
        const newMessage: ExtendedMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput("");
    };

    return (
        <Flex h="calc(100vh - 120px)" maxW="1200px" mx="auto" bg="#1A1C23" rounded="2xl" overflow="hidden" border="1px solid" borderColor="whiteAlpha.100">
          
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept={acceptType}
                onChange={handleFileChange} 
            />

            {/* ---  Conversation List --- */}
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
                            <Avatar.Root size="sm" rounded="full">
                                <Avatar.Fallback name={chat.orderName} bg="#111111" border="1px solid #333333">
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
            <Flex flex={1} direction="column" bg="#000000">
                
                {/* Chat Header */}
                <Flex p={4} borderBottom="1px solid" borderColor="#1A1A1A" justify="space-between" align="center" bg="#0A0A0A">
                    <Box>
                        <Text color="white" fontWeight="bold" fontSize="md">{selectedChat.orderName}</Text>
                        <HStack gap={2}>
                            <Badge colorScheme={selectedChat.status === 'active' ? "green" : "gray"} rounded="none" variant="solid" bg={selectedChat.status === 'active' ? "rgba(92, 172, 125, 0.2)" : "#111111"} color={selectedChat.status === 'active' ? "#5cac7d" : "gray.400"} fontSize="10px" border="1px solid" borderColor={selectedChat.status === 'active' ? "#5cac7d" : "#333333"}>
                                {selectedChat.status.toUpperCase()}
                            </Badge>
                            <Text color="gray.500" fontSize="xs" fontWeight="bold" fontFamily="monospace">ID: {selectedChat.id}</Text>
                        </HStack>
                    </Box>
                    <IconButton aria-label="More options" variant="ghost" color="#888888" rounded="none" size="sm" _hover={{ bg: "#1A1A1A", color: "white" }}>
                        <LuEllipsisVertical strokeWidth="2.5" />
                    </IconButton>
                </Flex>

                {/* Messages Body */}
                <Box flex={1} overflowY="auto" p={6} ref={scrollRef}>
                    <VStack gap={4} align="stretch">
                        {messages.map((msg) => (
                            <Flex key={msg.id} justify={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
                                <Box maxW="75%">
                                    <Box 
                                        p={msg.attachment && msg.attachment.type === 'image' ? 1 : 3} 
                                        rounded="none" 
                                        bg={msg.sender === 'user' ? brandColor : "#111111"} 
                                        color={msg.sender === 'user' ? "black" : "white"}
                                        border="1px solid"
                                        borderColor={msg.sender === 'user' ? brandColor : "#333333"}
                                        borderBottomRightRadius={msg.sender === 'user' ? "0px" : "12px"}
                                        borderBottomLeftRadius={msg.sender === 'admin' ? "0px" : "12px"}
                                        borderTopRightRadius="12px"
                                        borderTopLeftRadius="12px"
                                        overflow="hidden"
                                    >
                                       
                                        {msg.attachment && (
                                            <Box mb={msg.text ? 2 : 0}>
                                                {msg.attachment.type === 'image' && (
                                                    <Image src={msg.attachment.url} alt="Attachment" width={300} height={200} style={{ width: '100%', maxWidth: '300px', display: 'block' }} />
                                                )}
                                                {msg.attachment.type === 'video' && (
                                                    <video src={msg.attachment.url} controls style={{ width: '100%', maxWidth: '300px', display: 'block' }} />
                                                )}
                                                {msg.attachment.type === 'voice' && (
                                                    <audio src={msg.attachment.url} controls style={{ width: '100%', maxWidth: '250px', filter: msg.sender === 'user' ? 'none' : 'invert(1)' }} />
                                                )}
                                            </Box>
                                        )}

                                        {msg.text && <Text fontSize="sm" fontWeight={msg.sender === 'user' ? "bold" : "normal"}>{msg.text}</Text>}
                                    </Box>
                                    <Text fontSize="10px" color="#555555" mt={1} textAlign={msg.sender === 'user' ? 'right' : 'left'} fontWeight="bold">
                                        {msg.timestamp}
                                    </Text>
                                </Box>
                            </Flex>
                        ))}
                    </VStack>
                </Box>

                {/* Input Area */}
                <Box p={4} borderTop="1px solid" borderColor="#1A1A1A" bg="#0A0A0A">
                    <Flex gap={2} align="center">
                        
                        {/* ATTACHMENT MENU */}
                        <Menu.Root>
                            <Menu.Trigger asChild>
                                <IconButton aria-label="Attach File" variant="ghost" color="#888888" _hover={{ color: "white", bg: "#1A1A1A" }} rounded="none" h="44px" w="44px">
                                    <Icon as={LuPaperclip} strokeWidth="2.5" />
                                </IconButton>
                            </Menu.Trigger>
                            <Portal>
                                <Menu.Positioner zIndex={100}>
                                    <Menu.Content bg="#0A0A0A" border="1px solid" borderColor="#333333" rounded="none" shadow="2xl" p={1} minW="150px">
                                        <Menu.Item value="image" onClick={() => openFilePicker('image/*')} px={3} py={2} cursor="pointer" rounded="none" _hover={{ bg: "#1A1A1A" }} color="white">
                                            <Flex align="center" gap={3}>
                                                <Icon as={LuImage} color="blue.400" /> <Text fontSize="sm" fontWeight="bold">Photo</Text>
                                            </Flex>
                                        </Menu.Item>
                                        <Menu.Item value="video" onClick={() => openFilePicker('video/*')} px={3} py={2} cursor="pointer" rounded="none" _hover={{ bg: "#1A1A1A" }} color="white">
                                            <Flex align="center" gap={3}>
                                                <Icon as={LuVideo} color="purple.400" /> <Text fontSize="sm" fontWeight="bold">Video</Text>
                                            </Flex>
                                        </Menu.Item>
                                        <Menu.Item value="voice" onClick={() => openFilePicker('audio/*')} px={3} py={2} cursor="pointer" rounded="none" _hover={{ bg: "#1A1A1A" }} color="white">
                                            <Flex align="center" gap={3}>
                                                <Icon as={LuMic} color="orange.400" /> <Text fontSize="sm" fontWeight="bold">Voice/Audio</Text>
                                            </Flex>
                                        </Menu.Item>
                                    </Menu.Content>
                                </Menu.Positioner>
                            </Portal>
                        </Menu.Root>

                        <Input 
                            placeholder="Type your message..." bg="#000000" border="1px solid #333333" color="white" h="44px" rounded="none"
                            _focus={{ outline: "none", borderColor: "white", boxShadow: "none" }}
                            value={input} onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button bg="white" color="black" rounded="none" h="44px" px={6} _hover={{ bg: "#E5E5E5" }} onClick={handleSendMessage} disabled={!input.trim()}>
                            <Icon as={LuSend} strokeWidth="2.5" />
                        </Button>
                    </Flex>
                    <Text fontSize="10px" color="#555555" mt={2} textAlign="center" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                        Real-time file processing active.
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
}