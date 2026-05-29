"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
    Box, Flex, Text, Grid, SimpleGrid, Icon, Badge, Button, Avatar, ScrollArea, IconButton, Spinner, VStack
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LuTrendingUp, LuStore, LuUsers, LuWallet, LuArrowUpRight, LuEllipsisVertical, LuCheck, LuBriefcase, LuX
} from "react-icons/lu";

// --- MOCK PLATFORM DATA ---
const PLATFORM_STATS = [
    { label: "Total Platform GMV", value: "₦452,500,000", trend: "+12.5%", icon: LuTrendingUp, iconColor: "green.400" },
    { label: "Platform Revenue (Fees)", value: "₦11,312,500", trend: "+15.2%", icon: LuWallet, iconColor: "#5cac7d" },
    { label: "Active Shops", value: "142", trend: "+5 this week", icon: LuStore, iconColor: "blue.400" },
    { label: "Total Users", value: "45,291", trend: "+1,200", icon: LuUsers, iconColor: "purple.400" },
];

type PlatformEntity = {
    id: string;
    name: string;
    gmv: string;
    shopCount?: number;
    owner?: string;
    status?: string;
};

const INITIAL_BUSINESSES = [
    { id: "BIZ-901", name: "Wada Group Ltd.", shopCount: 3, gmv: "₦45,500,000" },
    { id: "BIZ-902", name: "Lagos Streetwear Co.", shopCount: 2, gmv: "₦12,400,000" },
];

const INITIAL_SHOPS = [
    { id: "SHP-01", name: "Urban Kicks NG", owner: "Wada Gift", gmv: "₦12,500,000", status: "active" },
    { id: "SHP-02", name: "Minimalist Hub", owner: "Sarah Connor", gmv: "₦8,200,000", status: "active" },
    { id: "SHP-03", name: "Tech Gadgets Pro", owner: "John Doe", gmv: "₦5,100,000", status: "active" },
];

const INITIAL_PENDING_APPROVALS = [
    { id: "REQ-99", name: "Lagos Streetwear", date: "2 hours ago", type: "New Shop" },
    { id: "REQ-98", name: "Beauty Empire", date: "5 hours ago", type: "KYC Verification" },
];

// --- QUICK VIEW DRAWER (TRIGGERED BY ELLIPSIS) ---
const QuickViewDrawer = ({ 
    isOpen, entity, onClose, onNavigate 
}: { 
    isOpen: boolean; entity: PlatformEntity | null; onClose: () => void; onNavigate: (path: string) => void;
}) => {
    if (!entity) return null;
    
    const isBusiness = entity.shopCount !== undefined;
    const typeLabel = isBusiness ? "Parent Business" : "Merchant Shop";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10000, backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
                        onClick={onClose}
                    />
                    <Box position="fixed" top={0} right={0} bottom={0} zIndex={10001} w={{ base: "100%", sm: "400px" }} pointerEvents="none">
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{ width: "100%", height: "100%", pointerEvents: "auto" }}
                        >
                            <Box w="100%" h="100%" bg="#0A0A0A" borderLeft="1px solid" borderColor="#1A1A1A" shadow="-20px 0 50px rgba(0,0,0,0.9)" display="flex" flexDirection="column">
                                <Flex justify="space-between" align="center" px={6} pt={8} pb={6} borderBottom="1px solid" borderColor="#1A1A1A" bg="#111111">
                                    <Box>
                                        <Text fontSize="10px" fontWeight="bold" letterSpacing="wider" color="#888888" textTransform="uppercase" mb={1}>{typeLabel} Quick View</Text>
                                        <Text fontSize="xl" fontWeight="black" color="white" letterSpacing="tight">{entity.name}</Text>
                                    </Box>
                                    <IconButton aria-label="Close" variant="ghost" size="sm" rounded="none" onClick={onClose} color="#888888" _hover={{ bg: "#1A1A1A", color: "white" }}>
                                        <Icon as={LuX} boxSize="20px" strokeWidth="2.5" />
                                    </IconButton>
                                </Flex>

                                <Box flex={1} overflowY="auto" px={6} py={8} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                                    <VStack w="full" gap={6} align="stretch">
                                        <Box bg="#111111" p={5} border="1px solid #1A1A1A">
                                            <VStack align="stretch" gap={4}>
                                                <Box>
                                                    <Text color="#888888" fontSize="xs" mb={1}>Entity ID</Text>
                                                    <Text color="white" fontWeight="bold" fontFamily="monospace">{entity.id}</Text>
                                                </Box>
                                                <Box>
                                                    <Text color="#888888" fontSize="xs" mb={1}>Aggregated GMV</Text>
                                                    <Text color="white" fontWeight="bold" fontSize="lg">{entity.gmv}</Text>
                                                </Box>
                                                {isBusiness ? (
                                                    <Box>
                                                        <Text color="#888888" fontSize="xs" mb={1}>Total Active Shops</Text>
                                                        <Text color="white" fontWeight="bold">{entity.shopCount}</Text>
                                                    </Box>
                                                ) : (
                                                    <Box>
                                                        <Text color="#888888" fontSize="xs" mb={1}>Primary Owner</Text>
                                                        <Text color="white" fontWeight="bold">{entity.owner}</Text>
                                                    </Box>
                                                )}
                                            </VStack>
                                        </Box>
                                    </VStack>
                                </Box>

                                <Flex p={6} borderTop="1px solid" borderColor="#1A1A1A" gap={3} bg="#111111">
                                    <Button 
                                        flex="1" h="44px" bg="white" color="black" rounded="none" fontWeight="bold" _hover={{ bg: "#E5E5E5" }}
                                        onClick={() => {
                                            onClose();
                                            onNavigate(isBusiness ? `/overwatch/businesses/${entity.id}` : `/overwatch/shops/${entity.id}`);
                                        }}
                                    >
                                        View Full Profile <Icon as={LuArrowUpRight} ml={2} />
                                    </Button>
                                </Flex>
                            </Box>
                        </motion.div>
                    </Box>
                </>
            )}
        </AnimatePresence>
    );
};

