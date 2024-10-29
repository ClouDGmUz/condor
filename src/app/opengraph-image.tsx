import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Condor'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '128px', fontWeight: 'bold' }}>Condor</div>
          <div style={{ fontSize: '48px', marginTop: '20px' }}>Modern Business Solutions</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 