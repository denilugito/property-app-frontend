import { getPropertyById } from "@/api/propertyApi";
import PropertyDetail from "@/components/property/PropertyDetail";
import { Property } from "@/types/Property";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PropertyDetailPage() {
    const { id } = useParams();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        getPropertyById(Number(id))
            .then((res) => setProperty(res.data))
            .finally(() => setLoading(false));
    }, [id])

    if (loading) return <div className="p-10 text-white">Loading...</div>;
    if (!property) return <div className="p-10 text-white">Not Found</div>;

    return <PropertyDetail property={ property } />;
}