export type Property = {
    id: number;
    title: string;
    description?: string;
    price: number;
    type: "SALE" | "RENT";

    bedrooms?: number;
    bathrooms?: number;
    area?: number;

    hasPanorama: boolean;
    createdAt: string; // ISO string from backend
    imageUrl: string;

    // agentId: number; --> do not expose this yet
    agentName: string;
}