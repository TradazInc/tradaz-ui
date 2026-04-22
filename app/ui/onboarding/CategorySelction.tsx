'use client';
import { VStack, SimpleGrid, Box, Text, Button, Heading, HStack } from '@chakra-ui/react';
import { StepFormProps } from '@/app/lib/definitions';

const CATEGORIES = [
    { id: 'restaurant', label: 'Restaurant', icon: '🍽️' }, { id: 'cafe', label: 'Cafe', icon: '☕' },
    { id: 'grocery', label: 'Grocery', icon: '🍌' }, { id: 'bakery', label: 'Bakery', icon: '🧁' },
    { id: 'ecommerce', label: 'Ecommerce', icon: '🛒' }, { id: 'apparel', label: 'Apparel', icon: '👕' },
    { id: 'health', label: 'Health', icon: '💊' }, { id: 'electronics', label: 'Electronics', icon: '🎧' },
    { id: 'digital', label: 'Digital', icon: '💻' }, { id: 'spa', label: 'Spa', icon: '🧖‍♀️' },
    { id: 'salons', label: 'Salons', icon: '💇' }, { id: 'hotels', label: 'Hotels', icon: '🏨' },
];

export function CategorySelection({ data, update, onNext, onBack }: StepFormProps) {
    return (
        <VStack gap={6} align="stretch" w="full">
            <Box textAlign="center" mb={2}>
                <Heading size="md" color="white" letterSpacing="tight">What keeps you busy?</Heading>
                <Text fontSize="13px" color="#888888" mt={1}>Select your business type</Text>
            </Box>

            <SimpleGrid columns={[3, 4]} gap={4} w="full">
                {CATEGORIES.map((cat) => {
                    const isSelected = data.category === cat.id;
                    return (
                        <VStack
                            key={cat.id} gap={2} cursor="pointer" onClick={() => update({ category: cat.id })}
                            opacity={isSelected ? 1 : 0.5} transition="all 0.2s"
                            _hover={{ opacity: 1, transform: 'translateY(-2px)' }}
                        >
                            
                            <Box
                                bg={isSelected ? "#111111" : "#0A0A0A"} 
                                w={{ base: 14, sm: 16 }} h={{ base: 14, sm: 16 }} 
                                rounded="none"
                                display="flex" alignItems="center" justifyContent="center"
                                border="1px solid" borderColor={isSelected ? "white" : "#333333"}
                                fontSize="2xl" shadow="none"
                                transition="all 0.2s"
                            >
                                {cat.icon}
                            </Box>
                            <Text fontSize="12px" fontWeight={isSelected ? "600" : "500"} color={isSelected ? "white" : "#888888"} textAlign="center">
                                {cat.label}
                            </Text>
                        </VStack>
                    )
                })}
            </SimpleGrid>

            {/* Side-by-side buttons to save vertical space */}
            <HStack pt={4} w="full" gap={3}>
                
                <Button 
                    variant="ghost" onClick={onBack} size="lg" 
                    color="#888888" rounded="none" fontSize="14px" fontWeight="600"
                    _hover={{ bg: "#1A1A1A", color: "white" }}
                >
                    Back
                </Button>
                
                
                <Button
                    flex="1" 
                    size="lg" bg="white" color="black" rounded="none" fontWeight="bold" fontSize="14px"
                    onClick={onNext} disabled={!data.category}
                    _hover={{ bg: "#E5E5E5" }} 
                    _disabled={{ opacity: 1, cursor: "not-allowed", bg: "#1A1A1A", color: "#666666" }} 
                    transition="all 0.2s ease"
                >
                    Continue
                </Button>
            </HStack>
        </VStack>
    );
}