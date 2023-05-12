import { useResourceStore } from "@/stores/resource";
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
  text?: string;
}

const AddButton = ({ text }: Props) => {
  const { addResource } = useResourceStore();
  return (
    <button
      type="button"
      css={buttonStyle}
      onClick={() =>
        addResource({
          source: "https://lallalalaallaaalalaaalalaaalaaalalalaalalkfajlkflajflkajskdjflajsdlfasd.com",
          selected: false,
          createdAt: moment(),
        })
      }
    >
      {text}
    </button>
  );
};

export default AddButton;
