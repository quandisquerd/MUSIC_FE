
import {
  useGetUserTopFollowQuery,
} from "../../api/music";
import LoadingOverlay from "../loading/Loading";
import TopUser from "./TopUser";

const ArtistsYouShouldFollow = ({ user }: any) => {
 
  const { data: topUserFollow, isLoading } = useGetUserTopFollowQuery(
    user?.token
  );


  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-sl font-semibold ">Artists You Should Follow</h2>
        <button className="ml-auto ">Refresh list</button>
      </div>
      <ul className="space-y-4">
        {topUserFollow?.data?.map((item: any) => {
          return (
           <TopUser item={item} user={user} key={item?.id}/>
          );
        })}
      </ul>
    </>
  );
};

export default ArtistsYouShouldFollow;
