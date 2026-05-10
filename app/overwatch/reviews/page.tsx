"use client";
import React, { useState } from "react";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Badge, Button, Avatar, Input, IconButton, VStack, ScrollArea
} from "@chakra-ui/react";
import { 
    LuSearch, LuFilter, LuStar, LuMessageSquare, LuShieldAlert, 
    LuTrash, LuCheck, LuEye, LuStore, LuUser, LuDownload
} from "react-icons/lu";

// --- REUSABLE STYLES ---
const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 3, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 12px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px", minWidth: "160px" };

// --- MOCK DATA ---
const REVIEW_KPIs = [
    { label: "Platform Avg Rating", value: "4.6", trend: "+0.2 this month", icon: LuStar, iconColor: "yellow.400" },
    { label: "Total Reviews", value: "8,492", trend: "Lifetime total", icon: LuMessageSquare, iconColor: "blue.400" },
    { label: "Flagged for Moderation", value: "14", trend: "Action required", icon: LuShieldAlert, iconColor: "red.400" },
    { label: "Positive Sentiment", value: "92%", trend: "4 & 5 star ratio", icon: LuCheck, iconColor: "#5cac7d" },
];

interface ReviewRecord {
    id: string;
    reviewerName: string;
    shopName: string;
    rating: number;
    comment: string;
    status: "Published" | "Flagged" | "Removed";
    date: string;
}

const MOCK_REVIEWS: ReviewRecord[] = [
    { id: "REV-1042", reviewerName: "Sarah Connor", shopName: "Urban Kicks NG", rating: 5, comment: "Amazing quality! Delivery was super fast. Highly recommend this store.", status: "Published", date: "2 hours ago" },
    { id: "REV-1043", reviewerName: "Chuka Obi", shopName: "Tech Haven Hub", rating: 1, comment: "The product arrived damaged and the seller is not responding. I want a refund.", status: "Flagged", date: "5 hours ago" },
    { id: "REV-1044", reviewerName: "Grace Okafor", shopName: "Mama's Kitchen Spices", rating: 4, comment: "Good spices, but the packaging could be better.", status: "Published", date: "1 day ago" },
    { id: "REV-1045", reviewerName: "Unknown User", shopName: "Lagos Streetwear", rating: 1, comment: "[Inappropriate language removed by automated filter]", status: "Removed", date: "2 days ago" },
    { id: "REV-1046", reviewerName: "Aisha Bello", shopName: "Glow Beauty Cosmetics", rating: 5, comment: "Authentic products. Will definitely buy again.", status: "Published", date: "3 days ago" },
    { id: "REV-1047", reviewerName: "Wada Gift", shopName: "Minimalist Hub", rating: 2, comment: "Item doesn't look exactly like the pictures. Disappointed.", status: "Flagged", date: "1 week ago" },
];

