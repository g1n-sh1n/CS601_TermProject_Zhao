import type { Photo } from "../types.ts";

// Large photo  -> public/images/gallery/<name>.jpg         (1600px wide)
// Thumbnail    -> public/images/gallery/thumbs/<name>.jpg  (480px wide, loads first)
// Paths start with "./" so they work on GitHub Pages.
export const photos: Photo[] = [
  {
    src: "./images/gallery/lake-swings.jpg",
    thumb: "./images/gallery/thumbs/lake-swings.jpg",
    alt: "Two people on swings facing a blue mountain lake, with yellow autumn aspens and pine-covered peaks behind it.",
    caption: "Fall colors on a Highway 395 road trip",
    width: 1600,
    height: 1200
  },
  {
    src: "./images/gallery/berkeley-trex.jpg",
    thumb: "./images/gallery/thumbs/berkeley-trex.jpg",
    alt: "Me waving next to a life-size T. rex model on a hilltop, with the San Francisco Bay and skyline in the distance.",
    caption: "Saying hi to a T. rex above the Bay",
    width: 1600,
    height: 1200
  },
  {
    src: "./images/gallery/cats.jpg",
    thumb: "./images/gallery/thumbs/cats.jpg",
    alt: "Two photos side by side of my black cat on the couch, calm in one and meowing in the other, while my orange tabby watches from behind.",
    caption: "My two code reviewers",
    width: 1600,
    height: 1200
  }
];
