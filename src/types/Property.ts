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
    agentName?: string | null;

    // paging related properties
    number: number;
    totalPages: number;
    first: boolean;

    // address related information
    address? : {
        province?: string;
        city?: string;
        district?: string;
        subDistrict?: string;
        postalCode?: string;
    }

    // List Property Images (Optional for main property listing)
    propertyImages?: {
        imageUrl?: string;
        isPrimary?: boolean;
        displayOrder ?: number;
    }[]; 
}