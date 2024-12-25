import { HeartOutlined } from '@ant-design/icons'

const CmtDetail = ({item}:any) => {
  return (
    <div className="flex  mt-8 items-start">
        <div className="w-1/12 flex flex-col justify-start">
          <img
            src={item?.User?.avatar ? item?.User?.avatar:"https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg"}
            alt=""
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="w-10/12">
          <div className="flex items-center">
            <span className="font-bold text-sm">{item?.User?.username}</span>
            <p className="ml-10 font-medium">1 day ago</p>
          </div>
          <p>{item?.title}</p>
          <button className="font-mono font-bold mt-4">Reply</button>
        </div>
        <div className="w-1/12 flex items-center justify-center">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="text-sm"
          >
            <HeartOutlined />
            <p>0</p>
          </div>
        </div>
      </div>
  )
}

export default CmtDetail