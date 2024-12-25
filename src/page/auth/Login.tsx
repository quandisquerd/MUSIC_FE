import { useState } from "react";
import "./index.css";
import { useSigninMutation } from "../../api/auth";
import { Button, message } from "antd";
import { pause } from "../../util/pause";
import {  useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { decryptData, encryptData } from "../../util/crypto";

const Login = () => {
  const [email, setemai] = useState([]);
  const [pass, setpass] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [login, { isLoading: loginLoading }] = useSigninMutation();
  const navigate = useNavigate();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const datade = {
      email: email,
      password: pass,
    };
    const dataen = JSON.stringify(datade);
    const { encryptedData, iv }: any = encryptData(dataen);
    console.log({ data: encryptedData, iv: iv });

    login({ data: encryptedData, iv: iv })
      .unwrap()
      .then(async (user) => {
        const dec = decryptData(user?.data, user?.iv);
        const decryptdata = JSON.parse(dec);
        messageApi.open({
          type: "success",
          content: "Bạn đã đăng nhập thành công!",
        });
        localStorage.setItem("user", JSON.stringify(user));
        if (decryptdata?.role == 0) {
          await pause(1000);
          navigate("/admin");
        } else if (decryptdata?.role == 1) {
          await pause(1000);
          navigate("/");
        }
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: error.message,
        });
      });
  };
  const HandleClose = () => {
    navigate("/");
  };
  return (
    <>
      {contextHolder}
      <div className="w-full items-center justify-center flex bg-black ">
        <Button
          className="border-none ml-auto mr-64 mt-16 mb-10 rounded-full bg-gray-800 w-10 h-10 flex items-center justify-center"
          onClick={HandleClose}
        >
          <CloseOutlined className="text-white text-sm mb-1" />
        </Button>
      </div>

      <div
        style={{
          width: "100%",
          paddingBottom: "200px",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="form-container"
          style={{ width: "30%", margin: "0 auto" }}
        >
          <h1 style={{ color: "white", fontWeight: "bold", fontSize: "50px" }}>
            Login
          </h1>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="email"> Email</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e: any) => setemai(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"> Password</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={(e: any) => setpass(e.target.value)}
              />
            </div>
            <p className="text-blue-400">
              Hãy Đăng Nhập Tài Khoản Để Thêm Bài Hát Mới
            </p>
            <Button
              className="bg-slate-800 border border-none  hover:text-white text-white p-2"
              style={{ paddingBottom: "30px" }}
              onClick={(e: any) => onSubmit(e)}
            >
              {loginLoading ? "Đang đăng nhập ..." : "Đăng nhập"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
