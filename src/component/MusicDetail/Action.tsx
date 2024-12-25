import {
  CaretRightOutlined,
  CopyOutlined,
  HeartFilled,
  HeartOutlined,
  MenuUnfoldOutlined,
  RetweetOutlined,
  SendOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import InFo from "./InFo";
import Cmt from "./Cmt";
import { useState } from "react";
import { useAddCommentMutation } from "../../api/musicDetail";
import { useParams } from "react-router-dom";
import { message } from "antd";
import LoadingOverlay from "../loading/Loading";

const Action = ({ user, data, users }: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const [value, setValue] = useState<any>();
  const [cmt, { isLoading }] = useAddCommentMutation();
  const HandleComment = () => {
    cmt({ data: { title: value, songid: id }, token: users?.token })
      .unwrap()
      .then((res: any) => {
        messageApi.success(res?.message);
        setValue("")
      })
      .catch((error) => {
        messageApi.error(error?.message);
      });
  };

  return (
    <div className="flex">
      {contextHolder}
      {isLoading && <LoadingOverlay/>}
      <div className="w-4/5 p-4 border bg-white ">
        <div className="flex items-center justify-center mb-4">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={
              user?.avatar
                ? user?.avatar
                : "https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg"
            }
            alt="User avatar"
          />
          <input
            type="text"
            className="flex-1 border p-2 rounded-full mr-3 text-black"
            placeholder="Write a comment..."
            value={value}
            onChange={(e: any) => setValue(e?.target?.value)}
          />
          <button
            className="text-black  w-10 h-10 border text-xl rounded-full flex items-center justify-center"
        
            onClick={() => HandleComment()}
          >
            <SendOutlined className=" ml-1 " />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-2/3 flex items-center ">
            <button className="text-orange-500 font-semibold mr-2 border py-1 px-3 text-sm flex justify-center items-center">
              <HeartFilled className="mr-1 mb-0.5" />
              Liked
            </button>
            <button className="mr-2 border py-1 px-3 text-black text-sm flex justify-center items-center">
              <RetweetOutlined className="mr-1 mb-0.5 text-sm" />
              Repost
            </button>
            <button className="mr-2 border py-1 px-3 text-black text-sm flex justify-center items-center">
              <ShareAltOutlined className="mr-1 mb-0.5 text-sm" />
              Share
            </button>
            <button className="mr-2 border py-1 px-3 text-black text-sm flex justify-center items-center">
              <CopyOutlined className="mr-1 mb-0.5 text-sm" />
              Copy Link
            </button>
            <button className="mr-2 border py-1 px-3 text-black text-sm flex justify-center items-center">
              <MenuUnfoldOutlined className="mr-1 mb-0.5 text-sm" />
              Add to Next up
            </button>
          </div>
          <div className="ml-auto flex items-center justify-end text-sm text-gray-600">
            <div className="mr-4">{data?.Music?.view} views</div>
            <div className="mr-4">{data?.Music?.favorite} likes</div>{" "}
            <div>{data?.Music?.repost} reposts</div>
          </div>
        </div>
        <div className="flex items-start ">
          <InFo data={data} />
          <Cmt />
        </div>
      </div>
      <div className="w-2/6">
        <div className="mx-auto p-4  bg-white  mb-2 mt-2">
          <div className="flex">
            <h2 className="font-bold text-sm">Related tracks</h2>
            <button className="ml-auto">View all</button>
          </div>
          <hr className="mt-2" />
          <ul className="space-y-4">
            <li className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg">
              <img
                src="https://i1.sndcdn.com/artworks-cUFbwZHzOvjzbuQL-9KDD8A-t500x500.jpg"
                alt="Like 1"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-sl">Tatu - Bố Quân Mix</p>
                <p className="text-sl text-gray-500">Bố Quân 8888</p>
                <div className="flex mt-1">
                  <span style={{ fontSize: "10px" }} className="flex">
                    <CaretRightOutlined className="mr-1" />1
                  </span>
                  <span style={{ fontSize: "10px" }} className="flex ml-2">
                    <HeartOutlined className="mr-1" />1
                  </span>
                  <span style={{ fontSize: "10px" }} className="flex ml-2">
                    <RetweetOutlined className="mr-1" />1
                  </span>
                </div>
              </div>
            </li>
            <li className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg">
              <img
                src="https://i1.sndcdn.com/artworks-cUFbwZHzOvjzbuQL-9KDD8A-t500x500.jpg"
                alt="Like 1"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-sl">Tatu - Bố Quân Mix</p>
                <p className="text-sl text-gray-500">Bố Quân 8888</p>
                <div className="flex mt-1">
                  <span style={{ fontSize: "10px" }} className="flex">
                    <CaretRightOutlined className="mr-1" />1
                  </span>
                  <span style={{ fontSize: "10px" }} className="flex ml-2">
                    <HeartOutlined className="mr-1" />1
                  </span>
                  <span style={{ fontSize: "10px" }} className="flex ml-2">
                    <RetweetOutlined className="mr-1" />1
                  </span>
                </div>
              </div>
            </li>
            <li className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg">
              <img
                src="https://i1.sndcdn.com/artworks-cUFbwZHzOvjzbuQL-9KDD8A-t500x500.jpg"
                alt="Like 1"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-sl">Tatu - Bố Quân Mix</p>
                <p className="text-sl text-gray-500">Bố Quân 8888</p>
                <div className="flex mt-1">
                  <span style={{ fontSize: "10px" }} className="flex">
                    <CaretRightOutlined className="mr-1" />1
                  </span>
                  <span style={{ fontSize: "10px" }} className="flex ml-2">
                    <HeartOutlined className="mr-1" />1
                  </span>
                  <span style={{ fontSize: "10px" }} className="flex ml-2">
                    <RetweetOutlined className="mr-1" />1
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Action;
