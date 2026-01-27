import { AxiosResponse } from "axios";
import { api } from "./axios"
import { Property } from "@/types/Property";
import { Page } from "@/types/PageArrayContent";

export const getProperties = (): Promise<AxiosResponse<Page<Property>>> => api.get("/api/properties");

export const getPropertyById = (
    id: number
) : Promise<AxiosResponse<Property>> => api.get(`api/properties/${id}`);