import { css } from "uebersicht";
import FastAverageColor from "fast-average-color";

const options = {
  top: "20px",
  left: "20px",
  width: "380px",
  progressBarHeight: "7px",
  fontFamily: "Gill Sans",
  songFontSize: "22pt",
  artistFontSize: "14px",
  // accent: "#FFF",
};

export const command =
  "osascript ./Really-Simple-Spotify-Widget/now-playing.scpt | echo";
export const refreshFrequency = 1000;

const fac = new FastAverageColor();
let album_color = {
  r: 0,
  g: 0,
  b: 0,
};

export const className = {
  top: options.top,
  left: options.left,
  width: options.width,
  userSelect: "none",
};

const containerClassName = css({});

const albumCoverClassName = css({
  width: "100%",
  display: "block",
  borderRadius: "5px",
});

const progressClassName = css({
  marginTop: "7px",
  width: "100%",
  height: options.progressBarHeight,
  borderRadius: "5px",
});

const songClassName = css({
  textAlign: "center",
  fontSize: options.songFontSize,
  fontFamily: options.fontFamily,
});

const artistClassName = css({
  textAlign: "center",
  fontFamily: options.fontFamily,
  fontSize: options.artistFontSize,
  fontStyle: "italic",
});

export const updateState = (event, previousState) => {
  if (event.error) {
    return { ...previousState, warning: `We got an error: ${event.error}` };
  }

  const [
    _,
    is_playing,
    song,
    artist,
    album,
    album_art,
    duration,
    seconds_played,
  ] = event.output.split("\n");

  if (is_playing === "false") {
    return {
      is_playing: false,
    };
  }

  fac.getColorAsync(album_art).then(response => {
    album_color = {
      r: response.value[0],
      g: response.value[1],
      b: response.value[2],
    };
  });

  return {
    is_playing: true,
    song: song,
    artist: artist,
    album: album,
    album_art: album_art,
    duration: duration,
    seconds_played: seconds_played,
  };
};

export const render = ({
  is_playing,
  song,
  artist,
  album,
  album_art,
  duration,
  seconds_played,
}) => {
  if (!is_playing) {
    // If not playing, don't display anything
    return <div></div>;
  }

  const mainColor = `rgb(${album_color.r}, ${album_color.g}, ${album_color.b})}`;

  return (
    <div className={containerClassName}>
      <img
        id="albumCover"
        className={albumCoverClassName}
        src={album_art}
        draggable="false"
      />
      <div className={progressClassName}>
        <div
          className={`${progressClassName}
          ${css({
            backgroundColor: options.accent ? options.accent : mainColor,
            width: `${(seconds_played / duration) * 1000 * 100}%`,
          })}`}
        ></div>
      </div>
      <div
        className={`${songClassName} ${css({
          color: options.accent ? options.accent : mainColor,
        })}`}
      >
        {song}
      </div>
      <div
        className={`${artistClassName} ${css({
          color: options.accent ? options.accent : mainColor,
        })}`}
      >
        {artist}
      </div>
    </div>
  );
};
