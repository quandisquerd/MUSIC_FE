import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import {
  useAddFollowMutation,
  useCheckFollowQuery,
  useUnFollowMutation,
} from "../../api/music";
import { message } from "antd";


const TopUser = ({ item, user }: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [addFollow] = useAddFollowMutation();
  const [unFollow] = useUnFollowMutation();
  const { data: checkFolow } = useCheckFollowQuery({
    id: item?.id,
    token: user?.token,
  });
  const HandleFollow = (id: any) => {
    addFollow({ id: { id: id }, token: user?.token })
      .then((res: any) => {
        messageApi.success(res?.data?.message);
      })
      .catch((error) => {
        messageApi.error(error?.data?.message);
      });
  };
  const HandleUnFollow = (id: any) => {
    unFollow({ id: { id: id }, token: user?.token })
      .then((res: any) => {
        messageApi.success(res?.data?.message);
      })
      .catch((error) => {
        messageApi.error(error?.data?.message);
      });
  };
  return (
    <li
      key={item?.id}
      className="flex items-center space-x-4 p-2 bg-white rounded-lg shadow-lg w-full"
    >
      {contextHolder}
      <div className="flex items-center space-x-4 flex-grow">
        <div>
          <img
            src={item?.avatar}
            alt="Artist 1"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm">{item?.username}</p>
          <div className="flex mt-1 space-x-1">
            <span style={{ fontSize: "10px" }}>
              <UsergroupAddOutlined /> {item?.followersCount}
            </span>
            <span style={{ fontSize: "10px", display: "flex" }}>
              <img
                className="w-4 flex"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+CiAgICA8cmVjdCB4PSI1IiB5PSIxMiIgZmlsbD0icmdiKDM0LCAzNCwgMzQpIiB3aWR0aD0iMiIgaGVpZ2h0PSI0Ii8+CiAgICA8cmVjdCB4PSIyMSIgeT0iMTIiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgd2lkdGg9IjIiIGhlaWdodD0iNCIvPgogICAgPHJlY3QgeD0iMTciIHk9IjEwIiBmaWxsPSJyZ2IoMzQsIDM0LCAzNCkiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjgiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgd2lkdGg9IjIiIGhlaWdodD0iMTIiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSI1IiBmaWxsPSJyZ2IoMzQsIDM0LCAzNCkiIHdpZHRoPSIyIiBoZWlnaHQ9IjE4Ii8+Cjwvc3ZnPgo="
              />
              2,577
            </span>
          </div>
        </div>
      </div>
      <div className="ml-auto">
        {checkFolow?.status ? (
          <button
            className="flex p-1 text-black border border-gray-300 rounded items-center"
            onClick={() => HandleUnFollow(item?.id)}
          >
            <UserAddOutlined />
            <p className="text-xs">Following</p>
          </button>
        ) : (
          <button
            className="flex p-1 text-black border border-gray-300 rounded items-center"
            onClick={() => HandleFollow(item?.id)}
          >
            <UserAddOutlined />
            <p className="text-xs">Follow</p>
          </button>
        )}
      </div>
    </li>
  );
};

export default TopUser;
