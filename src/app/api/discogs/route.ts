import { NextResponse } from 'next/server';

/**
 * Get a user's collection from Discogs
 * @param {Request} request - The incoming request that has the username as a query parameter
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Discogs username is missing' },
      { status: 400 }
    );
  }

  const key = process.env.DISCOGS_CONSUMER_KEY;
  const secret = process.env.DISCOGS_CONSUMER_SECRET;

  if (!key || !secret) {
    return NextResponse.json(
      { error: 'Discogs API key or secret is missing' },
      { status: 500 }
    );
  }

  // could add sort parameters to sort by artist, title, etc.
  const discogsUrl = `https://api.discogs.com/users/${username}/collection/folders/0/releases?sort=added&sort_order=desc&page=1&per_page=500`;

  try {
    const response = await fetch(discogsUrl, {
      headers: {
        Authorization: `Discogs key=${key}, secret=${secret}`,
      },
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();

    const minimalData = {
      pagination: data.pagination,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      releases: data.releases.map((release: any) => ({
        release_id: release.basic_information.id,
        title: release.basic_information.title,
        artists: release.basic_information.artists.map(
          (artist: { name: string }) => artist.name
        ),
        cover_image: release.basic_information.cover_image,
        thumb: release.basic_information.thumb,
        year: release.basic_information.year,
        genres: release.basic_information.genres,
        styles: release.basic_information.styles,
        resource_url: release.basic_information.resource_url,
        date_added: release.date_added,
        format: release.basic_information.formats[0].name,
      })),
    };

    return NextResponse.json(minimalData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

