import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="text-white pb-24">
      {playlist?.tracks.items.map(({ track }, index) => (
        <Song key={track.id} track={track} order={index} />
      ))}
    </div>
  );
};

export default Songs;