export default function SuperAdminDashboard() {
    const router = useRouter();

    // --- STATE ---
    const [businesses] = useState(INITIAL_BUSINESSES);
    const [shops] = useState(INITIAL_SHOPS);
    const [pendingRequests, setPendingRequests] = useState(INITIAL_PENDING_APPROVALS);

    // Action States
    const [isExporting, setIsExporting] = useState(false);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
    
    // Quick View State
   
    const [selectedEntity, setSelectedEntity] = useState<PlatformEntity | null>(null);

    // --- ACTIONS ---
    const handleExportReport = () => {
        setIsExporting(true);
        setTimeout(() => {
            const headers = ["Metric", "Value", "Trend"];
            const csvRows = PLATFORM_STATS.map(stat => 
                [`"${stat.label}"`, `"${stat.value}"`, `"${stat.trend}"`].join(",")
            );
            const csvString = [headers.join(","), ...csvRows].join("\n");
            
            const blob = new Blob([csvString], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', 'platform_overview_report.csv');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            setIsExporting(false);
        }, 800);
    };

    const handleActionRequest = (id: string, type: 'approve' | 'reject') => {
        setProcessingId(id);
        setActionType(type);
        setTimeout(() => {
            setPendingRequests(prev => prev.filter(req => req.id !== id));
            setProcessingId(null);
            setActionType(null);
        }, 800); // Simulate API latency
    };

    return (
        <Box p={{ base: 4, lg: 8 }} maxW="1400px" mx="auto" animation="fade-in 0.3s ease" bg="#000000" minH="100vh">
            
            {/* HEADER */}
            <Flex justify="space-between" align="flex-end" mb={8}>
                <Box>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="white" letterSpacing="tight" mb={1}>
                        Platform Overview
                    </Text>
                    <Text color="#888888" fontSize="sm">Real-time metrics across all Tradaz tenants and users.</Text>
                </Box>
            
                <Button 
                    onClick={handleExportReport}
                    loading={isExporting}
                    loadingText="Exporting..."
                    display={{ base: "none", sm: "flex" }} bg="#111111" border="1px solid #333333" color="white" rounded="none" _hover={{ bg: "#1A1A1A" }} gap={2} h="44px" px={6} fontWeight="bold"
                >
                    <Icon as={LuArrowUpRight} color="#888888" strokeWidth="2.5" /> Export Report
                </Button>
            </Flex>

            {/* HIGH LEVEL METRICS */}
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={6} mb={8}>
                {PLATFORM_STATS.map((stat, idx) => (
                    <Box key={idx} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="start" mb={4}>
                            <Flex boxSize="40px" bg="#111111" border="1px solid #333333" rounded="none" align="center" justify="center">
                                <Icon as={stat.icon} color={stat.iconColor} boxSize="20px" strokeWidth="2.5" />
                            </Flex>
                            <Badge bg="#111111" color="white" border="1px solid #333333" rounded="none" px={2} py={1} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                                {stat.trend}
                            </Badge>
                        </Flex>
                        <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>
                            {stat.label}
                        </Text>
                        <Text color="white" fontSize="3xl" fontWeight="black" letterSpacing="tight">
                            {stat.value}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>

            <Grid templateColumns={{ base: "1fr", xl: "2fr 1fr" }} gap={8}>
                
                {/* LEFT COLUMN: Tables */}
                <Flex direction="column" gap={8}>
                    
                    {/* Top Parent Businesses */}
                    <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="center" mb={6}>
                            <Flex align="center" gap={2}>
                                <Icon as={LuBriefcase} color="#5cac7d" boxSize="20px" strokeWidth="2.5" />
                                <Text color="white" fontSize="lg" fontWeight="bold" letterSpacing="tight">Top Parent Businesses</Text>
                            </Flex>
                            <Button 
                                onClick={() => router.push('/overwatch/businesses')}
                                size="sm" h="36px" variant="outline" borderColor="#333333" color="white" rounded="none" _hover={{ bg: "#111111" }}
                            >
                                View All
                            </Button>
                        </Flex>
                        
                        <ScrollArea.Root maxW="full">
                            <ScrollArea.Viewport pb={4}>
                                <Grid templateColumns="2fr 1fr 1.5fr 50px" gap={4} pb={4} borderBottom="1px solid" borderColor="#333333" mb={2} minW="500px">
                                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Business Entity</Text>
                                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Active Shops</Text>
                                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">Aggregated GMV</Text>
                                </Grid>
                                
                                {businesses.map((biz) => (
                                    <Grid 
                                        key={biz.id} 
                                        templateColumns="2fr 1fr 1.5fr 50px" gap={4} py={4} alignItems="center" borderBottom="1px solid" borderColor="#1A1A1A" minW="500px" 
                                        _hover={{ bg: "#111111" }} transition="background 0.2s" px={2} mx={-2} cursor="pointer"
                                        onClick={() => router.push(`/overwatch/businesses/${biz.id}`)}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Avatar.Root size="sm" rounded="full">
                                                <Avatar.Fallback name={biz.name} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="bold" />
                                            </Avatar.Root>
                                            <Text color="white" fontWeight="bold" fontSize="sm" letterSpacing="tight">{biz.name}</Text>
                                        </Flex>
                                        <Text color="#888888" fontSize="sm" fontWeight="bold">{biz.shopCount} Shops</Text>
                                        <Text color="white" fontWeight="black" textAlign="right" letterSpacing="tight">{biz.gmv}</Text>
                                        <Flex justify="flex-end">
                                            <IconButton 
                                                aria-label="Quick View Business" variant="ghost" size="sm" color="#888888" 
                                                _hover={{ color: "white", bg: "#1A1A1A" }} rounded="none"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedEntity(biz);
                                                }}
                                            >
                                                <Icon as={LuEllipsisVertical} strokeWidth="2.5" />
                                            </IconButton>
                                        </Flex>
                                    </Grid>
                                ))}
                            </ScrollArea.Viewport>
                            <ScrollArea.Scrollbar orientation="horizontal" bg="#0A0A0A" h="6px" p={0}>
                                <ScrollArea.Thumb bg="#1A1A1A" rounded="none" _hover={{ bg: "#333333" }} />
                            </ScrollArea.Scrollbar>
                        </ScrollArea.Root>
                    </Box>

                    {/* Top Performing Shops */}
                    <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                        <Flex justify="space-between" align="center" mb={6}>
                            <Flex align="center" gap={2}>
                                <Icon as={LuStore} color="blue.400" boxSize="20px" strokeWidth="2.5" />
                                <Text color="white" fontSize="lg" fontWeight="bold" letterSpacing="tight">Top Performing Shops</Text>
                            </Flex>
                            <Button 
                                onClick={() => router.push('/overwatch/shops')}
                                size="sm" h="36px" variant="outline" borderColor="#333333" color="white" rounded="none" _hover={{ bg: "#111111" }}
                            >
                                View All
                            </Button>
                        </Flex>
                        
                        <ScrollArea.Root maxW="full">
                            <ScrollArea.Viewport pb={4}>
                                <Grid templateColumns="2fr 1.5fr 1fr 50px" gap={4} pb={4} borderBottom="1px solid" borderColor="#333333" mb={2} minW="500px">
                                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Shop Name</Text>
                                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">Owner</Text>
                                    <Text color="#888888" fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" textAlign="right">30-Day GMV</Text>
                                </Grid>
                                
                                {shops.map((shop) => (
                                    <Grid 
                                        key={shop.id} 
                                        templateColumns="2fr 1.5fr 1fr 50px" gap={4} py={4} alignItems="center" borderBottom="1px solid" borderColor="#1A1A1A" minW="500px" 
                                        _hover={{ bg: "#111111" }} transition="background 0.2s" px={2} mx={-2} cursor="pointer"
                                        onClick={() => router.push(`/overwatch/shops/${shop.id}`)}
                                    >
                                        <Flex align="center" gap={3}>
                                            <Avatar.Root size="sm" rounded="full">
                                                <Avatar.Fallback name={shop.name} bg="#111111" border="1px solid #333333" color="white" rounded="none" fontWeight="bold" />
                                            </Avatar.Root>
                                            <Text color="white" fontWeight="bold" fontSize="sm" letterSpacing="tight">{shop.name}</Text>
                                        </Flex>
                                        <Text color="#888888" fontSize="sm" fontWeight="bold">{shop.owner}</Text>
                                        <Text color="white" fontWeight="black" textAlign="right" letterSpacing="tight">{shop.gmv}</Text>
                                        <Flex justify="flex-end">
                                            <IconButton 
                                                aria-label="Quick View Shop" variant="ghost" size="sm" color="#888888" 
                                                _hover={{ color: "white", bg: "#1A1A1A" }} rounded="none"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedEntity(shop);
                                                }}
                                            >
                                                <Icon as={LuEllipsisVertical} strokeWidth="2.5" />
                                            </IconButton>
                                        </Flex>
                                    </Grid>
                                ))}
                            </ScrollArea.Viewport>
                            <ScrollArea.Scrollbar orientation="horizontal" bg="#0A0A0A" h="6px" p={0}>
                                <ScrollArea.Thumb bg="#1A1A1A" rounded="none" _hover={{ bg: "#333333" }} />
                            </ScrollArea.Scrollbar>
                        </ScrollArea.Root>
                    </Box>

                </Flex>

                {/* RIGHT COLUMN: Action Center (Pending Approvals) */}
                <Box bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A" h="fit-content">
                    <Flex justify="space-between" align="center" mb={6}>
                        <Text color="white" fontSize="lg" fontWeight="bold" letterSpacing="tight">Action Center</Text>
                        <Badge bg="#111111" color={pendingRequests.length > 0 ? "red.400" : "green.400"} border="1px solid #333333" rounded="none" px={2} py={1} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                            {pendingRequests.length} Pending
                        </Badge>
                    </Flex>

                    {pendingRequests.length === 0 ? (
                        <Flex direction="column" align="center" justify="center" py={12} border="1px dashed #333333" bg="#111111">
                            <Icon as={LuCheck} color="#5cac7d" boxSize="32px" mb={3} strokeWidth="3" />
                            <Text color="#888888" fontWeight="bold" fontSize="sm">All caught up!</Text>
                        </Flex>
                    ) : (
                        <Flex direction="column" gap={4}>
                            {pendingRequests.map((req) => {
                                const isApproving = processingId === req.id && actionType === 'approve';
                                const isRejecting = processingId === req.id && actionType === 'reject';
                                const isProcessingAny = processingId === req.id;

                                return (
                                    <Box key={req.id} p={5} bg="#111111" rounded="none" border="1px solid" borderColor="#333333" opacity={isProcessingAny ? 0.6 : 1} transition="opacity 0.2s">
                                        <Flex justify="space-between" align="start" mb={4}>
                                            <Box>
                                                <Text color="white" fontWeight="bold" fontSize="md" mb={2} letterSpacing="tight">{req.name}</Text>
                                                <Badge bg="#000000" color="#888888" border="1px solid #333333" rounded="none" px={2} py={0.5} fontSize="10px" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">{req.type}</Badge>
                                            </Box>
                                            <Text color="#888888" fontSize="xs" fontWeight="bold">{req.date}</Text>
                                        </Flex>
                                        <Flex gap={3}>
                                            <Button 
                                                flex={1} size="sm" h="36px" bg="white" color="black" rounded="none" fontWeight="bold" border="none" 
                                                _hover={{ bg: "#E5E5E5" }} display="flex" gap={2}
                                                onClick={() => handleActionRequest(req.id, 'approve')}
                                                disabled={processingId !== null}
                                            >
                                                {isApproving ? <Spinner size="sm" /> : <><Icon as={LuCheck} color="#5cac7d" strokeWidth="3" /> Approve</>}
                                            </Button>
                                            <Button 
                                                flex={1} size="sm" h="36px" variant="outline" borderColor="#333333" bg="#0A0A0A" color="white" rounded="none" fontWeight="bold" 
                                                _hover={{ bg: "#1A1A1A" }} display="flex" gap={2}
                                                onClick={() => handleActionRequest(req.id, 'reject')}
                                                disabled={processingId !== null}
                                            >
                                                {isRejecting ? <Spinner size="sm" color="red.400" /> : <><Icon as={LuX} color="red.400" strokeWidth="3" /> Reject</>}
                                            </Button>
                                        </Flex>
                                    </Box>
                                );
                            })}
                        </Flex>
                    )}
                </Box>
            </Grid>
            
            {/* Mount Modal */}
            <QuickViewDrawer 
                isOpen={selectedEntity !== null} 
                entity={selectedEntity} 
                onClose={() => setSelectedEntity(null)} 
                onNavigate={(path) => router.push(path)}
            />
        </Box>
    );
}