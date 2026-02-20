

// subdomains for our simulation
const TAKEN_SUBDOMAINS = [
    'shop',
    'store',
    'fashion',
    'admin',
    'test',
    'tradaz',
    'app',
    'api'
];

// Simulated async API call to check availability
export const checkSubdomainAvailability = async (subdomain: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Returns true if the subdomain is NOT in our taken list
            resolve(!TAKEN_SUBDOMAINS.includes(subdomain.toLowerCase()));
        }, 600); // 600ms artificial network delay
    });
};