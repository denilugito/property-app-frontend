export default function PropertyDetailSkeleton() {
    return (
        <div className="min-h-screen bg-[#0a0f1e] text-white">
            <div className="max-w-[1400px] mx-auto px-5 py-5 animate-pulse">

                {/* Breadcrumb */}
                <div className="h-4 w-64 bg-white/10 rounded mb-6" />

                {/* Image */}
                <div className="h-[280px] md:h-[420px] bg-white/10 rounded-2xl mb-4" />
                
                {/* Thumbhanils */}
                <div className="flex gap-3 mb-8 overflow-hidden">
                    {Array.from({ length: 5}).map((_,i) => (
                        <div
                            key={i}
                            className="h-[70px] w-[100px] bg-white/10 rounded-xl flex-shrink-0"
                        />
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title */}
                        <div className="h-8 w-3/4 bg-white/10 rounded" />

                        {/* Price */}
                        <div className="h-10 w-1/2 bg-blue-500/20 rounded" />

                        {/* Location */}
                        <div className="h-4 w-2/3 bg-white/10 rounded "/>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {Array.from({ length: 3}).map((_, i) => (
                                <div key={i} className="h-24 bg-white/10 rounded-xl"/>  
                            ))}
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <div className="h-5 w-40 bg-white/10 rounded" />
                            <div className="h-4 w-full bg-white/10 rounded"/>
                            <div className="h-4 w-5/6 bg-white/10 rounded"/>
                            <div className="h-4 w-4/6 bg-white/10 rounded" />
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-3">
                            {Array.from({ length : 6}).map((_, i) => (
                                <div key={i} className="h-10 bg-white/10 rounded-lg"/>
                            ))}
                        </div>
                    </div>

                        {/* RIGHT */}
                    <div className="space-y-6">
                        {/* Agent Card */}
                        <div className="bg-white/5 p-6 rounded-2xl space-y-4">
                        <div className="h-16 w-16 bg-white/10 rounded-full mx-auto" />
                        <div className="h-4 w-32 bg-white/10 rounded mx-auto" />
                        <div className="h-4 w-24 bg-white/10 rounded mx-auto" />

                        <div className="h-10 bg-blue-500/20 rounded-lg" />
                            <div className="h-10 bg-white/10 rounded-lg" />
                            <div className="h-10 bg-white/10 rounded-lg" />
                        </div>

                        {/* Property Meta */}
                        <div className="bg-white/5 p-5 rounded-xl space-y-3">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-4 bg-white/10 rounded" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}