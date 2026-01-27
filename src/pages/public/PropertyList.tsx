import { getProperties } from "@/api/propertyApi";
import PropertyCard from "@/components/property/PropertyCard";
import { Page } from "@/types/PageArrayContent";
import { Property } from "@/types/Property";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function PropertyList() {
    const [page, setPage] = useState<Page<Property> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getProperties()
            .then(res => setPage(res.data))
            .catch(() => setError("Failed to load properties"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="property-list">
            {page?.content.map(p => (
                <PropertyCard key={p.id} property={p} />    
            ))}
        </div>
    )
}