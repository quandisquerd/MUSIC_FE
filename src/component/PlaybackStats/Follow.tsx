import { UsergroupAddOutlined } from "@ant-design/icons";

const Follow = ({data}:any) => {
  return (
    <span
      style={{ fontSize: "10px" }}
      className="flex items-center justify-center  mr-4"
    >
      <UsergroupAddOutlined className="mr-0.5 text-sm mb-1" /> {data?.User?.followersCount}
    </span>
  );
};

export default Follow;
