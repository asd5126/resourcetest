import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { MouseEvent, useState, useEffect, useRef } from "react";
import { TypedColor, TypedIcon } from "typed-design-system";

import { ResourceType, useResourceStore } from "@/stores/ResourceStore";

interface Props {
  resource: ResourceType;
}

const Resource = ({ resource }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const { selectResource, removeResource, editResourceName } = useResourceStore();

  const editResource = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    setIsEdit(true);
  };
  const deleteResource = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    removeResource(resource);
  };

  // const handleClickOutside = (e: globalThis.MouseEvent) => {
  //   if (!inputRef.current?.contains(e.target as Node) && !editBtnRef.current?.contains(e.target as Node)) {
  //     setIsEdit(false);
  //     inputRef.current?.value && editResourceName(resource, inputRef.current?.value || "");
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [inputRef.current?.value]);

  return (
    <ResourceWrapper onClick={() => selectResource(resource)} selected={resource.selected}>
      {isEdit ? (
        <input type="text" ref={inputRef} css={inputStyle} defaultValue={resource.name} onClick={e => e.stopPropagation()} autoFocus />
      ) : (
        <div css={titleStyle}>{resource.name}</div>
      )}
      <div css={toolStyle}>
        <button type="button" onClick={editResource} ref={editBtnRef}>
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

    ${selected &&
    css`
      border-color: #38a5e1;
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
