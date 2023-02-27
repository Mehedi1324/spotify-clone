import { playListIdState } from '@/atoms/playlistAtom';
import useSpotify from '@/hooks/useSpotify';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import {
  FaHome,
  FaSearch,
  FaRss,
  FaFolderPlus,
  FaRegHeart,
} from 'react-icons/fa';
import { MdLibraryMusic } from 'react-icons/md';
import { useRecoilState } from 'recoil';

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playListIdState);

  // Getting playlist from spotify web api____________
  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="hidden h-screen p-4 overflow-y-scroll text-xs text-gray-500 border-r border-gray-900 md:inline-flex lg:text-sm scrollbar-hide">
      <div className="space-y-4">
        <button
          onClick={() => signOut()}
          className="flex items-center space-x-2 hover:text-white font-[500]"
        ></button>
        <button className="flex items-center space-x-2 hover:text-white font-[500]">
          <FaHome className="w-5 h-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white text-bold font-[500]">
          <FaSearch className="w-5 h-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white text-bold font-[500]">
          <MdLibraryMusic className="w-5 h-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-gray-900 border-t-1" />
        <button className="flex items-center space-x-2 hover:text-white text-bold font-[500]">
          <FaFolderPlus className="w-5 h-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white text-bold font-[500]">
          <FaRegHeart className="w-5 h-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white text-bold font-[500]">
          <FaRss className="w-5 h-5" />
          <p>Your Episonds</p>
        </button>
        <hr className="border-gray-900 border-t-1" />
        {/* Play List */}
        <p className=" text-green-500 text-center font-[600]">
          -- Play List --
        </p>
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            className="cursor-pointer hover:text-white font-[500]"
            onClick={() => setPlaylistId(playlist.id)}
          >
            {playlist.length === 0 ? 'Playlist Empty..' : playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
