'use client';
import { VStack, SimpleGrid, Box, Text, Button, Heading, Icon } from '@chakra-ui/react';

// The data matching your image
const CATEGORIES = [
    { id: 'restaurant', label: 'Restaurant', icon: '🍽️' },
    { id: 'cafe', label: 'Cafe', icon: '☕' },
    { id: 'grocery', label: 'Grocery', icon: '🍌' },
    { id: 'bakery', label: 'Bakery', icon: '🧁' },
    { id: 'ecommerce', label: 'Ecommerce', icon: '🛒' },
    { id: 'apparel', label: 'Apparel', icon: '👕' },
    { id: 'health', label: 'Health', icon: '💊' },
    { id: 'electronics', label: 'Electronics', icon: '🎧' },
    { id: 'digital', label: 'Digital', icon: '💻' },
    { id: 'spa', label: 'Spa', icon: '🧖‍♀️' },
    { id: 'salons', label: 'Salons', icon: '💇' },
    { id: 'hotels', label: 'Hotels', icon: '🏨' },
];

export function CategorySelection({ data, update, onNext, onBack }: any) {

    const handleSelect = (id: string) => {
        update({ category: id });
    };

    return (
        <VStack gap={6} align="stretch" w="full">
            <Box textAlign="center" mb={2}>
                <Heading size="md" color="gray.800">What keeps you busy?</Heading>
                <Text fontSize="sm" color="gray.500">Select your business type</Text>
            </Box>

            {/* The Grid */}
            <SimpleGrid columns={[3, 4]} gap={6} w="full">
                {CATEGORIES.map((cat) => {
                    const isSelected = data.category === cat.id;
                    return (
                        <VStack
                            key={cat.id}
                            gap={2}
                            cursor="pointer"
                            onClick={() => handleSelect(cat.id)}
                            opacity={isSelected ? 1 : 0.8}
                            transition="all 0.2s"
                            _hover={{ opacity: 1, transform: 'translateY(-2px)' }}
                        >
                            <Box
                                bg="white"
                                w="20"
                                h="20"
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                shadow={isSelected ? "md" : "sm"}
                                border="2px solid"
                                borderColor={isSelected ? "#5cac7d" : "transparent"} // Green ring if selected
                                fontSize="3xl"
                            >
                                {cat.icon}
                            </Box>
                            <Text
                                fontSize="xs"
                                fontWeight={isSelected ? "bold" : "medium"}
                                color={isSelected ? "#5cac7d" : "gray.600"}
                            >
                                {cat.label}
                            </Text>
                        </VStack>
                    )
                })}
            </SimpleGrid>

            <Box pt={4}>
                <Button
                    size="lg"
                    w="full"
                    bg="#5cac7d"
                    color="white"
                    _hover={{ bg: "#4a9c6d" }}
                    onClick={onNext}
                    disabled={!data.category}
                >
                    Continue
                </Button>
                <Button variant="ghost" w="full" mt={2} onClick={onBack} size="sm" color="gray.500">
                    Back
                </Button>
            </Box>
        </VStack>
    );
}