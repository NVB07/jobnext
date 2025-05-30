/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatar.vercel.sh",
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "images.vietnamworks.com",
            },
        ],
    },
    webpack: (config) => {
        config.externals = [...config.externals, { canvas: "canvas" }]; // required to make Konva & react-konva work
        return config;
    },
};

module.exports = nextConfig;
