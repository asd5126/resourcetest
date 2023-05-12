import { css } from "@emotion/react";
import moment from "moment";

import { isValidHttpUrl, readURL, setValidUrl } from "@/helpers/validator";
import { ResourceType, useResourceStore } from "@/stores/ResourceStore";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  text: string;
  type: ResourceType["type"];
}

const AddButton = ({ text, type }: Props) => {
  const [isAddUrl, setIsAddUrl] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { addResource } = useResourceStore();

  const handleButton = () => {
    if (type === "URL") {
      setIsAddUrl(pre => !pre);
    }

    if (type === "IMG") {
      if (fileRef.current) {
        fileRef.current.value = fileRef.current.defaultValue;
        fileRef.current.click();
      }
    }
  };

  const addUrlResource = () => {
    try {
      if (!isValidHttpUrl(inputValue)) {
        throw new Error("유효하지 않은 URL 주소입니다");
      }
      const createdAt = moment();
      const name = setValidUrl(inputValue);

      addResource({
        id: createdAt.valueOf() + name,
        type,
        name,
        selected: false,
        createdAt,
      });
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setInputValue("");
      setIsAddUrl(false);
    }
  };

  const addImgResource = async () => {
    if (fileRef.current) {
      const files = fileRef.current.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const name = files[i].name;
          const createdAt = moment();
          const imgSrc = (await readURL(files[i])) as string;
          addResource({
            id: createdAt.valueOf() + name,
            type,
            name,
            selected: false,
            createdAt,
            imgSrc,
          });
        }
      }
    }
  };

  const handleClickOutside = (e: globalThis.MouseEvent) => {
    if (!inputRef.current?.contains(e.target as Node)) {
      setIsAddUrl(false);
      inputRef.current?.value && addUrlResource();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputRef.current?.value]);

  return (
    <>
      <button
        type="button"
        css={buttonStyle}
        onClick={() => {
          handleButton();
        }}
      >
        {text}
      </button>
      {type === "URL" && isAddUrl && (
        <div css={urlStyle}>
          <input
            ref={inputRef}
            type="text"
            css={urlInputStyle}
            onKeyDown={e => e.key === "Enter" && addUrlResource()}
            onChange={e => setInputValue(e.target.value)}
            value={inputValue}
            autoFocus
          />
        </div>
      )}
      {type === "IMG" && (
        <input
          //
          ref={fileRef}
          type="file"
          css={fileInputStyle}
          onChange={addImgResource}
          accept="image/jpeg, image/png"
          multiple
        />
      )}
    </>
  );
};

const buttonStyle = css`
  width: 125px;
  height: 30px;
  text-align: center;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  font-size: 12px;
  line-height: 14px;

  :hover {
    opacity: 0.7;
  }
`;

const urlStyle = css`
  position: absolute;
  width: 260px;
  height: 42px;
  left: 10px;
  top: 42px;
  padding: 5px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const urlInputStyle = css`
  position: relative;
  width: 100%;
  padding: 8px;
  height: 30px;
  background: #f7f7f7;
  border: 1px solid #38a5e1;
  border-radius: 3px;

  font-size: 12px;
  line-height: 14px;
  outline-width: 0;

  :focus {
    border: 1px solid #38a5e1;
  }
`;

const fileInputStyle = css`
  display: none;
`;

export default AddButton;
