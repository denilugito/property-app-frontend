import { AxiosResponse } from "axios";
import { api } from "./axios"
import { Property } from "@/types/Property";
import { Page } from "@/types/PageArrayContent";

export interface PropertyQuery {
    page?: number;
    size?: number;
    sort?: string;
}

export interface PropertySearchRequest {
    keyword?: string;
    type?: "SALE" | "RENT";
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
}

export const getProperties = (
    params: PropertyQuery = {}
): Promise<AxiosResponse<Page<Property>>> => 
    api.get("/api/properties",{ params });

export const getPropertyById = (
    id: number
) : Promise<AxiosResponse<Property>> => api.get(`api/properties/${id}`);

export const searchProperties = (
    req: PropertySearchRequest,
    params: PropertyQuery
) => {
    return api.post<Page<Property>> (
        "/api/properties/search",
        req,
        { params }
    )
}