import { css } from "@emotion/react";

import Layout from "./layouts/Layout";
import LeftSideBar from "./layouts/LeftSideBar";

const mainWrapper = css`
  display: flex;
  height: 100%;
`;

function App() {
  return (
    <div css={mainWrapper}>
      <LeftSideBar />
      <Layout />
    </div>
  );
}

export default App;
