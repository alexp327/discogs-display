'use client';
import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { DiscogsRelease } from '@/types/release';

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

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/discogs?username=${username}`, {
        cache: 'no-store',
      });
      const json: apiResponse = await res.json();
      setData(json);
    }
    fetchData();
  }, [username]);

  return (
    <div>
      <h1 className='text-center py-12 text-4xl font-bold'>
        {username}’s Collection
      </h1>
      {data && (
        <div>
          {/* TODO: add pagination */}
          {/* <pre>{JSON.stringify(data.pagination, null, 2)}</pre> */}
          <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
            {data.releases.map((release) => (
              <div key={release.release_id} className='flex gap-4'>
                <Image
                  src={release.thumb}
                  alt={release.title}
                  width={144}
                  height={144}
                  className='w-36 h-36'
                />
                <div className='flex flex-col justify-center'>
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

