import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, message, Result, Upload } from "antd";
import AddInfoMusic from "./AddInfoMusic";
import { useNavigate } from "react-router-dom";
import {
  useCancelUploadMutation,
  useCheckUploadFileUserQuery,
  useUploadFileMutation,
} from "../../api/uploadFile";
import LoadingOverlay from "../../component/loading/Loading";

const UploadMusic = ({ user, users }: any) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [uploadfile, { isLoading }] = useUploadFileMutation();
  const [uploadedFiles, setUploadedFiles] = useState();
  const [filename, setFileName] = useState();
  const { data: checkuser } = useCheckUploadFileUserQuery({
    token: user?.token,
  });

  const HandleClose = () => {
    navigate("/");
  };
  const handleChange = (info: any) => {
    const file = info.file;
    setFileName(file.name);
  };
  const handleBeforeUpload = (file: any) => {
    const formData = new FormData();
    formData.append("audio", file);

    // Gọi API upload từ Redux Toolkit Query
    uploadfile({ formData, token: user?.token })
      .unwrap()
      .then((response) => {
        setUploadedFiles(response?.playlistUrl);
        // message.success('File uploaded successfully!');
        console.log("Upload response:", response);
      })
      .catch((err) => {
        // message.error('Upload failed');
        console.error("Upload error:", err);
      });

    // Trả về false để ngừng hành động upload mặc định của Ant Design
    return false;
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 h-screen">
      {isLoading && <LoadingOverlay user={user} />}
      {contextHolder}
      {filename ? (
        " "
      ) : (
        <div className="bg-yellow-600 w-full py-3 text-white text-sm flex justify-center">
          <p>
            We're making SoundCloud better, but you know best: as you notice
            updates, we'd love to hear what you think.
          </p>
        </div>
      )}

      <div className="flex mt-6 mx-[7.5] w-5/6">
        <div className="flex">
          <img
            src="https://res.cloudinary.com/drabu9wqg/image/upload/v1738849760/111_kihbk9.png"
            alt="Logo"
            className="h-16 mr-auto"
          />
          <span className="h-6 text-xl font-bold ml-4">Upload</span>
        </div>

        <Button
          className="ml-auto rounded-full bg-gray-100 w-8 h-8 flex items-center justify-center"
          onClick={HandleClose}
        >
          <CloseOutlined className="text-black text-sm mb-1" />
        </Button>
      </div>
      {!checkuser?.status ? (
        <Result
          className="mt-20"
          status="warning"
          title="You need to complete the information. Go to update personal page"
          extra={
            <Button type="primary" key="console">
              Go to page 
            </Button>
          }
        />
      ) : (
        <>
          {uploadedFiles ? (
            <AddInfoMusic
              filename={filename}
              user={user}
              users={users}
              file={uploadedFiles}
            />
          ) : (
            <div className="flex flex-col items-center mt-10 w-11/12 max-w-3xl bg-white shadow-md p-6 rounded-md">
              <button className="mt-4 text-sm text-yellow-600 border border-yellow-600 px-4 py-2 rounded hover:bg-yellow-100">
                Get unlimited uploads
              </button>

              <h1 className="text-xl font-semibold mt-8 text-gray-800">
                Upload your audio files.
              </h1>
              <p className="text-sm text-gray-600 mt-2 text-center">
                For best quality, use WAV, FLAC, AIFF, or ALAC. The maximum file
                size is 4GB uncompressed.
                <a href="#" className="text-blue-500 hover:underline">
                  Learn more.
                </a>
              </p>
              <div className="border-2 border-dashed border-gray-400 w-full mt-6 h-40 flex flex-col justify-center items-center rounded-md">
                <Upload
                  multiple
                  accept=".wav,.flac,.aiff,.alac,.mp3"
                  onChange={handleChange}
                  beforeUpload={handleBeforeUpload}
                >
                  {filename ? (
                    <span>{filename}</span> // Hiển thị tên file đã chọn
                  ) : (
                    <button className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
                      Choose files
                    </button>
                  )}
                </Upload>
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-auto text-center py-6 text-gray-500 text-xs">
        <p>
          Legal - Privacy - Cookie Policy - Cookie Manager - Imprint - About us
          - Copyright
        </p>
      </div>
    </div>
  );
};

export default UploadMusic;
