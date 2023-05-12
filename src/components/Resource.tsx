import { css } from "@emotion/react";
import { TypedColor, TypedIcon } from "typed-design-system";

import { ResourceType, useResourceStore } from "@/stores/resource";
import { MouseEvent } from "react";

interface Props {
  resource: ResourceType;
}

const Resource = ({ resource }: Props) => {
  const { selectResource, removeResource } = useResourceStore();

  const resourceStyle = css`
    height: 90px;
    background: #ffffff;
    border-radius: 10px;
    margin: 10px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${resource.selected &&
    css`
      border: 1px solid #38a5e1;
    `}
  `;

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

  const editResource = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
  };
  const deleteResource = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation();
    removeResource(resource);
  };

  return (
    <div css={resourceStyle} onClick={() => selectResource(resource)}>
      <div css={titleStyle}>{resource.source}</div>
      <div css={toolStyle}>
        <button type="button" onClick={editResource}>
          <TypedIcon icon="edit_19" size={19} color={TypedColor.fromHex("#000")} />
        </button>
        <button type="button" onClick={deleteResource}>
          <TypedIcon icon="trash_19" size={19} color={TypedColor.fromHex("#000")} />
        </button>
      </div>
    </div>
  );
};

export default Resource;
