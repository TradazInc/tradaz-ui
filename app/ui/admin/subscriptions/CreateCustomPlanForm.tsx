"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Input, Button, Icon, SimpleGrid, VStack } from "@chakra-ui/react";
import { LuArrowLeft, LuSave } from "react-icons/lu";
import { Subscription, PlanTier } from "@/app/hooks/useAdminSubscriptions";

const controlStyles = { bg: "#121214", border: "1px solid", borderColor: "whiteAlpha.200", color: "white", h: "44px", rounded: "lg", px: 4, _focus: { outline: "none", borderColor: "#5cac7d" }, _hover: { bg: "whiteAlpha.50" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#121214", color: "white", height: "44px", borderRadius: "8px", padding: "0 16px", border: "1px solid rgba(255, 255, 255, 0.2)", outline: "none", cursor: "pointer", fontSize: "14px" };

interface CreateCustomPlanFormProps {
    onBack: () => void;
    onSubmit: (sub: Subscription) => void;
}

export const CreateCustomPlanForm = ({ onBack, onSubmit }: CreateCustomPlanFormProps) => {
    const [tenant, setTenant] = useState("");
    const [owner, setOwner] = useState("");
    const [plan, setPlan] = useState<PlanTier>("Enterprise");
    const [cycle, setCycle] = useState<"Monthly" | "Annually">("Annually");
    const [amount, setAmount] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Calculate mock next billing date
        const today = new Date();
        if (cycle === "Monthly") today.setMonth(today.getMonth() + 1);
        else today.setFullYear(today.getFullYear() + 1);
        
        const nextBillingFormatted = today.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

        const newSubscription: Subscription = {
            id: `SUB-${Math.floor(Math.random() * 90000) + 10000}`, // E.g. SUB-45921
            tenant: tenant || "New Custom Shop",
            owner: owner || "Shop Owner",
            plan: plan,
            cycle: cycle,
            amount: Number(amount) || 0,
            status: "active",
            startedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            nextBilling: nextBillingFormatted
        };

        onSubmit(newSubscription);
    };

    return (
        <Box animation="fade-in 0.3s ease">
            <Flex align="center" gap={4} mb={8}>
                <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }} onClick={onBack} px={2}>
                    <Icon as={LuArrowLeft} boxSize="20px" />
                </Button>
                <Box>
                    <Text color="white" fontWeight="bold" fontSize="2xl">Create Custom Plan</Text>
                    <Text color="gray.400" fontSize="sm">Onboard a tenant with a specialized billing tier.</Text>
                </Box>
            </Flex>

            <Box as="form" onSubmit={handleSubmit} bg="#1A1C23" p={6} rounded="2xl" border="1px solid" borderColor="whiteAlpha.100">
                <VStack gap={6} align="stretch">
                    
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                        <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Tenant (Shop Name)</Text>
                            <Input 
                                placeholder="e.g. Lagos Streetwear Co." 
                                value={tenant} onChange={(e) => setTenant(e.target.value)}
                                {...controlStyles} required
                            />
                        </Box>
                        <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Owner Name</Text>
                            <Input 
                                placeholder="e.g. Jane Doe" 
                                value={owner} onChange={(e) => setOwner(e.target.value)}
                                {...controlStyles} required
                            />
                        </Box>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                        <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Plan Tier</Text>
                            <select value={plan} onChange={(e) => setPlan(e.target.value as PlanTier)} style={nativeSelectStyle}>
                                <option value="Basic" style={{ background: "#1A1C23" }}>Basic</option>
                                <option value="Pro" style={{ background: "#1A1C23" }}>Pro</option>
                                <option value="Enterprise" style={{ background: "#1A1C23" }}>Enterprise</option>
                            </select>
                        </Box>

                        <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Billing Cycle</Text>
                            <select value={cycle} onChange={(e) => setCycle(e.target.value as "Monthly" | "Annually")} style={nativeSelectStyle}>
                                <option value="Monthly" style={{ background: "#1A1C23" }}>Monthly</option>
                                <option value="Annually" style={{ background: "#1A1C23" }}>Annually</option>
                            </select>
                        </Box>

                        <Box>
                            <Text color="gray.400" fontSize="sm" fontWeight="bold" mb={2}>Custom Amount (₦)</Text>
                            <Input 
                                type="number" placeholder="e.g. 150000" 
                                value={amount} onChange={(e) => setAmount(e.target.value)}
                                {...controlStyles} required
                            />
                        </Box>
                    </SimpleGrid>

                    <Box pt={4} borderTop="1px solid" borderColor="whiteAlpha.100" display="flex" justifyContent="flex-end" gap={3}>
                        <Button variant="ghost" color="gray.400" _hover={{ color: "white", bg: "whiteAlpha.100" }} onClick={onBack}>
                            Cancel
                        </Button>
                        <Button type="submit" bg="#5cac7d" color="white" _hover={{ bg: "#4a9c6d" }} px={8}>
                            <Icon as={LuSave} mr={2} /> Save & Activate Plan
                        </Button>
                    </Box>

                </VStack>
            </Box>
        </Box>
    );
};