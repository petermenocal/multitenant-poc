import('next').NextConfig;
const nextConfig = {
        "rewrites": [
          {
            "source": "/:path*",
            "has": [
              {
                "type": "host",
                "value": "test-b2c.petermenocal.com"
              }
            ],
            "destination": "/b2b/:path*"
          },
          {
            "source": "/:path*",
            "has": [
              {
                "type": "host",
                "value": "test-b2b.petermenocal.com"
              }
            ],
            "destination": "/b2c/:path*"
          }
        ]
};

export default nextConfig;
