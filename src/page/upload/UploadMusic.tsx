import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import AddInfoMusic from "./AddInfoMusic";
import { useNavigate } from "react-router-dom";

const UploadMusic = ({ user }: any) => {
  const navigate = useNavigate();

  const [uploadedFiles, setUploadedFiles] = useState();
  const [filename, setFileName] = useState();
  console.log(uploadedFiles);

  const props: any = {
    action: "https://api.cloudinary.com/v1_1/dlhdt9pla/auto/upload",
    onChange({ file }: any) {
      setFileName(file?.name);
      if (file.status !== "uploading") {
        setUploadedFiles(file?.response?.secure_url);
      }
    },
    data: {
      upload_preset: "ml_upload",
      folder: "MUSIC",
    },
  };
  const HandleClose = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 h-screen">
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
            src="https://a-v2.sndcdn.com/assets/images/brand-1b72dd82.svg"
            alt="Logo"
            className="h-6 mr-auto"
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
      {uploadedFiles ? (
        <AddInfoMusic filename={filename} user={user} file={uploadedFiles} />
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
            <Upload {...props} multiple accept=".wav,.flac,.aiff,.alac,.mp3">
              {filename ? (
                ""
              ) : (
                <button className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
                  Choose files
                </button>
              )}
            </Upload>
          </div>
        </div>
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
