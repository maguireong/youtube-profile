import { useEffect, useState } from "react";
import { MainTemplate } from "../components";
import { Button } from "../components/Button";
import { TopBar } from "../components/Topbar";
import { Subscription } from "../model/Subscription";
import { getUserSubscriptions } from "../server/endpoints";

const MAX_RESULT_PER_PAGE = 50;

export default function Subscriptions() {
  const [subs, setSubs] = useState<Subscription[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCount, setCurrentCount] = useState(0);
  const getSubscriptions = async () => {
    const data = await getUserSubscriptions();
    console.log(data);
    const transformData = data.items.map((data, i) => ({
      id: data.id,
      mostRecentIndex: i,
      description: data.snippet.description,
      title: data.snippet.title,
      thumbnail: data.snippet.thumbnails.default.url,
      subscriptAt: data.snippet.publishedAt,
    }));
    setSubs(transformData);
    setCurrentCount(data.pageInfo.totalResults);
  };
  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <MainTemplate>
      <section className="flex ml-28 flex-col">
        <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <section className="flex flex-wrap  m-8 gap-4">
          {subs
            ?.filter((sub) => sub.title.includes(searchTerm))
            .map(({ id, description, title, thumbnail }) => (
              <div
                key={id}
                className="flex items-center p-2 w-96 rounded flex-col gap-y-2"
              >
                <img src={thumbnail} height="60%" width="60%" />
                <div className="font-semibold text-lg text-gray-400">
                  {title}
                </div>
              </div>
            ))}
        </section>
        {currentCount < MAX_RESULT_PER_PAGE && (
          <div className="text-2xl flex mb-4 justify-center text-white">
            No more results
          </div>
        )}
      </section>
    </MainTemplate>
  );
}
