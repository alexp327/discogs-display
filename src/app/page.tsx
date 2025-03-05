'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { siteConfig } from '../../config/site';

export default function Home() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/${username}`);
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-xl w-full p-16 rounded-md'>
        <h1 className='text-4xl font-bold mb-6 text-center'>
          {siteConfig.name}
        </h1>
        <form onSubmit={handleSubmit} className='flex items-center space-x-2'>
          <Input
            type='text'
            placeholder='Enter Discogs username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button type='submit'>Go</Button>
        </form>
      </div>
    </div>
  );
}

