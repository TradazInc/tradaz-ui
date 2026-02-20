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
                <Heading size="md" color="white">What keeps you busy?</Heading>
                <Text fontSize="sm" color="gray.400">Select your business type</Text>
            </Box>

            <SimpleGrid columns={[3, 4]} gap={4} w="full">
                {CATEGORIES.map((cat) => {
                    const isSelected = data.category === cat.id;
                    return (
                        <VStack
                            key={cat.id} gap={2} cursor="pointer" onClick={() => update({ category: cat.id })}
                            opacity={isSelected ? 1 : 0.6} transition="all 0.2s"
                            _hover={{ opacity: 1, transform: 'translateY(-2px)' }}
                        >
                            <Box
                                bg="#171923" w={{ base: 14, sm: 16 }} h={{ base: 14, sm: 16 }} borderRadius="full"
                                display="flex" alignItems="center" justifyContent="center"
                                border="2px solid" borderColor={isSelected ? "#5cac7d" : "whiteAlpha.100"}
                                fontSize="2xl" shadow={isSelected ? `0 0 15px rgba(92, 172, 125, 0.3)` : "none"}
                                transition="all 0.2s"
                            >
                                {cat.icon}
                            </Box>
                            <Text fontSize="xs" fontWeight={isSelected ? "bold" : "medium"} color={isSelected ? "#5cac7d" : "gray.400"} textAlign="center">
                                {cat.label}
                            </Text>
                        </VStack>
                    )
                })}
            </SimpleGrid>

           {/* Side-by-side buttons to save vertical space */}
            <HStack pt={4} w="full" gap={3}>
                <Button variant="ghost" onClick={onBack} size="lg" color="gray.500" _hover={{ bg: "whiteAlpha.50", color: "white" }}>
                    Back
                </Button>
                <Button
                    flex="1" 
                    size="lg" bg="#5cac7d" color="white" onClick={onNext} disabled={!data.category}
                    _hover={{ bg: "#4a9c6d" }} _disabled={{ opacity: 0.5, cursor: "not-allowed", bg: "whiteAlpha.200", color: "gray.400" }} transition="all 0.2s ease"
                >
                    Continue
                </Button>
            </HStack>
        </VStack>
    );
}