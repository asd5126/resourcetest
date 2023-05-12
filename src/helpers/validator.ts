export const hasExtension = (fileRef: React.RefObject<HTMLInputElement>, exts: string[]) => {
  return new RegExp(`(${exts.join("|").replace(/\./g, "\\.")})$`).test(fileRef.current ? fileRef.current.value : "");
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
