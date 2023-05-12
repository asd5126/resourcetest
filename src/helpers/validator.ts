import { getYoutubeEmbedUrl } from "./convert";

export const hasExtension = (fileName: string, exts: string[]) => {
  return new RegExp(`(${exts.join("|").replace(/\./g, "\\.")})$`).test(fileName);
};

export const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

export const readURL = (file: File) => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = e => res(e.target?.result);
    reader.onerror = e => rej(e);
    reader.readAsDataURL(file);
  });
};

export const isValidHttpUrl = (str: string) => {
  let url;
  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

export const setValidUrl = (url: string) => {
  let name = url;
  const youtubeId = getYoutubeId(name);
  if (youtubeId) {
    name = getYoutubeEmbedUrl(youtubeId);
  }
  return name;
};
