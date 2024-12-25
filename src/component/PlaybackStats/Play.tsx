import { CaretRightOutlined } from "@ant-design/icons";

const Play = ({view}:any) => {
  return (
    <span style={{ fontSize: "14px" }} className="flex ">
      <CaretRightOutlined className="mr-1 text-sm" /> {view ? view: 0}
    </span>
  );
};

export default Play;
