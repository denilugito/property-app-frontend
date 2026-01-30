import { getProperties } from "@/api/propertyApi";
import PropertyCard from "@/components/property/PropertyCard";
import { Page } from "@/types/PageArrayContent";
import { Property } from "@/types/Property";
import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";

export default function PropertyList() {
    const [page, setPage] = useState<Page<Property> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;

        getProperties()
            .then(res => {
                if (mounted) setPage(res.data);
            })
            .catch(() => {
                if (mounted) setError("Failed to load properties");
            })
            .finally(() => {
                if(mounted) setLoading(false);
            });

            return () => {
                mounted = false;
            };
    }, []);

    return (
        <Layout>
            <div className="max-w-7xl mx-auto p-4">
                {page?.content.length == 0 ? (
                    <div className="text-white text-center py-20">
                        <p className="text-xl">No Properties Found at the moment</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">            
                        {page?.content.map(p => (                
                            <PropertyCard key={p.id} property={p} />                    
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    )
}
