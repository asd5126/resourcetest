import { ResourceType } from "@/stores/ResourceStore";
import { YOUTUBE_EMBEDED_URL } from "./constants";

export const getYoutubeEmbedUrl = (youtubeId: string) => {
  return YOUTUBE_EMBEDED_URL + youtubeId;
};

export const getTypeResource = (type: ResourceType["type"]) => {
  switch (type) {
    case "URL":
      return "URL";
    case "IMG":
      return "이미지";
    default:
      return "리소스";
  }
};
