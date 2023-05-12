import { css } from "@emotion/react";

import AddButton from "@/components/AddButton";
import Resource from "@/components/Resource";
import { useResourceStore } from "@/stores/resource";

const sidebarWrapper = css`
  flex: 0 0 281px;
  border-right: 1px solid #c4c4c4;
`;
const topWrapper = css`
  position: relative;
  z-index: 1;
  padding: 10px;
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;
const mainWrapper = css`
  overflow-y: auto;
  height: calc(100% - 50px);
`;

const LeftSideBar = () => {
  const { resourceList } = useResourceStore();

  return (
    <div css={sidebarWrapper}>
      <div css={topWrapper}>
        <AddButton text="URL 추가" />
        <AddButton text="이미지 추가" />
      </div>

      <div css={mainWrapper}>
        {resourceList.map((resource, idx) => (
          <Resource key={idx.toString() + resource.source} resource={resource} />
        ))}
        {/* <Resource title="https://lallalalaallaaalalaaalalaaalaaalalalaalalkfajlkflajflkajskdjflajsdlfasd.com" />
        <Resource title="https://lallalalaallaaalalaaalalaaalaa.com" />
        <Resource title="https://lallalalaallaaalala.com" />
        <Resource title="이미지_파일_이름.jpg" /> */}
      </div>
    </div>
  );
};

export default LeftSideBar;
