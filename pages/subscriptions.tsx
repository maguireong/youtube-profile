import { useEffect, useState } from "react";
import { MainTemplate } from "../components";
import { Button } from "../components/Button";
import { Subscription } from "../model/Subscription";
import { getUserSubscriptions } from "../server/endpoints";

const MAX_RESULT_PER_PAGE = 50;

export default function Subscriptions() {
  const [subs, setSubs] = useState<Subscription[]>();
  const [currentCount, setCurrentCount] = useState(0);
  const getSubscriptions = async () => {
    const data = await getUserSubscriptions();
    console.log(data);
    const transformData = data.items.map((data) => ({
      id: data.id,
      description: data.snippet.description,
      title: data.snippet.title,
      thumbnail: data.snippet.thumbnails.default.url,
    }));
    setSubs(transformData);
    setCurrentCount(data.pageInfo.totalResults);
  };
  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <MainTemplate>
      <Button click={getSubscriptions} className="bg-red-400 text-white">
        get subs
      </Button>
      <section className="flex flex-wrap my-12 gap-4">
        {subs?.map(({ id, description, title, thumbnail }) => (
          <div
            key={id}
            className="bg-white flex-1/5 w-80 h-fit text-wrap shadow gap-y-2 rounded-lg p-2"
          >
            <div className="font-semibold text-lg">{title}</div>
            <div>{description}</div>
            <img src={thumbnail} height="20%" width="20%" />
          </div>
        ))}
      </section>
      {currentCount < MAX_RESULT_PER_PAGE ? (
        <div className="text-2xl flex mb-4 justify-center text-white">
          No more results
        </div>
      ) : (
        <Button click={getSubscriptions} className="bg-blue-400 text-white">
          more subs
        </Button>
      )}
    </MainTemplate>
  );
}
