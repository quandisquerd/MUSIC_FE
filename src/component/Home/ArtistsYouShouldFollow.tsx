import { useGetUserTopFollowQuery } from "../../api/music";
import LoadingUser from "../loading/LoadingUser";
import TopUser from "./TopUser";

const ArtistsYouShouldFollow = ({ user }: any) => {
  const { data: topUserFollow, isLoading } = useGetUserTopFollowQuery(
    user?.token
  );

  return (
    <>
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-sl font-semibold ">Artists You Should Follow</h2>
        <button className="ml-auto ">Refresh list</button>
      </div>
      {isLoading && <LoadingUser />}
      <ul className="space-y-4">
        {topUserFollow?.data?.map((item: any) => {
          return <TopUser item={item} user={user} key={item?.id} />;
        })}
      </ul>
    </>
  );
};

export default ArtistsYouShouldFollow;
