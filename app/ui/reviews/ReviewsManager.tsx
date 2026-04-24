"use client";
import React, { useState, useMemo } from "react";

import { Box, Flex, Text, Icon, Input, Button, HStack, VStack } from "@chakra-ui/react";

import { 
    LuMessageSquare, LuSearch, LuStar, 
    LuCheck, LuX, LuTrash2, LuClock, LuTag
} from "react-icons/lu";

import { generateDummyReviews } from "@/app/lib/data";
import { ProductReview } from "@/app/lib/definitions";

export const ReviewsManager = () => {
    const [reviews, setReviews] = useState<ProductReview[]>(generateDummyReviews(12));
    
    // Filter States
    const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Approved" | "Disapproved">("All");
    const [categoryFilter, setCategoryFilter] = useState<"All" | "Fashion" | "Electronics" | "Beauty" | "Home">("All");
    const [sortOrder, setSortOrder] = useState<"Newest" | "Oldest">("Newest");

    // --- MODERATION ACTIONS ---
    const updateReviewStatus = (id: string, newStatus: "Approved" | "Disapproved") => {
        setReviews(prev => prev.map(rev => rev.id === id ? { ...rev, status: newStatus } : rev));
    };

    const deleteReview = (id: string) => {
        setReviews(prev => prev.filter(rev => rev.id !== id));
    };

    // --- FILTERING & SORTING LOGIC ---
    const filteredAndSortedReviews = useMemo(() => {
        let result = reviews;

        if (statusFilter !== "All") {
            result = result.filter(rev => rev.status === statusFilter);
        }
        if (categoryFilter !== "All") {
            result = result.filter(rev => rev.category === categoryFilter);
        }

        return result.sort((a, b) => {
            return sortOrder === "Newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
        });
    }, [reviews, statusFilter, categoryFilter, sortOrder]);

    const totalPending = reviews.filter(r => r.status === "Pending").length;
    const avgRating = reviews.length > 0 
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) 
        : "0.0";

    const renderStars = (rating: number) => {
        return (
            <HStack gap={1}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} as={LuStar} boxSize="14px" color={star <= rating ? "orange.400" : "#333333"} fill={star <= rating ? "orange.400" : "transparent"} />
                ))}
            </HStack>
        );
    };

    // Shared styles for our native selects to bypass TypeScript Box errors
    const selectStyles = {
        backgroundColor: "#0A0A0A",
        color: "white",
        height: "44px",
        padding: "0 16px",
        borderRadius: "0px", 
        border: "1px solid #1A1A1A", 
        cursor: "pointer",
        outline: "none"
    };

    return (
        <Box w="full" display="flex" flexDirection="column" position="relative" bg="#000000">
            
            <Box 
                position="sticky" top={{ base: "70px", md: "85px" }} zIndex={20} 
                bg="rgba(0, 0, 0, 0.85)" backdropFilter="blur(12px)"
                py={4} mb={6} mx={-4} px={4} 
            >
                <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} wrap="wrap" gap={4} mb={6}>
                    <Box>
                        <Text color="white" fontWeight="bold" fontSize="2xl" mb={1} display="flex" alignItems="center" gap={2}>
                            <Icon as={LuMessageSquare} /> Product Reviews
                        </Text>
                        <Text color="gray.500" fontSize="sm">Manage customer feedback, ratings, and public visibility.</Text>
                    </Box>
                    
                    <HStack gap={4}>
                        <VStack align="flex-end" gap={0}>
                            <Text color="white" fontWeight="bold" fontSize="lg">{avgRating} / 5.0</Text>
                            <Text color="gray.500" fontSize="xs">Average Store Rating</Text>
                        </VStack>
                        <Box h="40px" w="1px" bg="#1A1A1A" />
                        <VStack align="flex-end" gap={0}>
                            <Text color="orange.400" fontWeight="bold" fontSize="lg">{totalPending}</Text>
                            <Text color="gray.500" fontSize="xs">Pending Moderation</Text>
                        </VStack>
                    </HStack>
                </Flex>

                <Flex direction={{ base: "column", md: "row" }} gap={3} w="full">
                    <Flex flex={1} minW="250px" align="center" bg="#0A0A0A" border="1px solid #1A1A1A" rounded="none" px={3} _focusWithin={{ borderColor: "white" }}>
                        <Icon as={LuSearch} color="gray.400" />
                        <Input placeholder="Search comments or customers..." border="none" _focus={{ outline: "none", boxShadow: "none" }} color="white" h="44px" rounded="none" />
                    </Flex>
                    
                    <select 
                        style={selectStyles} 
                        value={statusFilter} 
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as "All" | "Pending" | "Approved" | "Disapproved")}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Disapproved">Disapproved</option>
                    </select>

                    <select 
                        style={selectStyles} 
                        value={categoryFilter} 
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value as "All" | "Fashion" | "Electronics" | "Beauty" | "Home")}
                    >
                        <option value="All">All Categories</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Home">Home</option>
                    </select>

                    <select 
                        style={selectStyles} 
                        value={sortOrder} 
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortOrder(e.target.value as "Newest" | "Oldest")}
                    >
                        <option value="Newest">Sort: Newest First</option>
                        <option value="Oldest">Sort: Oldest First</option>
                    </select>
                </Flex>
            </Box>

            <VStack gap={4} align="stretch" mb={8}>
                {filteredAndSortedReviews.length === 0 ? (
                    <Flex justify="center" py={12} color="gray.500" bg="#0A0A0A" rounded="none" border="1px solid #1A1A1A">
                        No reviews found matching your filters.
                    </Flex>
                ) : (
                    filteredAndSortedReviews.map((review) => {
                        const isPending = review.status === "Pending";
                        const isApproved = review.status === "Approved";
                        
                        return (
                            <Box key={review.id} bg="#0A0A0A" rounded="none" border="1px solid" borderColor={isPending ? "rgba(237, 137, 54, 0.4)" : "#1A1A1A"} p={{ base: 4, md: 6 }} shadow="sm" transition="all 0.2s">
                                <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={6}>
                                    
                                    <VStack align="start" flex={1} gap={3}>
                                        <HStack justify="space-between" w="full">
                                            <Flex align="center" gap={2}>
                                        
                                                <Box boxSize="32px" rounded="none" bg="#111111" border="1px solid #1A1A1A" display="flex" alignItems="center" justifyContent="center">
                                                    <Icon as={LuTag} color="gray.400" boxSize="14px" />
                                                </Box>
                                                <Box>
                                                    <Text color="white" fontSize="sm" fontWeight="bold">{review.productName}</Text>
                                                    <Text color="gray.500" fontSize="xs">{review.category}</Text>
                                                </Box>
                                            </Flex>
                                            
                                            <Flex align="center" px={2.5} py={1} rounded="none" border="1px solid" borderColor={isApproved ? "rgba(92, 172, 125, 0.3)" : isPending ? "rgba(237, 137, 54, 0.3)" : "rgba(245, 101, 101, 0.3)"} bg={isApproved ? "rgba(92, 172, 125, 0.1)" : isPending ? "rgba(237, 137, 54, 0.1)" : "rgba(245, 101, 101, 0.1)"}>
                                                {/* Even the status dot is perfectly square now */}
                                                <Box boxSize="6px" rounded="none" mr={2} bg={isApproved ? "#5cac7d" : isPending ? "orange.400" : "red.400"} />
                                                <Text color={isApproved ? "#5cac7d" : isPending ? "orange.400" : "red.400"} fontSize="xs" fontWeight="bold">
                                                    {review.status}
                                                </Text>
                                            </Flex>
                                        </HStack>

                                        <Box bg="#111111" border="1px solid #1A1A1A" p={4} rounded="none" w="full">
                                            <Flex justify="space-between" mb={2}>
                                                <Text color="gray.300" fontSize="sm" fontWeight="bold">{review.customerName}</Text>
                                                {renderStars(review.rating)}
                                            </Flex>
                                            
                                            <Text color="gray.400" fontSize="sm" lineHeight="tall">
                                                &quot;{review.comment}&quot;
                                            </Text>
                                            <Flex align="center" gap={1} mt={3} color="gray.600">
                                                <Icon as={LuClock} boxSize="12px" />
                                                <Text fontSize="xs">{review.date}</Text>
                                            </Flex>
                                        </Box>
                                    </VStack>

                                    <Flex direction={{ base: "row", md: "column" }} gap={2} minW="140px" justify="flex-start">
                                        
                                        {!isApproved && (
                                            <Button size="sm" rounded="none" onClick={() => updateReviewStatus(review.id, "Approved")} bg="rgba(92, 172, 125, 0.1)" border="1px solid rgba(92, 172, 125, 0.3)" color="#5cac7d" _hover={{ bg: "rgba(92, 172, 125, 0.2)" }} justifyContent="flex-start">
                                                <Icon as={LuCheck} mr={2} /> Approve
                                            </Button>
                                        )}
                                        {review.status !== "Disapproved" && (
                                            <Button size="sm" rounded="none" onClick={() => updateReviewStatus(review.id, "Disapproved")} bg="rgba(237, 137, 54, 0.1)" border="1px solid rgba(237, 137, 54, 0.3)" color="orange.400" _hover={{ bg: "rgba(237, 137, 54, 0.2)" }} justifyContent="flex-start">
                                                <Icon as={LuX} mr={2} /> Disapprove
                                            </Button>
                                        )}
                                        <Box w="full" h="1px" bg="#1A1A1A" my={1} display={{ base: "none", md: "block" }} />
                                        <Button size="sm" rounded="none" onClick={() => deleteReview(review.id)} variant="ghost" color="red.400" _hover={{ bg: "rgba(245, 101, 101, 0.1)" }} justifyContent="flex-start">
                                            <Icon as={LuTrash2} mr={2} /> Delete
                                        </Button>
                                    </Flex>

                                </Flex>
                            </Box>
                        );
                    })
                )}
            </VStack>

        </Box>
    );
};