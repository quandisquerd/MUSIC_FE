import { Form, Image, Input, message, Modal, Switch } from "antd";
import { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import {
  CustomerServiceOutlined,
  InboxOutlined,
  MenuOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  useFindSongaddBannerMutation,
  useUpdateBannerMutation,
} from "../../../api/banner";
import ListSongFind from "./ListSongFind";
import Dragger from "antd/es/upload/Dragger";
const { Search } = Input;
const { TextArea } = Input;
const EditBanner = ({ status, onStatus, data, users }: any) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [image, setImage] = useState<any>();
  const [title, setTitle] = useState<any>();
  const [musicId, setMusicId] = useState<any>();
  const [uploadedFiles, setUploadedFiles] = useState();
  const [src, setSrc] = useState<any>("");
  const [desc, setDesc] = useState<any>();
  const [description, setdescription] = useState<any>();
  const [active, setActive] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [username, setusername] = useState<any>(null);
  const [songname, setsongname] = useState<any>(null);
  const [file, setFile] = useState<any>("");
  const [open1, setOpen1] = useState(false);
  const [updateBanner] = useUpdateBannerMutation();
  const onChange = (checked: boolean) => {
    setActive(checked);
  };
  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (data) {
      setImage(data?.image);
      setSrc(data?.file);
      setDesc(data?.description);
      form.setFieldsValue({
        title: data?.title,
        image: data?.image,
        description: data?.description,
        check: data?.active,
      });
    }
  }, [data]);


  const handleCancel = () => {
    onStatus(false);
  };
  const [valuefind, setvaluefind] = useState<any>();
  const [check, setcheck] = useState<any>();
  const [find] = useFindSongaddBannerMutation();
  const HandleFind = (value: any) => {
    setcheck(value);
    find({ name: value })
      .unwrap()
      .then((res: any) => {
        setvaluefind(res);
      });
  };
  const ChangeAudio = (value: any) => {
    setMusicId(value?.Music?.id);
    setFile(value?.Music?.file);
    setsongname(value?.Music?.name);
    setusername(value?.User?.username);
  };
  const close = (value: any) => {
    setOpen(value);
  };
  const showModalImage = () => {
    setOpen1(true);
  };
  const hideModal11 = () => {
    setOpen1(false);
  };
  const props: any = {
    action: `https://api.cloudinary.com/v1_1/${users?.cloudname}/auto/upload`,
    onChange({ file }: any) {
      if (file.status !== "uploading") {
        // Sử dụng một hàm setState để cập nhật mảng uploadedImages
        setUploadedFiles(file.response.secure_url);
        setOpen1(false);
      }
    },
    data: {
      upload_preset: `${users?.upload_preset}`,
      folder: "IMAGE",
    },
  };
  const HandleUpdateBanner = () => {
    const item = {
      title: title ? title : data?.title,
      musicId: musicId ? musicId : data?.filename?.id,
      image: uploadedFiles ? uploadedFiles : image,
      description: description ? description : desc,
      active: active ==null ? data?.active  : active,
    };
    updateBanner({ id: data?.id, data: item })
      .unwrap()
      .then((res: any) => {
        messageApi.success(res?.message)
        form.resetFields()
        setMusicId(null);
        setFile(null);
        setsongname(null);
        setusername(null);
        onStatus(false);
     
      })
      .catch((err:any)=>{
        messageApi.error(err?.message)
      })
      
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Edit Banner"
        open={status}
        width={800}
        style={{ width: "80%", maxWidth: "1000px" }}
        onOk={HandleUpdateBanner}
        onCancel={handleCancel}
      >
        <Form form={form} className="mt-6">
          <div className="flex ">
            <div
              className="w-50 border p-2 rounded mr-2"
              style={{ width: "50%" }}
            >
              <label
                htmlFor="html5-text-input"
                className="col-md-2 col-form-label font-semibold "
              >
                Title
              </label>
              <Form.Item className="col-md-10 mt-1" name="title">
                <Input
                  className="w-80"
                  onChange={(e: any) => setTitle(e?.target?.value)}
                />
              </Form.Item>
            </div>
            <div
              className="ml-auto pl-3 border p-2 rounded"
              style={{ width: "50%" }}
            >
              <label
                htmlFor="html5-text-input"
                className="col-md-2 col-form-label font-semibold"
              >
                Status
              </label>
              <Form.Item
                className="col-md-10 mt-1"
                name="check"
                valuePropName="checked"
              >
                <Switch onChange={onChange} />
              </Form.Item>
            </div>
          </div>
          <div className="border p-2 rounded mt-2">
            <div className="flex items-center">
              <label
                htmlFor="html5-text-input"
                className="col-md-2 col-form-label font-semibold"
              >
                Audio
              </label>
              <MenuOutlined className="ml-auto" onClick={showModal} />
            </div>

            <Form.Item className="mt-1" name="">
              <div className="flex ">
                <div className="mr-3 " style={{ width: "50%" }}>
                  <p className="text-sl flex items-center">
                    <CustomerServiceOutlined className="mr-1" />
                    {songname==null ? data?.filename?.name  :songname }
                  </p>
                  <p className="text-sl font-bold flex items-center mt-1">
                    <UserOutlined className="mr-1" />{" "}
                    {username==null ? data?.filename?.author  :username }
                  </p>
                </div>
                <div style={{ width: "50%" }} className="ml-auto">
                  <AudioPlayer src={file ? file : src} />
                </div>
              </div>
            </Form.Item>
          </div>
          <div className="flex mt-2">
            <div
              className="w-50 border p-2 rounded mr-2"
              style={{ width: "50%" }}
            >
              <div className="flex items-center">
                <label
                  htmlFor="html5-text-input"
                  className="col-md-2 col-form-label font-semibold"
                >
                  Image
                </label>
                <MenuOutlined className="ml-auto" onClick={showModalImage} />
              </div>
              <Form.Item className="col-md-10 mt-1" name="image">
                <img
                  className="text-xs w-52"
                  src={uploadedFiles ? uploadedFiles : image}
                />
              </Form.Item>
            </div>
            <div
              className="w-50 ml-auto border p-2 rounded"
              style={{ width: "50%" }}
            >
              <label
                htmlFor="html5-text-input"
                className="col-md-2 col-form-label font-semibold"
              >
                Description
              </label>
              <Form.Item className="col-md-10 mt-1" name="description">
                <TextArea
                  rows={5}
                  placeholder="maxLength is 6"
                  maxLength={6}
                  onChange={(e: any) => setdescription(e?.target?.value)}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
      <Modal
        title="Change Audio"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Submit"
        cancelText="Cancel"
      >
        <div className="flex justify-center">
          <Search
            placeholder="Enter song"
            style={{ width: 500 }}
            className="mt-2 mb-2 flex justify-center"
            onChange={(e: any) => HandleFind(e?.target?.value)}
          />
        </div>
        {check ? (
          <ListSongFind
            data={valuefind}
            onChangeAudio={ChangeAudio}
            onClose={close}
          />
        ) : (
          ""
        )}
      </Modal>
      <Modal
        title="Change Image"
        open={open1}
        onOk={hideModal11}
        onCancel={hideModal11}
        footer={null}
        // okText="Submit"
        // cancelText="Cancel"
      >
        <div className="p-5">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon ">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint ">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </div>
      </Modal>
    </>
  );
};

export default EditBanner;
