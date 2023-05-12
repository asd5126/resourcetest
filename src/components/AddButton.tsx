import { ResourceType, useResourceStore } from "@/stores/resource";
import { css } from "@emotion/react";
import moment from "moment";

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
  :not(:last-child) {
    margin-right: 10px;
  }
`;

interface Props {
  text: string;
  type: ResourceType["type"];
}

const AddButton = ({ text, type }: Props) => {
  const { addResource } = useResourceStore();
  return (
    <button
      type="button"
      css={buttonStyle}
      onClick={() => {
        const createdAt = moment();
        // const source = "https://typed.do/blog-kr/how-to-make-good-usability-product/";
        const source = "https://i.stack.imgur.com/aY1PS.png";

        addResource({
          // source: "https://lallalalaallaaalalaaalalaaalaaalalalaalalkfajlkflajflkajskdjflajsdlfasd.com",
          // source: "https://www.naver.com",
          // source: "https://www.youtube.com/embed/xrf2nqCFtZY",
          // source: "https://www.xappol.com",
          // source: "https://www.netflix.com",
          // source: "https://www.robinwieruch.de/react-libraries/",
          id: createdAt.valueOf() + source,
          type,
          source,
          selected: false,
          createdAt,
        });
        console.log(moment().valueOf());
      }}
    >
      {text}
    </button>
  );
};

export default AddButton;
