import Link from 'next/link';
import Image from 'next/image';
import { AspectRatio } from './ui/aspect-ratio';
import { DiscogsRelease } from '@/types/release';

interface AlbumDisplayProps {
  releases: DiscogsRelease[];
  slideAnimation?: 'animate-slide-1' | 'animate-slide-2' | 'animate-slide-3';
}

const AlbumDisplay: React.FC<AlbumDisplayProps> = ({
  releases,
  slideAnimation = 'animate-slide-1',
}) => {
  return (
    <div
      className="relative max-w-[2000px] mx-auto overflow-hidden flex flex-nowrap group-slide pt-4 lg:pt-16
      before:absolute before:top-0 before:left-0 before:w-12 lg:before:w-26 3xl:before:w-52 before:h-full before:content-[''] before:z-[2] before:bg-gradient-to-l before:from-transparent before:to-background
      after:absolute after:top-0 after:right-0 after:w-12 lg:after:w-26 3xl:after:w-52 after:h-full after:content-[''] after:z-[2] after:bg-gradient-to-r after:from-transparent after:to-background"
    >
      <div className={`flex pl-4 lg:pl-16 gap-4 lg:gap-16 ${slideAnimation}`}>
        {releases.map((release) => (
          <Link
            key={release.release_id}
            href={`https://discogs.com/release/${release.release_id}`}
            target='_blank'
            className='relative group w-48 lg:w-sm'
          >
            <div>
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
            </div>
            <div className='nonhover-title hidden pt-2'>
              <h4 className='text-md'>{release.title}</h4>
              <h5 className='text-sm text-muted-foreground'>
                {release.artists.map((artist, i) => (
                  <span key={artist}>
                    {artist}
                    {i < release.artists.length - 1 && ' · '}
                  </span>
                ))}
              </h5>
            </div>
          </Link>
        ))}
      </div>
      <div className={`flex pl-4 lg:pl-16 gap-4 lg:gap-16 ${slideAnimation}`}>
        {releases.map((release) => (
          <Link
            key={release.release_id}
            href={`https://discogs.com/release/${release.release_id}`}
            target='_blank'
            className='relative group w-48 lg:w-sm'
          >
            <div>
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
            </div>
            <div className='nonhover-title hidden pt-2'>
              <h4 className='text-md'>{release.title}</h4>
              <h5 className='text-sm text-muted-foreground'>
                {release.artists.map((artist, i) => (
                  <span key={artist}>
                    {artist}
                    {i < release.artists.length - 1 && ' · '}
                  </span>
                ))}
              </h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AlbumDisplay;

