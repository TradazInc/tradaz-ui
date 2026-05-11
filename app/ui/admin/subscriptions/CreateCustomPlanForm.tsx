"use client";
import React, { useState } from "react";
import { Box, Flex, Text, Input, Button, Icon, SimpleGrid, VStack } from "@chakra-ui/react";
import { LuArrowLeft, LuSave } from "react-icons/lu";
import { Subscription, PlanTier } from "@/app/hooks/useAdminSubscriptions";

const controlStyles = { bg: "#0A0A0A", border: "1px solid", borderColor: "#333333", color: "white", h: "44px", rounded: "none", px: 4, _focus: { outline: "none", borderColor: "white" }, _hover: { bg: "#111111" } };
const nativeSelectStyle: React.CSSProperties = { width: "100%", backgroundColor: "#0A0A0A", color: "white", height: "44px", borderRadius: "0px", padding: "0 16px", border: "1px solid #333333", outline: "none", cursor: "pointer", fontSize: "14px" };
const labelStyles = { color: "#888888", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "wider", mb: 2, display: "block" };

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
                <Button variant="ghost" color="#888888" rounded="none" _hover={{ color: "white", bg: "#111111" }} onClick={onBack} px={2} h="44px">
                    <Icon as={LuArrowLeft} boxSize="20px" strokeWidth="2.5" />
                </Button>
                <Box>
                    <Text color="white" fontWeight="black" fontSize="2xl" letterSpacing="tight">Create Custom Plan</Text>
                    <Text color="#888888" fontSize="sm">Onboard a tenant with a specialized billing tier.</Text>
                </Box>
            </Flex>

            <Box as="form" onSubmit={handleSubmit} bg="#0A0A0A" p={6} rounded="none" border="1px solid" borderColor="#1A1A1A">
                <VStack gap={6} align="stretch">
                    
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                        <Box>
                            <Text as="label" {...labelStyles}>Tenant (Shop Name)</Text>
                            <Input 
                                placeholder="e.g. Lagos Streetwear Co." 
                                value={tenant} onChange={(e) => setTenant(e.target.value)}
                                {...controlStyles} required
                            />
                        </Box>
                        <Box>
                            <Text as="label" {...labelStyles}>Owner Name</Text>
                            <Input 
                                placeholder="e.g. Jane Doe" 
                                value={owner} onChange={(e) => setOwner(e.target.value)}
                                {...controlStyles} required
                            />
                        </Box>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
                        <Box>
                            <Text as="label" {...labelStyles}>Plan Tier</Text>
                            <select value={plan} onChange={(e) => setPlan(e.target.value as PlanTier)} style={nativeSelectStyle}>
                                <option value="Basic" style={{ background: "#000000" }}>Basic</option>
                                <option value="Pro" style={{ background: "#000000" }}>Pro</option>
                                <option value="Enterprise" style={{ background: "#000000" }}>Enterprise</option>
                            </select>
                        </Box>

                        <Box>
                            <Text as="label" {...labelStyles}>Billing Cycle</Text>
                            <select value={cycle} onChange={(e) => setCycle(e.target.value as "Monthly" | "Annually")} style={nativeSelectStyle}>
                                <option value="Monthly" style={{ background: "#000000" }}>Monthly</option>
                                <option value="Annually" style={{ background: "#000000" }}>Annually</option>
                            </select>
                        </Box>

                        <Box>
                            <Text as="label" {...labelStyles}>Custom Amount (₦)</Text>
                            <Input 
                                type="number" placeholder="e.g. 150000" 
                                value={amount} onChange={(e) => setAmount(e.target.value)}
                                {...controlStyles} required
                            />
                        </Box>
                    </SimpleGrid>

                    <Box pt={6} mt={2} borderTop="1px solid" borderColor="#1A1A1A" display="flex" justifyContent="flex-end" gap={3}>
                        <Button variant="outline" borderColor="#333333" color="#888888" bg="#0A0A0A" h="44px" rounded="none" _hover={{ color: "white", bg: "#111111" }} onClick={onBack}>
                            Cancel
                        </Button>
                        <Button type="submit" bg="white" color="black" border="none" rounded="none" h="44px" px={8} fontWeight="bold" _hover={{ bg: "#E5E5E5" }} display="flex" gap={2}>
                            <Icon as={LuSave} strokeWidth="2.5" /> Save & Activate Plan
                        </Button>
                    </Box>

                </VStack>
            </Box>
        </Box>
    );
};