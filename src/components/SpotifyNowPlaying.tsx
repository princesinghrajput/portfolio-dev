"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Disc, ExternalLink } from 'lucide-react';

const token = 'BQAvy-EglHdk2uR3QrXLnSFdUVAP65moURoNBFo3s0ex8q--ropsaTbDHw6NnDiKHFCMNABIXE3NzIgS_1De53PueN9_AVS3Nghh38ncxu_VoCCBFnaHgAKkem3QzV8yYrko9FCqOHrabwp6zudp7FuhusP2pQoQvOW79cMPbcggwVsLzU9OKzCEz1ka2np6qKTKXtbae96y1zAa1IAHcIEY7hj6WTtYnTSG33LV1PotHQ2KcHmDsAy-Bqk1gevIWylCq0EiV39hCuAms_q3I64orvQVaJY2O807o2h1pEezWQUKV7R8IdGNQl7_iPlkxpzh';

interface Track {
    name: string;
    artists: { name: string }[];
    external_urls: { spotify: string };
    album: { images: { url: string }[] };
}

async function fetchWebApi(endpoint: string, method: string) {
    try {
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method,
        });
        if (!res.ok) throw new Error('Spotify API Error');
        return await res.json();
    } catch (e) {
        console.error(e);
        return null;
    }
}

const SpotifyNowPlaying = () => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTopTracks = async () => {
            const data = await fetchWebApi(
                'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
            );
            if (data && data.items) {
                setTracks(data.items);
            }
            setLoading(false);
        };

        getTopTracks();
    }, []);

    if (loading) return null;

    return (
        <motion.div
            className="card-premium p-3 sm:p-4 mt-3"
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="flex items-center gap-2 mb-3">
                <Music className="w-4 h-4 text-green-500 animate-pulse" />
                <h3 className="text-xs sm:text-sm font-semibold">On Repeat</h3>
            </div>

            <div className="space-y-3">
                {tracks.slice(0, 3).map((track, i) => (
                    <a
                        key={i}
                        href={track.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group"
                    >
                        <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted">
                            {track.album.images[0] && (
                                <img
                                    src={track.album.images[0].url}
                                    alt={track.name}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Disc className="w-4 h-4 text-white animate-spin-slow" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate group-hover:text-green-500 transition-colors">
                                {track.name}
                            </p>
                            <p className="text-[10px] text-muted-foreground truncate">
                                {track.artists.map(a => a.name).join(', ')}
                            </p>
                        </div>
                    </a>
                ))}
            </div>

            <div className="mt-3 pt-2 border-t border-border/50 text-[10px] text-muted-foreground flex justify-between items-center">
                <span>Spotify Top Tracks</span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            </div>
        </motion.div>
    );
};

export default SpotifyNowPlaying;
