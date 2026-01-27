
import { Property } from '@/types/Property';
import { useNavigate } from 'react-router-dom';
export default function PropertyCard({ property } : {property : Property }) {
    const navigate = useNavigate();

    return (
        <div
            className="property-card"
            onClick={() => navigate(`/properties/${property.id}`)}
        >
            <div className="property-header">
                <h3>{property.title}</h3>
                {property.hasPanorama && (
                    <span className="panorama-badge">360</span>
                )}
            </div>

            <div className="property-price">
                Rp {property.price.toLocaleString("id-ID")}
            </div>

            <div className="property-meta">
                <span>{property.bedrooms} BR</span>
                <span>{property.bathrooms} BA</span>
                <span>{property.area} m2</span>
            </div>

            <div className="property-footer">
                <span className="property-type">{property.type}</span>
                <span className='agent-name'>Agent: {property.agentName}</span>
            </div>
        </div>
    )
}