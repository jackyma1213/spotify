import { millisToMinutesAndSeconds } from "../lib/time";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

const Song = ({ track, order }) => {
  const { name, album, artists, duration_ms, uri, id } = track;
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(id);
    setIsPlaying(true);
    spotifyApi.play({ uris: [uri] });
  };

  return (
    <div
      className="grid grid-cols-2 my-2 px-8 py-4 text-gray-500 hover:bg-gray-800 cursor-pointer"
      onClick={() => {
        playSong();
      }}
    >
      <div className="flex  items-center space-x-5">
        <div>{order + 1}</div>
        <img className="h-12 w-12" src={album.images[0].url} />
        <div>
          <div className="w-36 lg:w-64 truncate text-white">{name}</div>
          <div className="text-xs">{artists[0].name}</div>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <div className="w-45 text-sm hidden md:inline">{album.name}</div>
        <div>{millisToMinutesAndSeconds(duration_ms)}</div>
      </div>
    </div>
  );
};

export default Song;
