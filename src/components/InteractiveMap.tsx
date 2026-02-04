import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const platforms = [
  { 
    id: 1, 
    name: 'Plataforma Atlântico Sul', 
    lat: -22.9, 
    lng: -40.1, 
    country: 'Brasil',
    production: '180k barris/dia',
    type: 'Produção'
  },
  { 
    id: 2, 
    name: 'Deepwater Horizon II', 
    lat: 28.7, 
    lng: -88.4, 
    country: 'EUA',
    production: '250k barris/dia',
    type: 'Produção'
  },
  { 
    id: 3, 
    name: 'North Sea Alpha', 
    lat: 57.5, 
    lng: 1.5, 
    country: 'Reino Unido',
    production: '120k barris/dia',
    type: 'Produção'
  },
  { 
    id: 4, 
    name: 'West Africa Delta', 
    lat: 4.5, 
    lng: 6.8, 
    country: 'Nigéria',
    production: '200k barris/dia',
    type: 'Produção'
  },
  { 
    id: 5, 
    name: 'Persian Gulf Station', 
    lat: 26.2, 
    lng: 52.5, 
    country: 'EAU',
    production: '300k barris/dia',
    type: 'Produção'
  },
  { 
    id: 6, 
    name: 'Southeast Asia Hub', 
    lat: 1.3, 
    lng: 104.8, 
    country: 'Singapura',
    production: '150k barris/dia',
    type: 'Refino'
  },
  { 
    id: 7, 
    name: 'Campos Basin Deep', 
    lat: -23.5, 
    lng: -41.5, 
    country: 'Brasil',
    production: '220k barris/dia',
    type: 'Produção'
  },
  { 
    id: 8, 
    name: 'Angola Offshore', 
    lat: -6.3, 
    lng: 12.1, 
    country: 'Angola',
    production: '175k barris/dia',
    type: 'Produção'
  },
  { 
    id: 9, 
    name: 'Norwegian Shelf', 
    lat: 62.0, 
    lng: 5.5, 
    country: 'Noruega',
    production: '190k barris/dia',
    type: 'Produção'
  },
  { 
    id: 10, 
    name: 'Gulf of Mexico Central', 
    lat: 27.5, 
    lng: -91.0, 
    country: 'EUA',
    production: '280k barris/dia',
    type: 'Produção'
  },
  { 
    id: 11, 
    name: 'Wind Farm Atlantic', 
    lat: -25.0, 
    lng: -44.5, 
    country: 'Brasil',
    production: '1.2 GW',
    type: 'Eólica'
  },
  { 
    id: 12, 
    name: 'Wind Farm North Sea', 
    lat: 54.5, 
    lng: 3.5, 
    country: 'Reino Unido',
    production: '0.8 GW',
    type: 'Eólica'
  },
];

const InteractiveMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 8,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    mapInstanceRef.current = map;

    // Dark style tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Custom icon
    const createIcon = (type: string) => {
      const color = type === 'Eólica' ? '#22c55e' : type === 'Refino' ? '#3b82f6' : '#f97316';
      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 24px;
            height: 24px;
            background: ${color};
            border-radius: 50%;
            border: 3px solid rgba(255,255,255,0.3);
            box-shadow: 0 0 20px ${color}80, 0 0 40px ${color}40;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: pulse 2s infinite;
          ">
            <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
    };

    // Add markers
    platforms.forEach((platform) => {
      const marker = L.marker([platform.lat, platform.lng], {
        icon: createIcon(platform.type)
      }).addTo(map);

      marker.bindPopup(`
        <div style="
          background: linear-gradient(180deg, hsl(222 47% 10%) 0%, hsl(222 47% 6%) 100%);
          padding: 16px;
          border-radius: 12px;
          min-width: 200px;
          color: white;
          font-family: 'Inter', sans-serif;
        ">
          <div style="
            font-size: 10px;
            color: #f97316;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 4px;
          ">${platform.type}</div>
          <div style="font-size: 16px; font-weight: 700; margin-bottom: 8px;">${platform.name}</div>
          <div style="font-size: 12px; color: #94a3b8; margin-bottom: 4px;">📍 ${platform.country}</div>
          <div style="font-size: 14px; font-weight: 600; color: #f97316;">⚡ ${platform.production}</div>
        </div>
      `, {
        className: 'custom-popup',
        closeButton: false,
      });
    });

    // Add custom CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.8; }
      }
      .custom-popup .leaflet-popup-content-wrapper {
        background: transparent;
        box-shadow: none;
        padding: 0;
      }
      .custom-popup .leaflet-popup-tip {
        background: hsl(222 47% 8%);
      }
      .leaflet-container {
        background: hsl(222 47% 4%);
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      style.remove();
    };
  }, []);

  return (
    <section className="py-24 bg-card-gradient relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-accent font-semibold tracking-widest uppercase text-sm">
            Presença Global
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Operações em <span className="text-gradient-accent">42 plataformas</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Explore nossas operações ao redor do mundo. Clique nos marcadores para ver detalhes de cada instalação.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-accent shadow-glow" />
            <span className="text-sm text-muted-foreground">Produção</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }} />
            <span className="text-sm text-muted-foreground">Refino</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.5)' }} />
            <span className="text-sm text-muted-foreground">Energia Eólica</span>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative rounded-2xl overflow-hidden border border-border shadow-elevated">
          <div 
            ref={mapRef} 
            className="w-full h-[500px] md:h-[600px]"
          />
          {/* Overlay gradient for edges */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/20 via-transparent to-background/20" />
        </div>

        {/* Stats below map */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="text-center p-4 border-gradient rounded-xl bg-card">
            <div className="text-2xl font-black text-accent">18</div>
            <div className="text-sm text-muted-foreground">Países</div>
          </div>
          <div className="text-center p-4 border-gradient rounded-xl bg-card">
            <div className="text-2xl font-black text-accent">42</div>
            <div className="text-sm text-muted-foreground">Plataformas</div>
          </div>
          <div className="text-center p-4 border-gradient rounded-xl bg-card">
            <div className="text-2xl font-black text-accent">8</div>
            <div className="text-sm text-muted-foreground">Refinarias</div>
          </div>
          <div className="text-center p-4 border-gradient rounded-xl bg-card">
            <div className="text-2xl font-black text-accent">5</div>
            <div className="text-sm text-muted-foreground">Parques Eólicos</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
