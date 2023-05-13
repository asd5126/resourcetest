import { css } from "@emotion/react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { randomInteger } from "@/helpers/tool";
import { hasExtension, isValidHttpUrl, readURL, setValidUrl } from "@/helpers/validator";
import { ResourceType, useResourceStore } from "@/stores/ResourceStore";
import { getTypeResource } from "@/helpers/convert";

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

    if (type === "IMG" && fileRef.current) {
      fileRef.current.value = fileRef.current.defaultValue;
      fileRef.current.click();
    }
  };

  /**
   * @description 300ms ~ 1000ms 랜덤 딜레이 hof 함수
   */
  const withAddHandler = (callback?: () => Promise<void>) => {
    setTimeout(async () => {
      try {
        await callback?.();
      } catch (error) {
        const err = error as Error;
        toast.error(err.message);
      }
    }, randomInteger(300, 1000));
  };

  const addUrlResource = () => {
    setIsAddUrl(false);
    setInputValue("");
    withAddHandler(async () => {
      /**
       * 1. Set Valid URL
       */
      const name = setValidUrl(inputValue);

      /**
       * 2. Validation URL Check
       */
      if (!isValidHttpUrl(name)) {
        throw new Error("유효하지 않은 URL 주소입니다.");
      }

      /**
       * 3. 성공확률 80 프로
       */
      if (randomInteger(0, 100) > 80) {
        throw new Error(`[${name}] ${getTypeResource(type)} 추가에 실패했습니다.`);
      }

      const createdAt = moment();

      addResource({
        id: createdAt.valueOf() + name,
        type,
        name,
        src: name,
        selected: false,
        createdAt,
      });
    });
  };

  const addImgResource = () => {
    if (fileRef.current && fileRef.current.files) {
      const files = fileRef.current.files;
      for (let i = 0; i < files.length; i++) {
        withAddHandler(async () => {
          const name = files[i].name;

          /**
           * 1. 확장자 체크
           */
          if (!hasExtension(name, [".png", ".jpg"])) {
            throw new Error(".png, .jpg 파일만 업로드 할 수 있습니다.");
          }

          /**
           * 2. 성공확률 80 프로
           */
          if (randomInteger(0, 100) > 80) {
            throw new Error(`[${name}] ${getTypeResource(type)} 추가에 실패했습니다.`);
          }

          const createdAt = moment();
          const src = (await readURL(files[i])) as string;

          addResource({
            id: createdAt.valueOf() + name,
            type,
            name,
            src,
            selected: false,
            createdAt,
          });
        });
      }
    }
  };

  const handleClickOutside = (e: globalThis.MouseEvent) => {
    if (!inputRef.current?.contains(e.target as Node)) {
      setIsAddUrl(false);
      inputRef.current?.value && addUrlResource();
    }
  };

  const closeInput = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsAddUrl(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeInput);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", closeInput);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef.current?.value]);

  return (
    <>
      <button type="button" css={buttonStyle} onClick={() => handleButton()}>
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
          accept=".png, .jpg"
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
    border-color: #80808080;
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
