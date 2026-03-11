"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Input, Button, Icon, Grid, VStack, Badge, SimpleGrid, Textarea
} from "@chakra-ui/react";
import { 
    LuGift, LuCopy, LuCheck, LuCreditCard, LuSend, 
} from "react-icons/lu";

import { GiftCard } from "@/app/lib/definitions";
import { MOCK_GIFT_CARDS } from "@/app/lib/data";

export default function GiftCardsPage() {
    const brandColor = "#5cac7d";
    
    // --- STATE ---
    const [cards] = useState<GiftCard[]>(MOCK_GIFT_CARDS);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [isBuying, setIsBuying] = useState(false);
    
    // Purchase Form State
    const [purchaseAmount, setPurchaseAmount] = useState<number>(10000);
    const [recipientEmail, setRecipientEmail] = useState("");
    const [giftMessage, setGiftMessage] = useState("");

    const PRESET_AMOUNTS = [10000, 25000, 50000, 100000];

    // --- LOGIC HANDLERS ---
    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const handleBuyGiftCard = () => {
        if (!recipientEmail) return alert("Please enter a recipient email.");
        setIsBuying(true);
        
        // API-READY: POST /api/gift-cards/purchase
        setTimeout(() => {
            setIsBuying(false);
            alert(`Successfully purchased a ₦${purchaseAmount.toLocaleString()} gift card for ${recipientEmail}!`);
            setRecipientEmail("");
            setGiftMessage("");
        }, 1500);
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1000px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* Header */}
            <Flex align="center" gap={3} mb={10}>
                <Icon as={LuGift} boxSize="28px" color={brandColor} />
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">
                        Gift Cards
                    </Text>
                    <Text color="gray.400" fontSize="sm">Manage your balances or send the gift of choice.</Text>
                </Box>
            </Flex>

            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={10}>
                
                {/*  Active Cards */}
                <Box>
                    <Text color="white" fontSize="xl" fontWeight="black" mb={6} display="flex" alignItems="center" gap={2}>
                        <Icon as={LuCreditCard} color={brandColor} /> My Wallet
                    </Text>

                    <VStack gap={6} align="stretch">
                        {cards.map((card) => {
                            const isActive = card.status === 'active';
                            const isCopied = copiedCode === card.code;

                            return (
                                <Box 
                                    key={card.id} 
                                    p={6} rounded="2xl" position="relative" overflow="hidden"
                                    bgGradient={isActive ? `linear(to-br, #2A2D35, #121212)` : "linear(to-br, #1A1C23, #121212)"}
                                    border="1px solid" borderColor={isActive ? "whiteAlpha.300" : "whiteAlpha.50"}
                                    shadow={isActive ? "xl" : "none"} opacity={isActive ? 1 : 0.6}
                                >
                                    {/*  Card Decor */}
                                    {isActive && <Box position="absolute" top="-20px" right="-20px" boxSize="100px" bg={brandColor} filter="blur(60px)" opacity={0.3} rounded="full" />}
                                    
                                    <Flex justify="space-between" align="start" mb={8} position="relative" zIndex={2}>
                                        <Box>
                                            <Text color="whiteAlpha.600" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest" mb={1}>
                                                TRADAZ. Card
                                            </Text>
                                            <Text color="white" fontSize="2xl" fontWeight="black" fontFamily="monospace" letterSpacing="widest">
                                                {isActive ? `₦${card.balance.toLocaleString()}` : "₦0"}
                                            </Text>
                                        </Box>
                                        <Badge bg={isActive ? "rgba(92, 172, 125, 0.2)" : "whiteAlpha.100"} color={isActive ? brandColor : "gray.400"} rounded="full" px={3} py={1} border="none">
                                            {card.status.toUpperCase()}
                                        </Badge>
                                    </Flex>

                                    <Flex justify="space-between" align="flex-end" position="relative" zIndex={2}>
                                        <Box>
                                            <Text color="gray.500" fontSize="10px" textTransform="uppercase" mb={1}>Card Code</Text>
                                            <Flex align="center" gap={2}>
                                                <Text color="white" fontFamily="monospace" fontSize="sm">{card.code}</Text>
                                                {isActive && (
                                                    <Icon 
                                                        as={isCopied ? LuCheck : LuCopy} 
                                                        color={isCopied ? brandColor : "gray.400"} 
                                                        cursor="pointer" onClick={() => handleCopy(card.code)} 
                                                        _hover={{ color: "white" }} transition="all 0.2s"
                                                    />
                                                )}
                                            </Flex>
                                        </Box>
                                        <Box textAlign="right">
                                            <Text color="gray.500" fontSize="10px" textTransform="uppercase" mb={1}>Valid Thru</Text>
                                            <Text color="white" fontSize="sm" fontWeight="bold">{card.expiryDate}</Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            );
                        })}
                    </VStack>
                </Box>

                {/*  Buy a Gift Card */}
                <Box bg="#1A1C23" p={8} rounded="3xl" border="1px solid" borderColor="whiteAlpha.100" h="fit-content">
                    <Text color="white" fontSize="xl" fontWeight="black" mb={2} display="flex" alignItems="center" gap={2}>
                         Send a Gift
                    </Text>
                    <Text color="gray.400" fontSize="sm" mb={6}>
                        Select an amount and instantly email a Tradaz digital gift card to a friend.
                    </Text>

                    <VStack gap={5} align="stretch">
                        
                        {/* Amount Selection */}
                        <Box>
                            <Text color="white" fontSize="sm" fontWeight="bold" mb={3}>Select Amount</Text>
                            <SimpleGrid columns={2} gap={3} mb={3}>
                                {PRESET_AMOUNTS.map((amt) => (
                                    <Button 
                                        key={amt} h="50px" rounded="xl"
                                        bg={purchaseAmount === amt ? "rgba(92, 172, 125, 0.15)" : "#121212"}
                                        color={purchaseAmount === amt ? brandColor : "white"}
                                        border="1px solid" borderColor={purchaseAmount === amt ? brandColor : "whiteAlpha.200"}
                                        _hover={{ borderColor: brandColor }}
                                        onClick={() => setPurchaseAmount(amt)}
                                    >
                                        ₦{amt.toLocaleString()}
                                    </Button>
                                ))}
                            </SimpleGrid>
                            <Flex align="center" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" rounded="xl" px={4} _focusWithin={{ borderColor: brandColor }}>
                                <Text color="gray.500" fontWeight="bold">₦</Text>
                                <Input 
                                    type="number" border="none" color="white" h="50px" _focus={{ boxShadow: "none" }}
                                    placeholder="Custom Amount"
                                    value={purchaseAmount || ""} 
                                    onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                                />
                            </Flex>
                        </Box>

                        <Box>
                            <Text color="white" fontSize="sm" fontWeight="bold" mb={2}>Recipient Email</Text>
                            <Input 
                                placeholder="friend@example.com" type="email"
                                bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="white" h="50px"
                                _focus={{ borderColor: brandColor, outline: "none", boxShadow: "none" }}
                                value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)}
                            />
                        </Box>

                        <Box>
                            <Text color="white" fontSize="sm" fontWeight="bold" mb={2}>Personal Message (Optional)</Text>
                            <Textarea 
                                placeholder="Happy Birthday! Enjoy shopping..." 
                                bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="white" minH="100px" p={4}
                                _focus={{ borderColor: brandColor, outline: "none", boxShadow: "none" }}
                                value={giftMessage} onChange={(e) => setGiftMessage(e.target.value)}
                            />
                        </Box>

                        <Button 
                            bg={brandColor} color="white" h="60px" rounded="xl" fontSize="lg" fontWeight="bold" mt={2}
                            _hover={{ filter: "brightness(1.1)", transform: "translateY(-2px)" }} transition="all 0.2s"
                            onClick={handleBuyGiftCard} loading={isBuying} display="flex" gap={2}
                        >
                            <Icon as={LuSend} /> Pay ₦{purchaseAmount.toLocaleString()}
                        </Button>

                    </VStack>
                </Box>

            </Grid>
        </Box>
    );
}