import { useState } from "react";
import { useSignupMutation } from "../../api/auth";
import { Button, message } from "antd";
import { pause } from "../../util/pause";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { encryptData } from "../../util/crypto";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
const Register = () => {
  const [email, setemai] = useState([]);
  const [pass, setpass] = useState([]);
  const [name, setname] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [register, { isLoading: loginLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      email: email,
      password: pass,
      username: name,
    };
    const dataen = JSON.stringify(data);
    const { encryptedData, iv }: any = await encryptData(dataen);
    register({ data: encryptedData, iv: iv })
      .unwrap()
      .then(async () => {
        messageApi.open({
          type: "success",
          content: "Bạn đã đăng ký thành công!",
        });
        await pause(2000);
        navigate("/login");
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: error.data,
        });
      });
  };
  const HandleClose = () => {
    navigate("/");
  };
  return (
    <>
      {contextHolder}
      <div className=" items-center justify-center flex  bg-black ">
        <Button
          className="border-none ml-auto  mr-64 mt-16 mb-10 rounded-full bg-gray-800 w-10 h-10 flex items-center justify-center"
          onClick={HandleClose}
        >
          <CloseOutlined className="text-white text-sm mb-1" />
        </Button>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "200px",
        }}
      >
        {/* <Button style={{ marginTop: '-810px', marginLeft: '40px', color: 'black', backgroundColor: 'red', border: 'none' }}><Link to="/"><FontAwesomeIcon icon={faTimes} /></Link></Button> */}
        <div
          className="form-container"
          style={{ width: "30%", margin: "0 auto" }}
        >
          <h1 style={{ color: "white", fontWeight: "bold", fontSize: "50px" }}>
            Register
          </h1>
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <label> Username</label>
              <input
                type="text"
                onChange={(e: any) => setname(e.target.value)}
              />
            </div>
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
                type="password"
                id="password"
                name="password"
                onChange={(e: any) => setpass(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input type="password" id="password" name="password" />
            </div>
            <Button
              className="p-2 bg-slate-800 border-none text-white"
              style={{ paddingBottom: "30px" }}
              onClick={(e: any) => onSubmit(e)}
            >
              {loginLoading ? "Đang đăng ký ..." : "Đăng ký"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
