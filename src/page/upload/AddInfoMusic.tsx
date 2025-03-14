import { useState } from "react";
import { Input, Button, Upload, Radio, message } from "antd";
import { CheckCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetAllGenreQuery } from "../../api/genre";
import LoadingOverlay from "../../component/loading/Loading";
import { useAddMusicMutation } from "../../api/music";
import { useNavigate } from "react-router-dom";

const AddInfoMusic = ({ filename, user, file,users }: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [trackTitle, setTrackTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState();
  const { data: genres, isLoading } = useGetAllGenreQuery("");
  const [value, setValue] = useState<any>();
  const [addMusic, { isLoading: adding }] = useAddMusicMutation();

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  

  const props: any = {
    action: `https://api.cloudinary.com/v1_1/${users?.cloudname}/auto/upload`,
    onChange({ file }: any) {
      if (file.status !== "uploading") {
        // Sử dụng một hàm setState để cập nhật mảng uploadedImages
        setUploadedFiles(file.response.secure_url);
      }
    },
    data: {
      upload_preset: `${users?.upload_preset}`,
      folder: "IMAGE",
    },
  };
  const handleSubmit = () => {
    const data = {
      genreId: genre,
      status: value,
      name: trackTitle,
      file: file,
      description: description,
      image: uploadedFiles,
    };
    addMusic({ data, token: user?.token })
      .unwrap()
      .then((res: any) => {
        messageApi.success(res?.message);
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((error: any) => {
        messageApi.open({
          type: "error",
          content: error.message,
        });
      });
  };
  return (
    <>
      {contextHolder}
      {isLoading && <LoadingOverlay />}
      {adding && <LoadingOverlay />}
      <div className="w-full mx-auto bg-white  rounded-lg shadow-lg mt-1 ">
        <div className="flex items-center justify-between bg-green-100 p-2 px-10">
          <div className="text-sm font-semibold text-gray-800 flex items-center justify-center">
            <CheckCircleOutlined className="mr-2 text-sm text-green-600" />
            <span>{filename}</span>
          </div>
          <span className="text-gray-500 ">
            Provide FLAC, WAV, or AIFF for highest audio quality.
            <Button className="border-none bg-green-100">Replace track</Button>
          </span>
        </div>
        <div className="mt-6 space-y-6 ml-40 mr-40">
          <div className="flex ">
            <div
              style={{ width: "400px", height: "400px" }}
              className="flex  border-2 border-dashed border-gray-300 rounded-md items-center justify-center"
            >
              {uploadedFiles ? (
                <img src={uploadedFiles} className="h-full w-full object-cover"/>
              ) : (
                <Upload
                  {...props}
                  multiple
                  accept=".png, .jpg, .jpeg"
                >
                  <PlusOutlined className="flex items-center justify-center text-6xl font-light" />
                  <p className="text-gray-400 text-xl ">Add new artwork</p>
                </Upload>
              )}
            </div>

            <div className="flex-1 pl-6 ml-20 ">
              <div className="mb-10 ">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Track name *
                </label>
                <Input
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                  placeholder="Track title"
                  className="h-12"
                />
              </div>

              <div className="mb-10">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Genre
                </label>
                <select
                  className=" w-full h-12 border border-gray-300 rounded  flex items-center justify-center"
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option className="h-12 pl-2" value={""}></option>
                  {genres?.data?.map((item: any) => {
                    return (
                      <option
                        key={item?.id}
                        className="h-12 pl-2"
                        value={item?.id}
                      >
                        {item?.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-10">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Description
                </label>
                <Input.TextArea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  rows={4}
                  className="h-12"
                />
              </div>
              <div className="mb-10 ">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Track Privacy *
                </label>
                <Radio.Group onChange={onChange} value={value} className="">
                  <Radio value={true}>Public</Radio>
                  <Radio value={false}>Private</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full fixed  bottom-0 flex items-center justify-between p-4 bg-white z-50 border-t border-gray-300 border-opacity-50">
        <p className="flex-1 mr-4 text-sm text-gray-700">
          By uploading, you confirm that your sounds comply with our Terms of
          Use and you don’t infringe anyone else’s rights.
        </p>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white py-3 px-14 rounded-3xl cursor-pointer "
        >
          Upload
        </button>
        <input
          type="file"
          id="upload-input"
          className="hidden"
          // onChange={handleUpload}
        />
      </div>
    </>
  );
};

export default AddInfoMusic;
