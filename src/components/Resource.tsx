import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { TypedColor, TypedIcon } from "typed-design-system";

import { isValidHttpUrl, setValidUrl } from "@/helpers/validator";
import { ResourceType, useResourceStore } from "@/stores/ResourceStore";
import { toast } from "react-toastify";

interface Props {
  resource: ResourceType;
}

const Resource = ({ resource }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { selectResource, removeResource, editResourceName } = useResourceStore();

  const editResource = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    setInputValue(resource.name);
    setIsEdit(true);
  };
  const deleteResource = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    removeResource(resource);
  };

  const changeUrlResource = () => {
    if (inputRef.current?.value) {
      setIsEdit(false);
      try {
        let name = inputRef.current?.value || "";
        if (resource.type === "URL") {
          if (!isValidHttpUrl(inputValue)) {
            throw new Error("유효하지 않은 URL 주소입니다");
          }
          name = setValidUrl(inputValue);
        }
        editResourceName(resource, name);
      } catch (error) {
        const err = error as Error;
        toast.error(err.message);
      }
    }
  };

  const handleClickOutside = (e: globalThis.MouseEvent) => {
    if (!inputRef.current?.contains(e.target as Node)) {
      changeUrlResource();
    }
  };

  const closeInput = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEdit(false);
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
    <ResourceWrapper onClick={() => selectResource(resource)} selected={resource.selected}>
      {isEdit ? (
        <input
          type="text"
          ref={inputRef}
          css={inputStyle}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onClick={e => e.stopPropagation()}
          onKeyDown={e => e.key === "Enter" && changeUrlResource()}
          autoFocus
        />
      ) : (
        <div css={titleStyle}>{resource.name}</div>
      )}
      <div css={toolStyle}>
        <button type="button" onClick={editResource}>
          <TypedIcon icon="edit_19" size={19} color={TypedColor.fromHex("#000")} />
        </button>
        <button type="button" onClick={deleteResource}>
          <TypedIcon icon="trash_19" size={19} color={TypedColor.fromHex("#000")} />
        </button>
      </div>
    </ResourceWrapper>
  );
};

const ResourceWrapper = styled.div(
  ({ selected }: { selected: boolean }) => css`
    height: 90px;
    background: #ffffff;
    border-radius: 10px;
    margin: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid white;
    cursor: pointer;

    :hover {
      border-color: #80808080;
    }

    ${selected &&
    css`
      border-color: #38a5e1;
      :hover {
        border-color: #38a6e1aa;
      }
    `}
  `
);

const titleStyle = css`
  font-size: 14px;
  line-height: 16px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
`;

const toolStyle = css`
  display: flex;
  justify-content: flex-end;

  > button {
    cursor: pointer;
    :hover {
      opacity: 0.7;
    }
    :not(:last-child) {
      margin-right: 5px;
    }
  }
`;

const inputStyle = css`
  height: 30px;
  background: #f7f7f7;
  border: 1px solid #38a5e1;
  border-radius: 3px;
  font-size: 14px;
  line-height: 16px;
  outline-width: 0;
  padding: 8px;
`;

export default Resource;
