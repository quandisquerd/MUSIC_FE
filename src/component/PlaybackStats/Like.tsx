import { HeartOutlined } from "@ant-design/icons";

const Cmt = ({favorite}:any) => {
  return (
    <span style={{ fontSize: "14px" }} className="flex ml-2">
      <HeartOutlined className="mr-1 text-sm" />
      {favorite? favorite :0}
    </span>
  );
};

export default Cmt;
