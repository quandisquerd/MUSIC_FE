import {
  CaretRightOutlined,
  HeartOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { useGetAllFavoriteWithUserQuery } from "../../api/music";
import LoadingUser from "../loading/LoadingUser";
const Like = ({ user }: any) => {
  const { data: ListFavoriteUser, isLoading: favoriting } =
    useGetAllFavoriteWithUserQuery(user?.token);
  return (
    <>
      {/* {favoriting && <LoadingOverlay />} */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">
          {ListFavoriteUser?.data?.length} Likes
        </h3>
        {favoriting && <LoadingUser />}
        <ul className="space-y-4">
          {ListFavoriteUser?.data?.map((item: any) => {
            return (
              <li
                key={item?.id}
                className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg"
              >
                <img
                  src={item?.Music?.image}
                  alt="Like 1"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-sl">
                    {item?.Music?.name?.length > 25
                      ? item?.Music?.name.slice(0) + `...`
                      : item?.Music?.name}
                  </p>
                  <p className="text-sl text-gray-500">
                    {item?.User?.username}
                  </p>
                  <div className="flex mt-1">
                    <span style={{ fontSize: "10px" }} className="flex">
                      <CaretRightOutlined className="mr-1" />{" "}
                      {item?.Music?.view}
                    </span>
                    <span style={{ fontSize: "10px" }} className="flex ml-2">
                      <HeartOutlined className="mr-1" />
                      {item?.Music?.favorite}
                    </span>
                    <span style={{ fontSize: "10px" }} className="flex ml-2">
                      <RetweetOutlined className="mr-1" />
                      {item?.Music?.repost}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Like;
