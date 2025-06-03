import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  BellOutlined,
  HeartOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import MusicPlayerBar from "../component/barbotton/BarBotton";
import { Button, Form, Input, message } from "antd";
import { useSelector } from "react-redux";
import { decryptData } from "../util/crypto";
import { useEffect, useRef, useState } from "react";

const WebsiteLayout = ({ user }: any) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState<any>(false);
  const dropdownRef = useRef<any>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [userDe, setuserDe] = useState<any>();
  useEffect(() => {
    if (user) {
      const datadecyp = decryptData(user?.data, user?.iv);
      const userDe = JSON.parse(datadecyp);
      setuserDe(userDe);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    messageApi.success("Bạn đã đăng xuất!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const { currentSong } = useSelector((state: any) => state?.player);
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      {contextHolder}
      <header className=" fixed top-0 left-0 right-0 z-50  bg-black select-none ">
        <div className="flex items-center justify-between bg-gray-800 px-4  text-white mr-32 ml-32">
          <div className="flex items-center space-x-4">
            <img
              src="https://res.cloudinary.com/daqolzo0n/image/upload/v1738920184/DALL_E_2025-02-06_21.14.11_-_A_modern_and_minimalist_music_streaming_logo_k9uv0h.png"
              alt="Logo"
              className="h-14 "
            />
            <Link
              to=""
              className="hover:text-white px-4 py-2  border-l border-r border-black active:text-orange-500"
            >
              Home
            </Link>
            <Link
              to=""
              className="hover:text-white px-4 py-2  border-r border-black"
            >
              Feed
            </Link>
            <Link
              to=""
              className="hover:text-white px-4 py-2  border-r border-black"
            >
              Library
            </Link>
          </div>

          <div className="flex-grow mx-4 flex items-center">
            <Form onFinish={onFinish} className="w-full">
              <Form.Item  name="text" className="mb-0">
                <Input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-[13px] px-0.5 py-1 rounded bg-gray-700 text-white placeholder-gray-400 border-gray-700 hover:border-orange-400 focus:border-orange-400 focus:ring-0.5 focus:ring-orange-400 focus:ring-opacity-50 outline-none [&:focus::placeholder]:text-orange-400 font-thin"
                />
              </Form.Item>
            </Form>
          </div>
          {user ? (
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="hover:text-gray-400 text-orange-500 px-2 py-2"
              >
                Try Next Pro
              </a>
              <a href="#" className="hover:text-gray-400 px-2 py-2">
                For Artists
              </a>
              <Link to="/upload" className="hover:text-gray-400 px-2 py-2">
                Upload
              </Link>
              <div className="relative px-2 ">
                <img
                  src={
                    userDe?.avatar
                      ? userDe.avatar
                      : "https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg"
                  }
                  alt="User Avatar"
                  onClick={() => setOpen(!open)}
                  className="h-6 w-6 rounded-full cursor-pointer "
                />
                <div
                  ref={dropdownRef}
                  className={`absolute left-0 mt-2 w-40 p-2 bg-white border border-gray-200 rounded-md shadow-lg  ${
                    open ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-200 z-10`}
                >
                  <div className="border-2 p-2 rounded flex items-center">
                    <img
                      src={
                        userDe?.avatar
                          ? userDe.avatar
                          : "https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg"
                      }
                      alt="User Avatar"
                      className="h-8 w-8 rounded-full cursor-pointer"
                    />
                    <div>
                      <span className="text-black ml-1 text-sm font-bold font-mono mb-1">
                        {userDe?.username}
                      </span>
                      <div className="h-1 w-1 ml-1 rounded-full cursor-pointer bg-green-500 text-black flex items-center">
                        <p className="ml-2 mb-1 font-sans text-green-500">
                          active
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className=" flex items-center w-full text-left px-2 py-2 text-sm text-black hover:bg-gray-100">
                    <UserOutlined className="mr-2 " />
                    Profile
                  </button>
                  <button className=" flex items-center w-full text-left px-2 py-2 text-sm text-black hover:bg-gray-100">
                    <HeartOutlined className="mr-2" />
                    Like
                  </button>
                  <button
                    // onClick={handleLogout}
                    className=" flex items-center w-full text-left px-2 py-2 text-sm text-black hover:bg-gray-100"
                  >
                    <HeartOutlined className="mr-2" />
                    Like
                  </button>

                  <button
                    onClick={() => handleLogout()}
                    className=" flex items-center w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogoutOutlined className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>

              <button className="hover:text-white">
                <BellOutlined className="text-sm px-2 py-2" />
              </button>
              <button className="hover:text-white">
                <MailOutlined className="text-sm px-2 py-2" />
              </button>
              <button className="hover:text-white">
                <MenuOutlined className="text-sm px-2 py-2" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="hover:text-gray-400 text-orange-500 px-2 py-2"
              >
                <Button
                  className="border-white text-white"
                  style={{ background: "#1f2937" }}
                >
                  Sign in
                </Button>
              </Link>
              <Link
                to="/register"
                className="hover:text-gray-400 text-orange-500 px-2 py-2"
              >
                <Button className="border-none bg-orange-500 text-white">
                  Create Account
                </Button>
              </Link>
              <Link to="/upload" className="hover:text-gray-400 px-2 py-2">
                Upload
              </Link>

              <button className="hover:text-white">
                <MenuOutlined className="text-sm px-2 py-2" />
              </button>
            </div>
          )}
        </div>
      </header>
      {/* {showSearchResult ? (
        <Search searchData={datasearch} loading={searchLoading} />
      ) : ( */}
      <Outlet />
      {currentSong ? <MusicPlayerBar user={user} /> : ""}
    </>
  );
};
export default WebsiteLayout;
