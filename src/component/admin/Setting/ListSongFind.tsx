import { useState } from "react";
import ItemFind from "./ItemFind";

const ListSongFind = ({ data ,onChangeAudio, onClose}: any) => {
  const value = (value: any) => {
    onChangeAudio(value);
  };
  const close=(value:any)=>{
    onClose(value)
  }
  return (
    <>
      {data?.data?.length > 0 ? (
        <div>
          {data?.data?.map((item: any) => {
            return (
              <>
                <ItemFind data={item} onClick={value} onCloseModel={close}/>
              </>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ListSongFind;
