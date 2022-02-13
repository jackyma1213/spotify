import { useState, useEffect } from "react";
import useSpotify from "./useSpotify";

const usePlayer = () => {
  const spotifyApi = useSpotify();
  const [player, setPlayer] = useState(undefined);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Spotify 🚬🐳",
        getOAuthToken: (cb) => {
          cb(spotifyApi.getAccessToken());
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        spotifyApi.transferMyPlayback([device_id]).then(
          () => {},
          (err) => {
            console.error(err);
          }
        );
      });

      player.addListener("not_ready", ({ device_id }) => {});

      player.connect();
    };
  }, []);

  return player;
};

export default usePlayer;
