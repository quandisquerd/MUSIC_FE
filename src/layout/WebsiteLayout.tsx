import { Link, Outlet } from "react-router-dom";
import { BellOutlined, MailOutlined, MenuOutlined } from "@ant-design/icons";
import MusicPlayerBar from "../component/barbotton/BarBotton";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { decryptData } from "../util/crypto";
import { useEffect, useState } from "react";

const WebsiteLayout = ({ user }: any) => {
  const [userDe, setuserDe] = useState<any>();
  useEffect(() => {
    if (user) {
      const datadecyp = decryptData(user?.data, user?.iv);
      const userDe = JSON.parse(datadecyp);
      setuserDe(userDe);
    }
  }, []);

  const { currentSong } = useSelector((state: any) => state?.player);
  return (
    <>
      <header className=" fixed top-0 left-0 right-0 z-50  bg-black ">
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-white mr-32 ml-32">
          <div className="flex items-center space-x-4">
            <img
              src="https://res.cloudinary.com/dlhdt9pla/image/upload/v1733339658/download_xidgkk.png"
              alt="Logo"
              className="h-6 "
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

          <div className="flex-grow mx-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-2 py-1 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring-orange-500"
            />
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
              <div className="relative px-2">
                <img
                  src={
                    userDe?.avatar
                      ? userDe?.avatar
                      : "https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg"
                  }
                  alt="User Avatar"
                  className="h-6 w-6 rounded-full "
                />
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
