import { css } from "@emotion/react";
import { TypedIcon } from "typed-design-system";

import { useResourceStore } from "@/stores/ResourceStore";

const Layout = () => {
  const { currentResource, unselectResource } = useResourceStore();
  const resource = currentResource();

  return (
    <div css={layoutStyle}>
      {resource && (
        <>
          <div css={topStyle}>
            <div css={titleStyle}>{resource.name}</div>
            <button type="button" css={closeBtnStyle} onClick={unselectResource}>
              <TypedIcon icon="close_19" size={15} />
            </button>
          </div>
          <div css={mainStyle}>
            {resource.type === "URL" && <iframe key={resource.id} src={resource.name} css={iframeStyle} allowFullScreen />}
            {resource.type === "IMG" && <img src={resource.imgSrc} />}
          </div>
        </>
      )}
    </div>
  );
};

const layoutStyle = css`
  width: 100%;
  overflow: hidden;
`;

const topStyle = css`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  height: 50px;
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 17px;
  font-size: 14px;
  line-height: 16px;
`;

const mainStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 50px);
  background-color: white;
`;

const titleStyle = css`
  width: 100%;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
`;

const closeBtnStyle = css`
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const iframeStyle = css`
  width: 100%;
  height: 100%;
`;

export default Layout;
