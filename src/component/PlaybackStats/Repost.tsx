import { RetweetOutlined } from '@ant-design/icons'


const Repost = ({repost}:any) => {
  return (
    <span style={{ fontSize: "14px" }} className="flex ml-2">
    <RetweetOutlined className="mr-1 text-sm" />
    {repost ? repost :0}
  </span>
  )
}

export default Repost