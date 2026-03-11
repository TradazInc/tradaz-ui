"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Button, Icon, Grid, VStack, Image, Textarea, Badge 
} from "@chakra-ui/react";
import { 
    LuStar, LuCheck
} from "react-icons/lu";

import { PendingReview, PastReview } from "@/app/lib/definitions";
import { MOCK_PENDING_REVIEWS, MOCK_PAST_REVIEWS } from "@/app/lib/data";

export default function ReviewsPage() {
    const brandColor = "#5cac7d";
    
    const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
    
    // --- STATE ---
    const [pendingReviews, setPendingReviews] = useState<PendingReview[]>(MOCK_PENDING_REVIEWS);
    const [pastReviews] = useState<PastReview[]>(MOCK_PAST_REVIEWS);
    
    // Interactive Form State for the item currently being reviewed
    const [activeReviewId, setActiveReviewId] = useState<string | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- LOGIC HANDLERS ---
    const handleSubmitReview = (id: string) => {
        if (rating === 0) return alert("Please select a star rating first!");
        
        setIsSubmitting(true);
        // API-READY: POST /api/reviews
        setTimeout(() => {
            setIsSubmitting(false);
            alert("Review submitted successfully! Thank you.");
            // Remove from pending list
            setPendingReviews(prev => prev.filter(item => item.id !== id));
            // Reset form
            setActiveReviewId(null);
            setRating(0);
            setReviewText("");
        }, 1500);
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1000px" mx="auto" animation="fade-in 0.3s ease">
            
            {/* Header */}
            <Flex align="center" gap={3} mb={8}>
                <Icon as={LuStar} boxSize="28px" color={brandColor} />
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight">
                        My Reviews
                    </Text>
                    <Text color="gray.400" fontSize="sm">Share your thoughts on recent purchases.</Text>
                </Box>
            </Flex>

            {/* Custom Tabs */}
            <Flex gap={4} mb={8} borderBottom="1px solid" borderColor="whiteAlpha.100">
                <Button 
                    variant="ghost" rounded="none" h="50px" px={6}
                    color={activeTab === 'pending' ? brandColor : "gray.500"}
                    borderBottom="2px solid" borderColor={activeTab === 'pending' ? brandColor : "transparent"}
                    _hover={{ bg: "whiteAlpha.50", color: activeTab === 'pending' ? brandColor : "white" }}
                    onClick={() => setActiveTab('pending')}
                >
                    To Review {pendingReviews.length > 0 && <Badge ml={2} bg={brandColor} color="white" rounded="full">{pendingReviews.length}</Badge>}
                </Button>
                <Button 
                    variant="ghost" rounded="none" h="50px" px={6}
                    color={activeTab === 'history' ? brandColor : "gray.500"}
                    borderBottom="2px solid" borderColor={activeTab === 'history' ? brandColor : "transparent"}
                    _hover={{ bg: "whiteAlpha.50", color: activeTab === 'history' ? brandColor : "white" }}
                    onClick={() => setActiveTab('history')}
                >
                    History
                </Button>
            </Flex>

            {/* --- TAB CONTENT: PENDING REVIEWS --- */}
            {activeTab === 'pending' && (
                <VStack gap={6} align="stretch">
                    {pendingReviews.length === 0 ? (
                        <Flex direction="column" align="center" justify="center" py={20} bg="#1A1C23" rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                            <Icon as={LuCheck} boxSize="60px" color={brandColor} mb={4} opacity={0.5} />
                            <Text color="white" fontSize="xl" fontWeight="bold">All caught up!</Text>
                            <Text color="gray.500" fontSize="sm">You have no pending items to review.</Text>
                        </Flex>
                    ) : (
                        pendingReviews.map((item) => (
                            <Box key={item.id} bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                                <Flex direction={{ base: "column", md: "row" }} gap={6}>
                                    
                                    {/* Product Snapshot */}
                                    <Flex gap={4} flex={1}>
                                        <Box boxSize="80px" rounded="lg" overflow="hidden" bg="#121212" border="1px solid" borderColor="whiteAlpha.100" flexShrink={0}>
                                            <Image src={item.productImage} alt={item.productName} w="full" h="full" objectFit="cover" />
                                        </Box>
                                        <Box>
                                            <Text color="white" fontWeight="bold" fontSize="lg" mb={1}>{item.productName}</Text>
                                            <Text color="gray.500" fontSize="xs" mb={1}>Order: {item.orderId}</Text>
                                            <Badge bg="rgba(92, 172, 125, 0.15)" color={brandColor} textTransform="none" rounded="full" px={2}>
                                                {item.deliveredDate}
                                            </Badge>
                                        </Box>
                                    </Flex>

                                    {/* Action Area */}
                                    <Box w={{ base: "full", md: "300px" }}>
                                        {activeReviewId !== item.id ? (
                                            <Button w="full" h="50px" bg="whiteAlpha.100" color="white" rounded="lg" _hover={{ bg: brandColor, color: "white" }} onClick={() => setActiveReviewId(item.id)}>
                                                Write a Review
                                            </Button>
                                        ) : (
                                            <VStack align="stretch" gap={4} animation="fade-in 0.3s ease">
                                                {/* Interactive Stars */}
                                                <Flex gap={1} justify="center">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Icon 
                                                            key={star} as={LuStar} boxSize="28px" cursor="pointer" transition="all 0.2s"
                                                            fill={(hoverRating || rating) >= star ? "yellow.400" : "transparent"}
                                                            color={(hoverRating || rating) >= star ? "yellow.400" : "gray.500"}
                                                            onMouseEnter={() => setHoverRating(star)}
                                                            onMouseLeave={() => setHoverRating(0)}
                                                            onClick={() => setRating(star)}
                                                            _hover={{ transform: "scale(1.1)" }}
                                                        />
                                                    ))}
                                                </Flex>
                                                
                                                <Textarea 
                                                    placeholder="What did you like about it? (Optional)" bg="#121212" border="1px solid" borderColor="whiteAlpha.200" color="white" minH="100px"
                                                    _focus={{ borderColor: brandColor, outline: "none", boxShadow: "none" }}
                                                    value={reviewText} onChange={(e) => setReviewText(e.target.value)}
                                                />

                                                <Flex gap={2}>
                                                    <Button flex={1} variant="outline" borderColor="whiteAlpha.200" color="white" onClick={() => setActiveReviewId(null)} _hover={{ bg: "whiteAlpha.100" }}>
                                                        Cancel
                                                    </Button>
                                                    <Button flex={2} bg={brandColor} color="white" onClick={() => handleSubmitReview(item.id)} loading={isSubmitting} _hover={{ filter: "brightness(1.1)" }}>
                                                        Submit
                                                    </Button>
                                                </Flex>
                                            </VStack>
                                        )}
                                    </Box>
                                </Flex>
                            </Box>
                        ))
                    )}
                </VStack>
            )}

            {/* --- TAB CONTENT: REVIEW HISTORY --- */}
            {activeTab === 'history' && (
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                    {pastReviews.length === 0 ? (
                        <Text color="gray.500" gridColumn="1 / -1" textAlign="center" py={10}>No past reviews found.</Text>
                    ) : (
                        pastReviews.map((review) => (
                            <Box key={review.id} bg="#1A1C23" p={5} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                                <Flex gap={4} mb={4}>
                                    <Box boxSize="60px" rounded="lg" overflow="hidden" bg="#121212" flexShrink={0}>
                                        <Image src={review.productImage} alt={review.productName} w="full" h="full" objectFit="cover" />
                                    </Box>
                                    <Box flex={1}>
                                        <Text color="white" fontWeight="bold" fontSize="sm" lineClamp={1} mb={1}>{review.productName}</Text>
                                        <Flex gap={0.5} mb={1}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Icon key={star} as={LuStar} boxSize="12px" fill={review.rating >= star ? "yellow.400" : "transparent"} color={review.rating >= star ? "yellow.400" : "gray.600"} />
                                            ))}
                                        </Flex>
                                        <Text color="gray.500" fontSize="10px">{review.date}</Text>
                                    </Box>
                                </Flex>
                                <Box bg="#121212" p={3} rounded="lg" border="1px solid" borderColor="whiteAlpha.50">
                                    <Text color="gray.300" fontSize="sm" fontStyle="italic">&quot;{review.comment}&quot;</Text>
                                </Box>
                            </Box>
                        ))
                    )}
                </Grid>
            )}

        </Box>
    );
}