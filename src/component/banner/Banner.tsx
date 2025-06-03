import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useGetAllBannerActiveQuery } from "../../api/banner";
import { useDispatch, useSelector } from "react-redux";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import { playSong, togglePlayPause } from "../../slice/playerSlice";
import "../../util/css.scss";

const Banner = () => {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { isPlaying, currentSong } = useSelector((state: any) => state?.player);
  const { data: banners } = useGetAllBannerActiveQuery(0);
  const [descriptionIndex, setDescriptionIndex] = useState(0);

  const datas = banners?.data?.map((banner: any) => ({
    id: banner?.id,
    title: banner?.title,
    musicId: banner?.musicId,
    active: banner?.active,
    image: banner?.image,
    description: banner?.description,
    Music: {
      id: banner?.Music?.id,
      name: banner?.Music?.name,
      file: banner?.Music?.file,
      description: banner?.Music?.description,
      view: banner?.Music?.view,
      favorite: banner?.Music?.favorite,
      repost: banner?.Music?.repost,
      image: banner?.Music?.image,
      status: banner?.Music?.status,
      genreId: banner?.Music?.genreId,
      userId: banner?.Music?.userId,
      albumId: banner?.Music?.albumId,
      createdAt: banner?.Music?.createdAt,
      updatedAt: banner?.Music?.updatedAt,
    },
    User: {
      id: banner?.User?.id,
      username: banner?.User?.username,
      avatar: banner?.User?.avatar,
      followersCount: banner?.User?.followersCount,
    },
  }));
  useEffect(() => {
    if (!datas || datas.length === 0) return;

    const interval = setInterval(() => {
      setDescriptionIndex((prev) => {
        const words = datas[index]?.description?.split(" ") || [];
        return prev + 15 < words.length ? prev + 15 : 0; 
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [index, datas]);

  const getWordsByIndex = (text: string, startIndex: number, count: number) => {
    const words = text.split(" ");
    return words.slice(startIndex, startIndex + count).join(" ");
  };
  const nextSlide = () => {
    if (datas?.length) {
      setIndex((prev) => (prev + 1) % datas.length);
    }
  };
  const handlePlaySong = async (song: any) => {
    dispatch(playSong(song));
  };
  const loads = Array.from({ length: 6 }, (_, index) => (
    <div
      key={index}
      className={`${isPlaying ? "load" : "load1"} text-white`}
    ></div>
  ));
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl group mt-8 select-none">
      <AnimatePresence>
        {datas && datas.length > 0 && (
          <motion.div
            key={index}
            className="absolute w-full h-full "
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={datas[index].image}
              alt="slide"
              className="w-full h-full object-cover opacity-90"
            />
            <motion.div
              className="absolute top-5 left-1 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded text-2xl font-black"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {datas[index].title}
            </motion.div>
            <motion.div
              className="absolute bottom-10 left-24 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded text-lg font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {getWordsByIndex(datas[index]?.description, descriptionIndex, 15)}
            </motion.div>
            <div className="absolute inset-0  flex top-20 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="bg-orange-600 mb-20 text-white p-3 rounded-full opacity-75 hover:opacity-100 transform scale-110 hover:scale-125 transition-all z-10"
                // onClick={() => handlePlaySong(datas[index])}
              >
                {currentSong?.Music?.id == datas[index]?.Music?.id ? (
                  isPlaying ? (
                    <PauseOutlined
                      className="w-8 h-8 flex items-center justify-center pl-0.5 text-2xl"
                      onClick={() => dispatch(togglePlayPause())}
                    />
                  ) : (
                    <CaretRightOutlined
                      className="w-8 h-8 flex items-center justify-center pl-0.5 text-2xl"
                      onClick={() => dispatch(togglePlayPause())}
                    />
                  )
                ) : (
                  <CaretRightOutlined
                    className="w-8 h-8 flex items-center justify-center pl-0.5 text-2xl"
                    onClick={() => handlePlaySong(datas[index])}
                  />
                )}
              </button>
            </div>
            {currentSong?.Music?.id == datas[index]?.Music?.id ? (
              isPlaying ? (
                <div className="flex ml-auto mr-6 mb-12 absolute inset-0  left-5  items-center justify-center opacity-100 group-hover:opacity-0  transition-opacity">
                  <div className="loading ml-auto text">{loads}</div>
                </div>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-900 p-2 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ➜
      </button>
    </div>
  );
};

export default Banner;
