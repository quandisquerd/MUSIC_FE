import AudioPlayer from "./AudioPlayer";
import "./item.css";

const ItemFind = ({ data ,onClick,onCloseModel}: any) => {
    const HandleClick=()=>{
        onClick(data)
        onCloseModel(false)
    }
  return (
    <div className="main p-1" onClick={()=>HandleClick()}>
      <div className="loader1">
        <div className="albumcover">
          <img src={data?.Music?.image} className="rounded w-full albumcover" />
        </div>
        <div className="song">
          <p className="name">{data?.Music?.name?.length>10 ? data?.Music?.name?.slice(0,10) :data?.Music?.name }</p>
          <p className="artist">{data?.User?.username}</p>
        </div>
        <div className="ml-auto">
          <AudioPlayer src={data?.Music?.file ? data?.Music?.file : ""} />
        </div>
      </div>
    </div>
  );
};

export default ItemFind;
