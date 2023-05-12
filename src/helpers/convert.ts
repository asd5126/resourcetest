import { YOUTUBE_EMBEDED_URL } from "./constants";

export const getYoutubeEmbedUrl = (youtubeId: string) => {
  return YOUTUBE_EMBEDED_URL + youtubeId;
};
