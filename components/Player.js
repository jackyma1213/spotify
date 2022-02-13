import { useSession } from "next-auth/react";
import { useRecoilValue, useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { playlistState } from "../atoms/playlistAtom";
import { isShuffleState } from "../atoms/playerAtom";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";
import { useCallback, useEffect, useState } from "react";
import {
  SwitchHorizontalIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import {
  PauseIcon,
  PlayIcon,
  RewindIcon,
  FastForwardIcon,
  ReplyIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import { debounce, set } from "lodash";
import usePlayer from "../hooks/usePlayer";

const Player = () => {
  const spotifyApi = useSpotify();
  const player = usePlayer();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [isShuffle, setIsShuffle] = useRecoilState(isShuffleState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => console.error(err));
    }, 100),
    []
  );

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album?.images?.[0]?.url}
        />
        <div>
          <div>{songInfo?.name}</div>
          <div>{songInfo?.artists?.[0]?.name}</div>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon
          className={`button ${isShuffle ? "text-sky-800" : "text-white"}`}
          onClick={() => {
            if (isShuffle) {
              setIsShuffle(false);
              spotifyApi.setShuffle(false);
            } else {
              setIsShuffle(true);
              spotifyApi.setShuffle(true);
            }
          }}
        />
        <RewindIcon
          className="button"
          onClick={() => {
            spotifyApi.skipToPrevious();
          }}
        />
        {isPlaying ? (
          <PauseIcon
            className="button w-10 h-10"
            onClick={() => {
              handlePlayPause();
            }}
          />
        ) : (
          <PlayIcon
            className="button w-10 h-10"
            onClick={() => {
              handlePlayPause();
            }}
          />
        )}
        <FastForwardIcon
          className="button"
          onClick={() => {
            spotifyApi.skipToNext();
          }}
        />
        <ReplyIcon className="button" onClick={() => {}} />
      </div>

      <div className="flex items-center space-x-3 md:space-x-4 justify-end">
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          className="w-20 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button"
        />
      </div>
    </div>
  );
};

export default Player;
