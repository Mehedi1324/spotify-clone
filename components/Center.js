import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playListIdState, playlistState } from '@/atoms/playlistAtom';
import useSpotify from '@/hooks/useSpotify';
import Songs from './Songs';
const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];
const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState('');
  const spotifyApi = useSpotify();
  const playListId = useRecoilValue(playListIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playListId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playListId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log('Something is wrong', err));
  }, [spotifyApi, playListId]);
  return (
    <div className="flex-grow h-screen overflow-y-scroll text-white scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          onClick={() => signOut()}
          className="flex items-center p-1 pr-2 space-x-3 text-sm bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80"
        >
          <img
            className="w-8 h-8 rounded-full"
            src={session?.user.image}
            alt=""
          />
          <p>{session?.user.name}</p>

          <FaAngleDown className="w-4 h-4" />
        </div>
      </header>
      <section
        className={`flex p-8 items-end space-x-7 bg-gradient-to-b to-black ${color} h-80`}
      >
        <img
          className="shadow-xl h-44 w-44"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>PlAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
