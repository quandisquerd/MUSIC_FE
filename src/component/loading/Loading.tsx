import { LoadingOutlined } from "@ant-design/icons";
import { useCancelUploadMutation } from "../../api/uploadFile";
import { message } from "antd";

const LoadingOverlay = ({ user }: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [cancelUpload] = useCancelUploadMutation();
  const HandleCancel = () => {
    cancelUpload(user?.token)
      .unwrap()
      .then((res: any) => {
        console.log(res);
        
        messageApi.success("success!");
      })
      .catch((error: any) => {
        messageApi.error("error!",error);
      });
  };
  return (
    <>
      {contextHolder}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <LoadingOutlined
          style={{
            fontSize: "2rem",
            color: "white",
          }}
          spin
        />
        <button
          className="text-black text-sl bg-white rounded px-2 py-1 mt-10"
          onClick={() => HandleCancel()}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default LoadingOverlay;
