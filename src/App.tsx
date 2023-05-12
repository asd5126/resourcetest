import { css } from "@emotion/react";
import { ToastContainer } from "react-toastify";

import Layout from "./layouts/Layout";
import LeftSideBar from "./layouts/LeftSideBar";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div css={mainWrapper}>
      <LeftSideBar />
      <Layout />
      <ToastContainer />
    </div>
  );
};

const mainWrapper = css`
  display: flex;
  height: 100%;
`;

export default App;
