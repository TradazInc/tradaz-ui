"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Icon, Input, Button, HStack, VStack, Textarea, Badge } from "@chakra-ui/react";
import { 
    LuSearch, LuSend, LuMessageSquare, LuArrowLeft, 
    LuCheck, LuClock, LuCircleDashed
} from "react-icons/lu";

import { generateDummyChats } from "@/app/lib/data";
import { CustomerChat } from "@/app/lib/definitions";

export const ChatManager = () => {
    const [chats, setChats] = useState<CustomerChat[]>(generateDummyChats());
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"All" | "Unread" | "Pending" | "Replied">("All");
    const [replyText, setReplyText] = useState("");

    // --- FILTERING ---
    const filteredChats = chats.filter(c => {
        const matchesSearch = c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              c.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const activeChat = chats.find(c => c.id === activeChatId);

    // --- ACTIONS ---
    const handleChatSelect = (id: string) => {
        setActiveChatId(id);
        // If it was completely unread, mark it as pending (seen but not replied)
        setChats(prev => prev.map(c => 
            c.id === id && c.status === "Unread" ? { ...c, status: "Pending" } : c
        ));
    };

    const handleSendReply = () => {
        if (!replyText.trim() || !activeChatId) return;

        const newMessage = {
            id: `M-${Date.now()}`,
            sender: "Admin" as const,
            text: replyText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChats(prev => prev.map(chat => {
            if (chat.id === activeChatId) {
                return {
                    ...chat,
                    status: "Replied",
                    lastMessageTime: "Just now",
                    messages: [...chat.messages, newMessage]
                };
            }
            return chat;
        }));
        setReplyText("");
    };

    const selectStyles = {
        backgroundColor: "#121214", color: "white", height: "40px", padding: "0 12px",
        borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.16)", cursor: "pointer", outline: "none", fontSize: "14px"
    };

    return (
        <Box w="full" h="calc(100vh - 120px)" minH="600px" display="flex" bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden">
            
            
            {/* LEFT PANE*/}
            
            <Box 
                w={{ base: "full", md: "350px", lg: "400px" }} 
                borderRight={{ base: "none", md: "1px solid" }} borderColor="whiteAlpha.100"
                display={{ base: activeChatId ? "none" : "flex", md: "flex" }} 
                flexDirection="column" bg="#121214"
            >
                {/* Inbox Header & Filters */}
                <Box p={4} borderBottom="1px solid" borderColor="whiteAlpha.100">
                    <Text color="white" fontWeight="black" fontSize="xl" mb={4} display="flex" alignItems="center" gap={2}>
                        <Icon as={LuMessageSquare} color="#5cac7d" /> Customer Support
                    </Text>
                    
                    <VStack gap={3}>
                        <Flex align="center" bg="#1A1C23" border="1px solid" borderColor="whiteAlpha.200" rounded="lg" px={3} h="40px" w="full" _focusWithin={{ borderColor: "#5cac7d" }}>
                            <Icon as={LuSearch} color="gray.400" boxSize="14px" mr={2} />
                            <Input 
                                placeholder="Search customers..." 
                                border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" px={0} fontSize="sm"
                                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Flex>
                        
                        <Flex w="full" gap={2}>
                        
                            <select style={{ ...selectStyles, flex: 1 }} value={statusFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as "All" | "Unread" | "Pending" | "Replied")}>
                                <option value="All">All Chats</option>
                                <option value="Unread">Unread First</option>
                                <option value="Pending">Pending</option>
                                <option value="Replied">Replied</option>
                            </select>
                        </Flex>
                    </VStack>
                </Box>

                {/* Inbox List */}
                <Box flex={1} overflowY="auto" css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)' } }}>
                    {filteredChats.length === 0 ? (
                        <Text color="gray.500" fontSize="sm" textAlign="center" mt={10}>No chats found.</Text>
                    ) : (
                        filteredChats.map(chat => {
                            const isSelected = chat.id === activeChatId;
                            const isUnread = chat.status === "Unread";
                            const lastMsg = chat.messages[chat.messages.length - 1]?.text || "";

                            return (
                                <Box 
                                    key={chat.id} p={4} cursor="pointer"
                                    bg={isSelected ? "whiteAlpha.100" : "transparent"}
                                    borderBottom="1px solid" borderColor="whiteAlpha.50"
                                    _hover={{ bg: "whiteAlpha.50" }}
                                    onClick={() => handleChatSelect(chat.id)}
                                >
                                    <Flex justify="space-between" mb={1}>
                                        <HStack gap={3}>
                                            
                                            <Flex align="center" justify="center" boxSize="32px" rounded="full" bg="#5cac7d" color="white" fontWeight="bold" fontSize="sm" flexShrink={0}>
                                                {chat.customerName.charAt(0).toUpperCase()}
                                            </Flex>
                                            <Box>
                                                <Text color="white" fontSize="sm" fontWeight={isUnread ? "bold" : "medium"}>{chat.customerName}</Text>
                                                <Text color="gray.500" fontSize="xs">{chat.lastMessageTime}</Text>
                                            </Box>
                                        </HStack>
                                        
                                        {/* Status Indicators */}
                                        {chat.status === "Unread" && <Box boxSize="8px" rounded="full" bg="orange.400" mt={1} />}
                                        {chat.status === "Pending" && <Icon as={LuClock} color="gray.400" mt={1} />}
                                        {chat.status === "Replied" && <Icon as={LuCheck} color="#5cac7d" mt={1} />}
                                    </Flex>
                                
                                    <Text color={isUnread ? "gray.300" : "gray.500"} fontSize="xs" lineClamp={2} mt={2}>
                                        {lastMsg}
                                    </Text>
                                </Box>
                            );
                        })
                    )}
                </Box>
            </Box>

            
            {/* RIGHT PANE */}
            
            <Box 
                flex={1} display={{ base: activeChatId ? "flex" : "none", md: "flex" }} 
                flexDirection="column" bg="#1A1C23"
            >
                {!activeChat ? (
                    <Flex flex={1} justify="center" align="center" direction="column" color="gray.500">
                        <Icon as={LuCircleDashed} boxSize="40px" mb={4} opacity={0.5} />
                        <Text>Select a conversation from the left to start chatting.</Text>
                    </Flex>
                ) : (
                    <>
                        {/* Chat Window Header */}
                        <Flex justify="space-between" align="center" p={4} borderBottom="1px solid" borderColor="whiteAlpha.100" bg="rgba(11, 13, 20, 0.5)">
                            <HStack gap={3}>
                                {/* Mobile Back Button */}
                                <Button size="sm" variant="ghost" color="gray.400" display={{ md: "none" }} onClick={() => setActiveChatId(null)} px={2} mr={1}>
                                    <Icon as={LuArrowLeft} boxSize="20px" />
                                </Button>
                            
                                <Flex align="center" justify="center" boxSize="32px" rounded="full" bg="#5cac7d" color="white" fontWeight="bold" fontSize="sm" flexShrink={0}>
                                    {activeChat.customerName.charAt(0).toUpperCase()}
                                </Flex>
                                <Box>
                                    <Text color="white" fontWeight="bold">{activeChat.customerName}</Text>
                                    <Text color="gray.500" fontSize="xs">{activeChat.customerEmail}</Text>
                                </Box>
                            </HStack>
                            <Badge bg={activeChat.status === "Replied" ? "rgba(92, 172, 125, 0.15)" : activeChat.status === "Unread" ? "rgba(237, 137, 54, 0.15)" : "whiteAlpha.100"} color={activeChat.status === "Replied" ? "#5cac7d" : activeChat.status === "Unread" ? "orange.400" : "gray.400"} px={3} py={1} rounded="md">
                                {activeChat.status}
                            </Badge>
                        </Flex>

                        {/* Chat Messages Area */}
                        <Box flex={1} overflowY="auto" p={6} css={{ '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}>
                            <VStack gap={4} align="stretch">
                                {activeChat.messages.map((msg) => {
                                    const isAdmin = msg.sender === "Admin";
                                    return (
                                        <Flex key={msg.id} justify={isAdmin ? "flex-end" : "flex-start"} w="full">
                                            <Box maxW="70%">
                                                <Box 
                                                    bg={isAdmin ? "rgba(92, 172, 125, 0.15)" : "whiteAlpha.50"} 
                                                    border="1px solid" borderColor={isAdmin ? "rgba(92, 172, 125, 0.3)" : "whiteAlpha.100"}
                                                    color={isAdmin ? "#5cac7d" : "gray.200"}
                                                    p={3} rounded="xl" borderBottomRightRadius={isAdmin ? "0px" : "xl"} borderTopLeftRadius={isAdmin ? "xl" : "0px"}
                                                >
                                                    <Text fontSize="sm" lineHeight="tall">{msg.text}</Text>
                                                </Box>
                                                <Text color="gray.600" fontSize="xs" mt={1} textAlign={isAdmin ? "right" : "left"}>
                                                    {msg.timestamp}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    );
                                })}
                            </VStack>
                        </Box>

                        {/* Chat Input Area */}
                        <Flex p={4} borderTop="1px solid" borderColor="whiteAlpha.100" bg="#121214" align="flex-end" gap={3}>
                            <Textarea 
                                value={replyText} onChange={(e) => setReplyText(e.target.value)}
                                placeholder={`Reply to ${activeChat.customerName}...`}
                                bg="whiteAlpha.50" border="1px solid" borderColor="whiteAlpha.100" color="white"
                                _focus={{ borderColor: "#5cac7d", boxShadow: "none", bg: "whiteAlpha.100" }}
                                rounded="xl" resize="none" minH="50px" maxH="150px" py={3}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendReply(); }
                                }}
                            />
                            
                            <Button bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} h="50px" w="50px" rounded="xl" onClick={handleSendReply} disabled={!replyText.trim()}>
                                <Icon as={LuSend} />
                            </Button>
                        </Flex>
                    </>
                )}
            </Box>
        </Box>
    );
};