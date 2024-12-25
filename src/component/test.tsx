import { useGetMusicAllQuery } from "../api/music";
import Waveform from "../util/waveform";

const Test = () => {
  const { data } = useGetMusicAllQuery("");
  console.log(data);

  return (
    <div  className="max-w-full text-xs font-bold bg-white text-white  items-center justify-center">
      {data?.map((item: any) => {
        return (
          <div key={item?.id}>
            <Waveform item={item} />
          </div>
        );
      })}
    </div>
  );
};

export default Test;
