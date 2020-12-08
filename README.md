# Really Simple Spotify Widget

A REALLY simple Now Playing Spotify Übersicht widget. Clicking the album cover pauses / plays the current track.

![Really Simple Spotify Widget 1](screenshot2.png)

![Really Simple Spotify Widget 2](screenshot3.png)

## Installation

Place the widget into the Übersicht widget directory.

Ensure that you have `npm` or `yarn` installed.

```sh
# cd into your widget directory

cd Really-Simple-Spotify-Widget

yarn install # or npm install
```

## Options

```js
const options = {
  // top and left position the widget relative the top left corner
  top: "20px",
  left: "20px",

  // The maximum width of the widget. Height is variable to the album's height
  width: "380px",

  // Progress bar's height
  progressBarHeight: "7px",

  // Font used to display song name and artist
  fontFamily: "Gill Sans",

  // Song and artist font sizes
  songFontSize: "22pt",
  artistFontSize: "14px",

  // If defined, will be used as song and artist font color
  // Leave commented (null) for average color of album art
  // accent: "#FFF",
};
```
