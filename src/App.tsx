import { css } from "@emotion/react";

import Layout from "./layouts/Layout";
import LeftSideBar from "./layouts/LeftSideBar";

const App = () => {
  return (
    <div css={mainWrapper}>
      <LeftSideBar />
      <Layout />
    </div>
  );
};

const mainWrapper = css`
  display: flex;
  height: 100%;
`;

export default App;