export default function ReviewsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [ratingFilter, setRatingFilter] = useState("All");

    // Filter Logic
    const filteredReviews = MOCK_REVIEWS.filter(review => {
        const matchesSearch = review.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              review.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              review.comment.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || review.status === statusFilter;
        const matchesRating = ratingFilter === "All" || review.rating.toString() === ratingFilter;
        return matchesSearch && matchesStatus && matchesRating;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Published": return { bg: "rgba(92, 172, 125, 0.1)", color: "#5cac7d", border: "1px solid #5cac7d" };
            case "Flagged": return { bg: "rgba(236, 201, 75, 0.1)", color: "yellow.400", border: "1px solid var(--chakra-colors-yellow-400)" };
            case "Removed": return { bg: "rgba(229, 62, 62, 0.1)", color: "red.400", border: "1px solid var(--chakra-colors-red-400)" };
            default: return { bg: "#111111", color: "#888888", border: "1px solid #333333" };
        }
    };

    // Helper to render star rating
    const renderStars = (rating: number) => {
        return (
            <Flex gap={1}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Icon 
                        key={star} 
                        as={LuStar} 
                        boxSize="14px" 
                        fill={star <= rating ? "var(--chakra-colors-yellow-400)" : "transparent"} 
                        color={star <= rating ? "yellow.400" : "#333333"} 
                        strokeWidth={star <= rating ? "0" : "2"}
                    />
                ))}
            </Flex>
        );
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* --- HEADER --- */}
            <Flex justify="space-between" align={{ base: "flex-start", md: "flex-end" }} direction={{ base: "column", md: "row" }} gap={4} mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight" mb={1}>
                        Reviews & Feedback
                    </Text>
                    <Text color="#888888" fontSize="sm">Monitor platform sentiment and moderate flagged customer reviews.</Text>
                </Box>
                
                <Button display={{ base: "none", sm: "flex" }} bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }} gap={2} h="44px" px={6} fontWeight="bold">
                    <Icon as={LuDownload} color="#888888" strokeWidth="2.5" /> Export Data
                </Button>
            </Flex>

            {/* --- KPI GRID --- */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {REVIEW_KPIs.map((kpi, idx) => (
                    <Box key={idx} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="start" mb={4}>
                            <Flex boxSize="40px" bg="#111111" border="1px solid #333333" rounded="none" align="center" justify="center">
                                <Icon as={kpi.icon} color={kpi.iconColor} boxSize="20px" strokeWidth="2.5" />
                            </Flex>
                            <Badge bg="#111111" color="#888888" border="1px solid #333333" rounded="none" px={2} py={1} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                {kpi.trend}
                            </Badge>
                        </Flex>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>{kpi.label}</Text>
                        <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">{kpi.value}</Text>
                    </Box>
                ))}
            </SimpleGrid>

            {/* --- TOOLBAR (SEARCH & FILTERS) --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" p={5} mb={8}>
                <Flex direction={{ base: "column", md: "row" }} gap={4} w="full" justify="space-between">
                    {/* Search */}
                    <Flex flex={1} maxW={{ md: "450px" }} align="center" {...controlStyles}>
                        <Icon as={LuSearch} color="#888888" mr={2} strokeWidth="2.5" />
                        <Input 
                            placeholder="Search keywords, reviewer, or shop..." 
                            border="none" color="white" h="full" px={0} 
                            _focus={{ boxShadow: "none", outline: "none" }} 
                            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                    </Flex>
                    
                    {/* Filters */}
                    <Flex gap={4} w={{ base: "full", md: "auto" }} wrap={{ base: "wrap", sm: "nowrap" }}>
                        <Flex align="center" bg="#111111" border="1px solid #333333" px={3} h="44px" flexShrink={0} display={{ base: "none", sm: "flex" }}>
                            <Icon as={LuFilter} color="#888888" strokeWidth="2.5" />
                        </Flex>
                        <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} style={nativeSelectStyle}>
                            <option value="All" style={{ background: "#000000" }}>All Ratings</option>
                            <option value="5" style={{ background: "#000000" }}>5 Stars Only</option>
                            <option value="4" style={{ background: "#000000" }}>4 Stars Only</option>
                            <option value="3" style={{ background: "#000000" }}>3 Stars Only</option>
                            <option value="2" style={{ background: "#000000" }}>2 Stars Only</option>
                            <option value="1" style={{ background: "#000000" }}>1 Star Only</option>
                        </select>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={nativeSelectStyle}>
                            <option value="All" style={{ background: "#000000" }}>All Statuses</option>
                            <option value="Published" style={{ background: "#000000" }}>Published</option>
                            <option value="Flagged" style={{ background: "#000000" }}>Flagged (Needs Review)</option>
                            <option value="Removed" style={{ background: "#000000" }}>Removed</option>
                        </select>
                    </Flex>
                </Flex>
            </Box>

            {/* --- REVIEWS LEDGER TABLE --- */}
            <Box bg="#0A0A0A" border="1px solid #1A1A1A" mb={8}>
                <ScrollArea.Root maxW="full">
                    <ScrollArea.Viewport pb={4}>
                        <Box minW="1100px">
                            
                            {/* Columns Header */}
                            <Grid templateColumns="1.5fr 1.5fr 3fr 1fr 100px" gap={4} px={6} py={4} bg="#111111" borderBottom="1px solid #333333">
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Customer</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Target Shop</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Rating & Comment</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Status</Text>
                                <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Actions</Text>
                            </Grid>

                            {/* Table Rows */}
                            {filteredReviews.length === 0 ? (
                                <Flex justify="center" align="center" py={16} direction="column">
                                    <Icon as={LuMessageSquare} color="#333333" boxSize="40px" mb={4} strokeWidth="1.5" />
                                    <Text color="#888888" fontSize="lg" fontWeight="bold">No reviews found matching filters.</Text>
                                </Flex>
                            ) : (
                                <VStack align="stretch" gap={0}>
                                    {filteredReviews.map((review) => {
                                        const statusStyle = getStatusStyle(review.status);
                                        
                                        return (
                                            <Grid 
                                                key={review.id} 
                                                templateColumns="1.5fr 1.5fr 3fr 1fr 100px" gap={4} px={6} py={5} 
                                                borderBottom="1px solid #1A1A1A" 
                                                alignItems="start" 
                                                _hover={{ bg: "#111111" }} transition="background 0.2s"
                                            >
                                                {/* Customer */}
                                                <Flex align="center" gap={3}>
                                                    <Avatar.Root size="sm" rounded="full">
                                                        <Avatar.Fallback name={review.reviewerName} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="black" />
                                                    </Avatar.Root>
                                                    <Box>
                                                        <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight">{review.reviewerName}</Text>
                                                        <Flex align="center" gap={1} mt={0.5}>
                                                            <Icon as={LuUser} color="#888888" boxSize="10px" />
                                                            <Text color="#888888" fontSize="xs">Buyer</Text>
                                                        </Flex>
                                                    </Box>
                                                </Flex>

                                                {/* Shop */}
                                                <Box>
                                                    <Text color="white" fontSize="sm" fontWeight="bold" letterSpacing="tight" mb={0.5}>{review.shopName}</Text>
                                                    <Flex align="center" gap={1} mt={0.5}>
                                                        <Icon as={LuStore} color="#888888" boxSize="10px" />
                                                        <Text color="#888888" fontSize="xs">Merchant</Text>
                                                    </Flex>
                                                </Box>

                                                {/* Rating & Comment */}
                                                <Box>
                                                    <Flex align="center" gap={3} mb={2}>
                                                        {renderStars(review.rating)}
                                                        <Text color="#555555" fontSize="10px" fontFamily="monospace">{review.date}</Text>
                                                        <Text color="#555555" fontSize="10px" fontFamily="monospace">ID: {review.id}</Text>
                                                    </Flex>
                                                    <Text color={review.status === "Removed" ? "#555555" : "white"}  fontStyle={review.status === "Removed" ? "italic" : "normal"}>
                                                        {review.comment}
                                                    </Text>
                                                </Box>

                                                {/* Status */}
                                                <Box pt={1}>
                                                    <Badge {...statusStyle} px={2.5} py={1} rounded="none" fontSize="9px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                                        {review.status}
                                                    </Badge>
                                                </Box>
                                                
                                                {/* Actions */}
                                                <Flex justify="flex-end" gap={2} pt={1}>
                                                    <IconButton aria-label="View Full Review" title="View Full Review" size="sm" h="32px" w="32px" bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                                        <Icon as={LuEye} strokeWidth="2.5" boxSize="14px" />
                                                    </IconButton>
                                                    
                                                    {review.status !== "Removed" ? (
                                                        <IconButton aria-label="Remove Review" title="Remove / Delete" size="sm" h="32px" w="32px" variant="outline" borderColor="#333333" color="red.400" rounded="none" _hover={{ bg: "rgba(229, 62, 62, 0.1)", borderColor: "red.400" }}>
                                                            <Icon as={LuTrash} strokeWidth="2.5" boxSize="14px" />
                                                        </IconButton>
                                                    ) : (
                                                        <IconButton aria-label="Restore Review" title="Restore" size="sm" h="32px" w="32px" variant="outline" borderColor="#333333" color="#5cac7d" rounded="none" _hover={{ bg: "rgba(92, 172, 125, 0.1)", borderColor: "#5cac7d" }}>
                                                            <Icon as={LuCheck} strokeWidth="2.5" boxSize="14px" />
                                                        </IconButton>
                                                    )}
                                                </Flex>

                                            </Grid>
                                        );
                                    })}
                                </VStack>
                            )}
                        </Box>
                    </ScrollArea.Viewport>
                    
                    {/* Horizontal Scrollbar */}
                    <ScrollArea.Scrollbar orientation="horizontal" bg="#0A0A0A" h="6px" p={0}>
                        <ScrollArea.Thumb bg="#1A1A1A" rounded="none" _hover={{ bg: "#333333" }} />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </Box>

        </Box>
    );
}