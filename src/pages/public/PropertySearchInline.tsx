import { PropertySearchRequest } from '@/api/propertyApi';

interface PropertySearchInlineProps {
    value: PropertySearchRequest;
    onChange: (val : PropertySearchRequest) => void;
    onSubmit: () => void;
}


export default function PropertySearchInline( prop : PropertySearchInlineProps) {
    return (
        <div className="bg-gray-800 p-4 rounded mb-6 flex flex-wrap gap-3">
            <input 
                type="text"
                value={prop.value.keyword}
                placeholder="Search Title / Location" 
                className="px-3 py-2 rounded bg-gray-700 text-white"
                onChange={(e) => 
                    prop.onChange({
                        ...prop.value,
                        keyword: e.target.value
                    })
                }
            />

            <select 
                className="px-3 py-2 rounded bg-gray-700 text-white"
                value={prop.value.type}
                onChange={(e) => 
                    prop.onChange({
                        ...prop.value,
                        type: e.target.value === "" 
                            ? undefined
                            : (e.target.value as "SALE" | "RENT")
                    })

                }
            >
                <option value="">ALL</option>
                <option value="SALE">Sale</option>
                <option value="RENT">Rent</option>
            </select>

            <button
                onClick={prop.onSubmit}
                className="px-4 py-2 bg-blue-600 rounded text-white"
            >
                Search
            </button>
        </div>
    )
}