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
        backgroundColor: "#0A0A0A", color: "white", height: "44px", padding: "0 12px",
        borderRadius: "0px", border: "1px solid #333333", cursor: "pointer", outline: "none", fontSize: "14px"
    };

    return (
        <Box w="full" h="calc(100vh - 120px)" minH="600px" display="flex" bg="#000000" rounded="none" border="1px solid" borderColor="#1A1A1A" overflow="hidden">
            
            {/* LEFT PANE*/}
            <Box 
                w={{ base: "full", md: "350px", lg: "400px" }} 
                borderRight={{ base: "none", md: "1px solid" }} borderColor="#1A1A1A"
                display={{ base: activeChatId ? "none" : "flex", md: "flex" }} 
                flexDirection="column" bg="#0A0A0A"
            >
                {/* Inbox Header & Filters */}
                <Box p={4} borderBottom="1px solid" borderColor="#1A1A1A">
                    <Text color="white" fontWeight="black" fontSize="xl" mb={4} display="flex" alignItems="center" gap={2} letterSpacing="tight">
                        <Icon as={LuMessageSquare} color="white" /> Customer Support
                    </Text>
                    
                    <VStack gap={3}>
                        <Flex align="center" bg="#111111" border="1px solid" borderColor="#333333" rounded="none" px={3} h="44px" w="full" _focusWithin={{ borderColor: "white" }}>
                            <Icon as={LuSearch} color="#888888" boxSize="16px" mr={2} strokeWidth="2.5" />
                            <Input 
                                placeholder="Search customers..." 
                                border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="full" px={0} fontSize="sm"
                                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Flex>
                        
                        <Flex w="full" gap={2}>
                            <select style={{ ...selectStyles, flex: 1 }} value={statusFilter} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as "All" | "Unread" | "Pending" | "Replied")}>
                                <option value="All" style={{ background: "#0A0A0A" }}>All Chats</option>
                                <option value="Unread" style={{ background: "#0A0A0A" }}>Unread First</option>
                                <option value="Pending" style={{ background: "#0A0A0A" }}>Pending</option>
                                <option value="Replied" style={{ background: "#0A0A0A" }}>Replied</option>
                            </select>
                        </Flex>
                    </VStack>
                </Box>

                {/* Inbox List */}
                <Box flex={1} overflowY="auto" css={{ '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                    {filteredChats.length === 0 ? (
                        <Text color="#888888" fontSize="sm" textAlign="center" mt={10} fontWeight="bold">No chats found.</Text>
                    ) : (
                        filteredChats.map(chat => {
                            const isSelected = chat.id === activeChatId;
                            const isUnread = chat.status === "Unread";
                            const lastMsg = chat.messages[chat.messages.length - 1]?.text || "";

                            return (
                                <Box 
                                    key={chat.id} p={4} cursor="pointer"
                                    bg={isSelected ? "#111111" : "transparent"}
                                    borderBottom="1px solid" borderColor="#1A1A1A"
                                    _hover={{ bg: "#111111" }}
                                    transition="all 0.2s"
                                    onClick={() => handleChatSelect(chat.id)}
                                >
                                    <Flex justify="space-between" mb={1}>
                                        <HStack gap={3}>
                                            <Flex align="center" justify="center" boxSize="32px" rounded="full" bg="#1A1A1A" border="1px solid" borderColor={isSelected ? "white" : "#333333"} color="white" fontWeight="bold" fontSize="sm" flexShrink={0}>
                                                {chat.customerName.charAt(0).toUpperCase()}
                                            </Flex>
                                            <Box>
                                                <Text color="white" fontSize="sm" fontWeight={isUnread ? "bold" : "medium"} letterSpacing="tight">{chat.customerName}</Text>
                                                <Text color="#888888" fontSize="xs">{chat.lastMessageTime}</Text>
                                            </Box>
                                        </HStack>
                                        
                                        {/* Status Indicators */}
                                        {chat.status === "Unread" && <Box boxSize="8px" rounded="none" bg="orange.400" mt={1} />}
                                        {chat.status === "Pending" && <Icon as={LuClock} color="#888888" mt={1} strokeWidth="2.5" />}
                                        {chat.status === "Replied" && <Icon as={LuCheck} color="#5cac7d" mt={1} strokeWidth="2.5" />}
                                    </Flex>
                                
                                    <Text color={isUnread ? "white" : "#888888"} fontSize="xs" lineClamp={2} mt={2} fontWeight={isUnread ? "bold" : "normal"}>
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
                flexDirection="column" bg="#000000"
            >
                {!activeChat ? (
                    <Flex flex={1} justify="center" align="center" direction="column" color="#888888" border="1px dashed #1A1A1A" m={4}>
                        <Icon as={LuCircleDashed} boxSize="40px" mb={4} opacity={0.5} />
                        <Text fontWeight="bold">Select a conversation from the left to start chatting.</Text>
                    </Flex>
                ) : (
                    <>
                        {/* Chat Window Header */}
                        <Flex justify="space-between" align="center" p={4} borderBottom="1px solid" borderColor="#1A1A1A" bg="#0A0A0A">
                            <HStack gap={3}>
                                {/* Mobile Back Button */}
                                <Button size="sm" variant="ghost" color="#888888" rounded="none" display={{ md: "none" }} onClick={() => setActiveChatId(null)} px={2} mr={1} _hover={{ bg: "#111111", color: "white" }}>
                                    <Icon as={LuArrowLeft} boxSize="20px" strokeWidth="2.5" />
                                </Button>
                            
                                <Flex align="center" justify="center" boxSize="32px" rounded="full" bg="#1A1A1A" border="1px solid #333333" color="white" fontWeight="bold" fontSize="sm" flexShrink={0}>
                                    {activeChat.customerName.charAt(0).toUpperCase()}
                                </Flex>
                                <Box>
                                    <Text color="white" fontWeight="bold" letterSpacing="tight">{activeChat.customerName}</Text>
                                    <Text color="#888888" fontSize="xs">{activeChat.customerEmail}</Text>
                                </Box>
                            </HStack>
                            <Badge 
                                bg={activeChat.status === "Replied" ? "rgba(92, 172, 125, 0.1)" : activeChat.status === "Unread" ? "rgba(237, 137, 54, 0.1)" : "#111111"} 
                                color={activeChat.status === "Replied" ? "#5cac7d" : activeChat.status === "Unread" ? "orange.400" : "#888888"} 
                                border="1px solid"
                                borderColor={activeChat.status === "Replied" ? "rgba(92, 172, 125, 0.3)" : activeChat.status === "Unread" ? "rgba(237, 137, 54, 0.3)" : "#333333"}
                                px={3} py={1} rounded="none" textTransform="uppercase" letterSpacing="wider" fontSize="10px" fontWeight="bold"
                            >
                                {activeChat.status}
                            </Badge>
                        </Flex>

                        {/* Chat Messages Area */}
                        <Box flex={1} overflowY="auto" p={6} css={{ '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}>
                            <VStack gap={4} align="stretch">
                                {activeChat.messages.map((msg) => {
                                    const isAdmin = msg.sender === "Admin";
                                    return (
                                        <Flex key={msg.id} justify={isAdmin ? "flex-end" : "flex-start"} w="full">
                                            <Box maxW="70%">
                                                <Box 
                                                    bg={isAdmin ? "white" : "#111111"} 
                                                    border="1px solid" borderColor={isAdmin ? "white" : "#333333"}
                                                    color={isAdmin ? "black" : "white"}
                                                    p={4} rounded="none"
                                                >
                                                    <Text fontSize="sm" lineHeight="tall" fontWeight={isAdmin ? "600" : "normal"}>{msg.text}</Text>
                                                </Box>
                                                <Text color="#888888" fontSize="11px" mt={1.5} textAlign={isAdmin ? "right" : "left"} fontWeight="bold">
                                                    {msg.timestamp}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    );
                                })}
                            </VStack>
                        </Box>

                        {/* Chat Input Area */}
                        <Flex p={4} borderTop="1px solid" borderColor="#1A1A1A" bg="#0A0A0A" align="flex-end" gap={3}>
                            <Textarea 
                                value={replyText} onChange={(e) => setReplyText(e.target.value)}
                                placeholder={`Reply to ${activeChat.customerName}...`}
                                bg="#111111" border="1px solid" borderColor="#333333" color="white"
                                _focus={{ borderColor: "white", boxShadow: "none" }} _hover={{ borderColor: "#555555" }}
                                rounded="none" resize="none" minH="50px" maxH="150px" py={3} px={4}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendReply(); }
                                }}
                            />
                            
                            <Button bg="white" color="black" _hover={{ bg: "#E5E5E5" }} h="50px" w="50px" rounded="none" onClick={handleSendReply} disabled={!replyText.trim()} border="none">
                                <Icon as={LuSend} strokeWidth="2.5" />
                            </Button>
                        </Flex>
                    </>
                )}
            </Box>
        </Box>
    );
};