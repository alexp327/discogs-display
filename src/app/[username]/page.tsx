'use client';
import React, { use, useEffect, useState } from 'react';
import { DiscogsRelease } from '@/types/release';
// import AlbumDisplay from '@/components/album-display';
import Image from 'next/image';
import Link from 'next/link';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface apiResponse {
  pagination: {
    page: number;
    pages: number;
    per_page: number;
    items: number;
    urls: {
      last: string;
      next: string;
    };
  };
  releases: DiscogsRelease[];
}

export default function UsernameDisplayPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const [data, setData] = useState<apiResponse | null>(null);
  const [testArr, setTestArr] = useState<DiscogsRelease[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/discogs?username=${username}`, {
        cache: 'no-store',
      });
      const json: apiResponse = await res.json();
      setData(json);
      // set testArr to the first 10 releases
      setTestArr(json.releases.slice(0, 5));
    }
    fetchData();
  }, [username]);

  return (
    <div>
      <h1 className='text-center py-12 text-4xl font-bold'>
        {username}’s Collection
      </h1>
      {data && (
        <div
          className="relative mx-20 overflow-hidden flex flex-nowrap group-slide py-12 
          before:absolute before:top-0 before:left-0 before:w-26 before:h-full before:content-[''] before:z-[2] before:bg-gradient-to-l before:from-transparent before:to-background 
          after:absolute after:top-0 after:right-0 after:w-26 after:h-full after:content-[''] after:z-[2] after:bg-gradient-to-r after:from-transparent after:to-background"
        >
          <div className='flex pl-16 gap-16 animate-slide'>
            {testArr.map((release) => (
              <Link
                key={release.release_id}
                href={`https://discogs.com/release/${release.release_id}`}
                target='_blank'
                className='relative group/link w-sm'
              >
                <AspectRatio ratio={1}>
                  <Image
                    src={release.cover_image}
                    alt={release.title}
                    width={576}
                    height={576}
                    className='w-full h-full'
                  />
                </AspectRatio>
                <div className='absolute inset-0 flex flex-col justify-center items-center bg-black/0 opacity-0 group-hover/link:opacity-100 group-hover/link:bg-black/60 transition-all duration-200 text-center'>
                  <p className='text-lg font-bold'>{release.title}</p>
                  <p className='text-gray-400'>
                    {release.artists.map((artist, i) => (
                      <span key={artist}>
                        {artist}
                        {i < release.artists.length - 1 && ' · '}
                      </span>
                    ))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className='flex pl-16 gap-16 animate-slide'>
            {testArr.map((release) => (
              <Link
                key={release.release_id}
                href={`https://discogs.com/release/${release.release_id}`}
                target='_blank'
                className='relative group w-sm'
              >
                <AspectRatio ratio={1}>
                  <Image
                    src={release.cover_image}
                    alt={release.title}
                    width={576}
                    height={576}
                    className='w-full h-full'
                  />
                </AspectRatio>
                <div className='absolute inset-0 flex flex-col justify-center items-center bg-black/0 opacity-0 group-hover:opacity-100 group-hover:bg-black/50 transition-all duration-200 text-center'>
                  <p className='text-lg font-bold'>{release.title}</p>
                  <p className='text-gray-400'>
                    {release.artists.map((artist, i) => (
                      <span key={artist}>
                        {artist}
                        {i < release.artists.length - 1 && ' · '}
                      </span>
                    ))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

