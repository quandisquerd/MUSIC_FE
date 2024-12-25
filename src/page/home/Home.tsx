import Banner from "../../component/banner/Banner";
import ArtistsYouShouldFollow from "../../component/Home/ArtistsYouShouldFollow";
import Like from "../../component/Home/Like";
import Morelike from "../../component/Home/Morelike";
import RecentlyPlayed from "../../component/Home/RecentlyPlayed";
import Youlike from "../../component/Home/Youlike";


const Home = ({user}: any) => {
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen pr-48 pl-48 mt-14 pb-14 mb-12">
      <div className="flex w-full max-w-7xl mt-8 space-x-8">
        <div className="flex-1">
          <Banner />
          <Youlike  user={user}/>
          <Morelike user={user}/>
          <RecentlyPlayed  user={user}/>
        </div>

        <div className="w-1/4">
          <ArtistsYouShouldFollow user={user}/>

          <Like user={user}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
