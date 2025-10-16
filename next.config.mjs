/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
            rules: {}, // disable turbopack chunk optimization
    },
  },
    webpack: (config) => {
        config.optimization.moduleIds = 'deterministic'; // stabilisasi modul ID
        return config;
  },
};

export default nextConfig;
