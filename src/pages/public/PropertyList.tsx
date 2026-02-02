import { getProperties, PropertySearchRequest, searchProperties } from "@/api/propertyApi";
import PropertyCard from "@/components/property/PropertyCard";
import { Page } from "@/types/PageArrayContent";
import { Property } from "@/types/Property";
import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import getPaginationPages from "../util/Pagination";
import PropertySearchInline from './PropertySearchInline';

export default function PropertyList() {
    const [pageData, setPageData] = useState<Page<Property> | null>(null);
    const [page, setPage]  = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // -- Search state variables
    const [searchReq, setSearchReq] = useState<PropertySearchRequest>({});
    const [searchInput, setSearchInput] = useState<PropertySearchRequest>({});

    useEffect(() => {
        let mounted = true;
        setLoading(true);

        searchProperties(searchReq, { page, size: 10 })
            .then(res => {
                if (mounted) setPageData(res.data);
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
    }, [page, searchReq]);

    if (loading) {
        return (
            <Layout>
                <div className="text-white text-center py-20">Loading...</div>
            </Layout>
        )
    }

    if (error) {
        return (
            <Layout>
                <div className="text-red-400 text-center py-20">{error}</div>
            </Layout>
        )
    }

    const onSearch = (/*req: PropertySearchRequest*/) => {
        setPage(0);
        setSearchReq(searchInput);
    }

    return (
        <Layout>
            <div className="max-w-7xl mx-auto p-4">
                {/* SEARCH BAR */}
                <PropertySearchInline
                    value={searchInput}
                    onChange={setSearchInput}
                    onSubmit={onSearch}
                />

                {pageData?.content.length == 0 ? (
                    <div className="text-white text-center py-20">
                        <p className="text-xl">No Properties Found at the moment</p>
                    </div>
                ) : (
                    <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">            
                        {pageData?.content.map(p => (                
                            <PropertyCard key={p.id} property={p} />                    
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center gap-2 mt-8 text-white select-none">
                        {/* Prev */}
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(p => Math.max(p - 1, 0))}
                            className="px-3 py-2 rounded bg-gray-700 disabled:opacity-40"
                        >
                            ‹
                        </button>
                        
                        {/* Page Numbers */}
                        {getPaginationPages(page, pageData!.totalPages, 7).map((p, idx) => 
                            p === "..." ? (
                                <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`px-3 py-2 rounded text-sm transition
                                        ${
                                            p === page
                                                ? "bg-blue-600 text-white font-semibold"
                                                : "bg-gray-700 hover:bg-gray-600"
                                        }`}
                                >
                                    {p + 1}
                                </button>    
                            )    
                        )}

                        {/* Next */}
                        <button
                            disabled={page >= pageData!.totalPages - 1}
                            onClick={() =>
                                setPage(p => Math.min(p + 1, pageData!.totalPages - 1))
                            }
                            className="px-3 py-2 rounded bg-gray-700 disabled:opacity-40"
                        >
                            ›
                        </button>

                    </div>
                    </>
                )}
            </div>
        </Layout>
    )
}
