import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { room, sector } = req.query;

  if (!room || !sector) {
    return res.status(400).json({ error: 'Room and sector parameters are required' });
  }

  const sectorNumber = sector.toString().replace('sector-', '');
  
  const manifest = {
    id: `/room/${room}/control/${sector}`,
    name: `Coastal Game - Room ${room} Sector ${sectorNumber}`,
    short_name: `Room ${room} S${sectorNumber}`,
    description: `Coastal protection controller for Room ${room}, Sector ${sectorNumber}`,
    start_url: `/room/${room}/control/${sector}`,
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    orientation: 'landscape',
    prefer_related_applications: false,
    icons: [
      {
        src: '/assets/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/assets/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/assets/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/assets/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/assets/logo.png',
        sizes: '48x48 72x72 96x96 128x128 256x256',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    categories: ['games', 'productivity'],
    lang: 'en',
    dir: 'ltr'
  };

  res.setHeader('Content-Type', 'application/manifest+json');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  
  return res.json(manifest);
}