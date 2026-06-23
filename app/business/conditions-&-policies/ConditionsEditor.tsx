"use client";
import React, { useState, useRef } from "react";
import { Box, Flex, Text, Icon, Button, HStack, VStack, Textarea } from "@chakra-ui/react";
import { 
    LuFileText, LuEye, LuPenTool, LuCloudUpload, 
    LuBold, LuItalic, LuList, LuLink, LuClock, LuCheck
} from "react-icons/lu";
import ReactMarkdown from "react-markdown";

export const ConditionsEditor = () => {
    const defaultTemplate = `## Terms & Conditions

**Last Updated:** March 2026

### 1. GENERAL CONDITIONS
We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.

### 2. INTELLECTUAL PROPERTY
All content included on this site, such as text, graphics, logos, button icons, images, and software, is the property of Tradaz or its content suppliers and protected by international copyright laws.

### 3. PROHIBITED USES
In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: 
* (a) for any unlawful purpose; 
* (b) to solicit others to perform or participate in any unlawful acts; 
* (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances.

### 4. ACCURACY OF BILLING AND ACCOUNT INFORMATION
We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. 

### 5. TERMINATION
The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.`;

    const [content, setContent] = useState(defaultTemplate);
    const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
    const [lastPublished, setLastPublished] = useState<string>("Never");
    const [isPublishing, setIsPublishing] = useState(false);
    
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const applyFormatting = (prefix: string, suffix: string = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        
        const newText = content.substring(0, start) + prefix + selectedText + suffix + content.substring(end);
        setContent(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };
    
    const handlePublish = () => {
        setIsPublishing(true);
        setTimeout(() => {
            setIsPublishing(false);
            const now = new Date();
            setLastPublished(now.toLocaleDateString() + " at " + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
            alert("Terms & Conditions successfully published to your live website!");
        }, 1500);
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
            
            {/* --- Sticky Header --- */}
            <Box 
                position="sticky" top={{ base: "-16px", md: "-32px" }} mx={{ base: "-16px", md: "-32px" }} px={{ base: "16px", md: "32px" }}
                zIndex={20} bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} borderBottom="1px solid #1A1A1A"
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="white" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2} letterSpacing="tight">
                            <Icon as={LuFileText} color="#5cac7d" strokeWidth="2.5" /> Terms & Conditions
                        </Text>
                        <Text color="#888888" fontSize="sm">Manage the specific rules and conditions for using your platform.</Text>
                    </Box>
                    
                    <HStack gap={4}>
                        <VStack align="flex-end" gap={0} display={{ base: "none", sm: "flex" }}>
                            <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Last Published</Text>
                            <Flex align="center" gap={1.5} mt={0.5}>
                                <Icon 
                                    as={lastPublished === "Never" ? LuClock : LuCheck} 
                                    color={lastPublished === "Never" ? "orange.400" : "#5cac7d"} 
                                    boxSize="14px" strokeWidth="2.5" 
                                />
                                <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight">{lastPublished}</Text>
                            </Flex>
                        </VStack>
                        <Button 
                            bg="white" color="black" rounded="none" border="none" _hover={{ bg: "#E5E5E5" }} h="44px" px={6} fontWeight="bold"
                            onClick={handlePublish} 
                            loading={isPublishing} 
                            loadingText="Publishing..."
                        >
                            <Icon as={LuCloudUpload} color="#5cac7d" mr={2} strokeWidth="2.5" /> Publish Live
                        </Button>
                    </HStack>
                </Flex>
            </Box>

            {/* --- EDITOR WORKSPACE --- */}
            <Box bg="#000000" rounded="none" border="1px solid" borderColor="#1A1A1A" overflow="hidden" mb={8} display="flex" flexDirection="column">
                
                <Flex bg="#0A0A0A" borderBottom="1px solid" borderColor="#1A1A1A" justify="space-between" align="center" px={4} py={3} wrap="wrap" gap={4}>
                    
                    <Flex bg="#000000" border="1px solid #333333" p={1} rounded="none" gap={1}>
                        <Button 
                            size="sm" variant="ghost" rounded="none" px={4} h="32px"
                            bg={viewMode === "edit" ? "#111111" : "transparent"} 
                            color={viewMode === "edit" ? "white" : "#888888"}
                            border={viewMode === "edit" ? "1px solid #333333" : "1px solid transparent"}
                            _hover={{ bg: "#111111", color: "white" }}
                            onClick={() => setViewMode("edit")}
                        >
                            <Icon as={LuPenTool} mr={2} strokeWidth="2.5" /> Write
                        </Button>
                        <Button 
                            size="sm" variant="ghost" rounded="none" px={4} h="32px"
                            bg={viewMode === "preview" ? "#111111" : "transparent"} 
                            color={viewMode === "preview" ? "white" : "#888888"}
                            border={viewMode === "preview" ? "1px solid #333333" : "1px solid transparent"}
                            _hover={{ bg: "#111111", color: "white" }}
                            onClick={() => setViewMode("preview")}
                        >
                            <Icon as={LuEye} mr={2} strokeWidth="2.5" /> Preview
                        </Button>
                    </Flex>

                    {/* LIVE FORMATTING BUTTONS */}
                    {viewMode === "edit" && (
                        <HStack gap={1} color="#888888" display={{ base: "none", md: "flex" }}>
                            <Button size="sm" h="32px" variant="ghost" rounded="none" px={2} _hover={{ color: "white", bg: "#111111" }} onClick={() => applyFormatting("**", "**")}><Icon as={LuBold} strokeWidth="2.5" /></Button>
                            <Button size="sm" h="32px" variant="ghost" rounded="none" px={2} _hover={{ color: "white", bg: "#111111" }} onClick={() => applyFormatting("*", "*")}><Icon as={LuItalic} strokeWidth="2.5" /></Button>
                            <Box w="1px" h="20px" bg="#333333" mx={1} />
                            <Button size="sm" h="32px" variant="ghost" rounded="none" px={2} _hover={{ color: "white", bg: "#111111" }} onClick={() => applyFormatting("- ")}><Icon as={LuList} strokeWidth="2.5" /></Button>
                            <Button size="sm" h="32px" variant="ghost" rounded="none" px={2} _hover={{ color: "white", bg: "#111111" }} onClick={() => applyFormatting("[", "](https://)")}><Icon as={LuLink} strokeWidth="2.5" /></Button>
                        </HStack>
                    )}
                </Flex>

                <Box p={0} position="relative" minH="500px">
                    {viewMode === "edit" ? (
                        <Textarea 
                            ref={textareaRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Start writing your conditions here using Markdown..."
                            w="full" minH="500px" p={6}
                            bg="#000000" color="white" fontSize="md" lineHeight="tall"
                            border="none" rounded="none" resize="vertical"
                            _focus={{ outline: "none", boxShadow: "none", bg: "#0A0A0A" }}
                            css={{ '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { background: '#333333', borderRadius: '0px' } }}
                        />
                    ) : (
                        <Box 
                            w="full" minH="500px" p={8} bg="#000000" color="#CCCCCC" fontSize="md" lineHeight="tall"
                            css={{
                                '& h2': { fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '16px', marginTop: '24px', letterSpacing: 'tight' },
                                '& h3': { fontSize: '18px', fontWeight: 'bold', color: 'white', marginBottom: '8px', marginTop: '24px', letterSpacing: 'tight' },
                                '& p': { marginBottom: '16px' },
                                '& ul': { paddingLeft: '24px', marginBottom: '16px', listStyleType: 'disc' },
                                '& strong': { color: 'white', fontWeight: 'bold' },
                                '& a': { color: 'white', textDecoration: 'underline', fontWeight: 'bold' }
                            }}
                        >
                            {content ? <ReactMarkdown>{content}</ReactMarkdown> : <Text color="#888888" fontStyle="italic" fontWeight="bold">Nothing to preview. Switch to &apos;Write&apos; mode to start typing.</Text>}
                        </Box>
                    )}
                </Box>
                
                <Flex bg="#0A0A0A" borderTop="1px solid" borderColor="#1A1A1A" justify="space-between" align="center" px={6} py={3}>
                    <Text color="#888888" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                        {content.split(/\s+/).filter(word => word.length > 0).length} words
                    </Text>
                    <Text color="#888888" fontSize="xs" fontWeight="bold">
                        Supports Markdown formatting (**bold**, *italic*, - lists)
                    </Text>
                </Flex>
            </Box>

        </Box>
    );
};