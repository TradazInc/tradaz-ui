"use client";
import React, { useState, useRef } from "react";
import { Box, Flex, Text, Icon, Button, HStack, VStack, Textarea } from "@chakra-ui/react";
import { 
    LuFileText, LuEye, LuPenTool, LuCloudUpload, 
    LuBold, LuItalic, LuList, LuLink, LuClock, LuCheck
} from "react-icons/lu";
import ReactMarkdown from "react-markdown";

export const ConditionsEditor = () => {
    // A standard Terms & Conditions template focused on rules of usage, updated with Markdown
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
    
    // Reference to the textarea to track cursor position
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // --- FORMATTING LOGIC ---
    const applyFormatting = (prefix: string, suffix: string = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        
        const newText = content.substring(0, start) + prefix + selectedText + suffix + content.substring(end);
        setContent(newText);

        // Put focus back into the textarea and highlight the text inside the formatting
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
        <Box w="full" display="flex" flexDirection="column" position="relative">
            
            <Box 
                position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} 
                bg="rgba(11, 13, 20, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} 
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4}>
                    <Box>
                        <Text color="#5cac7d" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2}>
                            <Icon as={LuFileText} /> Terms & Conditions
                        </Text>
                        <Text color="gray.400" fontSize="sm">Manage the specific rules and conditions for using your platform.</Text>
                    </Box>
                    
                    <HStack gap={3}>
                        <VStack align="flex-end" gap={0} display={{ base: "none", sm: "flex" }} mr={2}>
                            <Text color="gray.500" fontSize="xs" fontWeight="bold" textTransform="uppercase">Last Published</Text>
                            <Flex align="center" gap={1} color={lastPublished === "Never" ? "orange.400" : "gray.300"}>
                                <Icon as={lastPublished === "Never" ? LuClock : LuCheck} boxSize="12px" />
                                <Text fontSize="sm" fontWeight="bold">{lastPublished}</Text>
                            </Flex>
                        </VStack>
                        <Button 
                            bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} h="44px" px={6} 
                            onClick={handlePublish} 
                            loading={isPublishing} 
                            loadingText="Publishing..."
                        >
                            <Icon as={LuCloudUpload} mr={2} /> Publish Live
                        </Button>
                    </HStack>
                </Flex>
            </Box>

            <Box bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100" overflow="hidden" mb={8} display="flex" flexDirection="column" shadow="sm">
                
                <Flex bg="#121214" borderBottom="1px solid" borderColor="whiteAlpha.100" justify="space-between" align="center" px={4} py={3} wrap="wrap" gap={4}>
                    
                    <Flex bg="whiteAlpha.50" p={1} rounded="lg">
                        <Button 
                            size="sm" variant="ghost" rounded="md" px={4}
                            bg={viewMode === "edit" ? "whiteAlpha.200" : "transparent"} 
                            color={viewMode === "edit" ? "white" : "gray.400"}
                            _hover={{ bg: "whiteAlpha.200" }}
                            onClick={() => setViewMode("edit")}
                        >
                            <Icon as={LuPenTool} mr={2} /> Write
                        </Button>
                        <Button 
                            size="sm" variant="ghost" rounded="md" px={4}
                            bg={viewMode === "preview" ? "whiteAlpha.200" : "transparent"} 
                            color={viewMode === "preview" ? "white" : "gray.400"}
                            _hover={{ bg: "whiteAlpha.200" }}
                            onClick={() => setViewMode("preview")}
                        >
                            <Icon as={LuEye} mr={2} /> Preview
                        </Button>
                    </Flex>

                    {/* LIVE FORMATTING BUTTONS */}
                    {viewMode === "edit" && (
                        <HStack gap={1} color="gray.400" display={{ base: "none", md: "flex" }}>
                            <Button size="sm" variant="ghost" px={2} _hover={{ color: "white", bg: "whiteAlpha.200" }} onClick={() => applyFormatting("**", "**")}><Icon as={LuBold} /></Button>
                            <Button size="sm" variant="ghost" px={2} _hover={{ color: "white", bg: "whiteAlpha.200" }} onClick={() => applyFormatting("*", "*")}><Icon as={LuItalic} /></Button>
                            <Box w="1px" h="20px" bg="whiteAlpha.200" mx={1} />
                            <Button size="sm" variant="ghost" px={2} _hover={{ color: "white", bg: "whiteAlpha.200" }} onClick={() => applyFormatting("- ")}><Icon as={LuList} /></Button>
                            <Button size="sm" variant="ghost" px={2} _hover={{ color: "white", bg: "whiteAlpha.200" }} onClick={() => applyFormatting("[", "](https://)")}><Icon as={LuLink} /></Button>
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
                            bg="transparent" color="gray.300" fontSize="md" lineHeight="tall"
                            border="none" rounded="none" resize="vertical"
                            _focus={{ outline: "none", boxShadow: "none", bg: "whiteAlpha.50" }}
                            css={{ '&::-webkit-scrollbar': { width: '8px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '10px' } }}
                        />
                    ) : (
                        <Box 
                            w="full" minH="500px" p={8} bg="#121214" color="gray.300" fontSize="md" lineHeight="tall"
                            css={{
                                '& h2': { fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '16px', marginTop: '24px' },
                                '& h3': { fontSize: '18px', fontWeight: 'bold', color: '#5cac7d', marginBottom: '8px', marginTop: '24px' },
                                '& p': { marginBottom: '16px' },
                                '& ul': { paddingLeft: '24px', marginBottom: '16px', listStyleType: 'disc' },
                                '& strong': { color: 'white', fontWeight: 'bold' },
                                '& a': { color: '#5cac7d', textDecoration: 'underline' }
                            }}
                        >
                            {content ? <ReactMarkdown>{content}</ReactMarkdown> : <Text color="gray.600" fontStyle="italic">Nothing to preview. Switch to &apos;Write&apos; mode to start typing.</Text>}
                        </Box>
                    )}
                </Box>
                
                <Flex bg="#121214" borderTop="1px solid" borderColor="whiteAlpha.100" justify="space-between" align="center" px={6} py={3}>
                    <Text color="gray.500" fontSize="xs">
                        {content.split(/\s+/).filter(word => word.length > 0).length} words
                    </Text>
                    <Text color="gray.500" fontSize="xs">
                        Supports Markdown formatting (**bold**, *italic*, - lists)
                    </Text>
                </Flex>
            </Box>

        </Box>
    );
};