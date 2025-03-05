'use client';
import React, { use, useEffect, useState } from 'react';
import { DiscogsRelease } from '@/types/release';
import AlbumDisplay from '@/components/album-display';

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
  const [addedArr, setAddedArr] = useState<DiscogsRelease[]>([]);
  const [ratingArr, setRatingArr] = useState<DiscogsRelease[]>([]);
  const [yearArr, setYearArr] = useState<DiscogsRelease[]>([]);

  useEffect(() => {
    async function fetchData() {
      const addedRes = await fetch(
        `/api/discogs/collection?username=${username}&sort=added&sort_order=desc`,
        {
          cache: 'no-store',
        }
      );
      const addedJson: apiResponse = await addedRes.json();
      // set addedArr to the first 10 releases
      setAddedArr(addedJson.releases.slice(0, 10));
      const ratingRes = await fetch(
        `/api/discogs/collection?username=${username}&sort=rating&sort_order=desc`,
        {
          cache: 'no-store',
        }
      );
      const ratingJson: apiResponse = await ratingRes.json();
      setRatingArr(ratingJson.releases.slice(0, 10));
      const yearRes = await fetch(
        `/api/discogs/collection?username=${username}&sort=year&sort_order=desc`,
        {
          cache: 'no-store',
        }
      );
      const yearJson: apiResponse = await yearRes.json();
      setYearArr(yearJson.releases.slice(0, 10));
    }
    fetchData();
  }, [username]);

  return (
    <div className='text-center p-2'>
      <h1 className='py-12 text-4xl font-bold capitalize'>
        {username}’s Collection
      </h1>
      {addedArr && (
        <AlbumDisplay releases={addedArr} slideAnimation='animate-slide-1' />
      )}
      {ratingArr && (
        <AlbumDisplay releases={ratingArr} slideAnimation='animate-slide-2' />
      )}
      {yearArr && (
        <AlbumDisplay releases={yearArr} slideAnimation='animate-slide-3' />
      )}
    </div>
  );
}

