import { useEffect, useState } from "react";
import { MainTemplate } from "../../components";
import { Button } from "../../components/Button";
import { TopBar } from "../../components/Topbar";
import { Subscription } from "../../model/Subscription";
import { useSubscription_Read } from "../../model/useSubscription_Read";

const MAX_RESULT_PER_PAGE = 50;

export default function Subscriptions() {
  const [subs, setSubs] = useState<Subscription[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCount, setCurrentCount] = useState(0);
  const getSubscriptions = async () => {
    const [transformData, totalResults] = await useSubscription_Read({});
    setSubs(Array.isArray(transformData) ? transformData : undefined);
    setCurrentCount(totalResults);
  };
  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <MainTemplate>
      <section className="ml-28 h-screen">
        <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div>
          <h1 className="text-4xl ml-12 mt-12 text-white">
            Your Subscriptions
          </h1>
          <section className="flex flex-wrap m-8 gap-4">
            {subs
              ?.filter((sub) =>
                sub.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(({ id, description, title, thumbnail }) => (
                <Button
                  key={id}
                  link={`/subscriptions/${encodeURIComponent(id)}`}
                  className="flex hover:bg-opacity-70 items-center m-1 w-48 rounded flex-col gap-y-2"
                >
                  <img src={thumbnail.url} height="60%" width="60%" />
                  <div className="font-semibold text-lg text-gray-400">
                    {title}
                  </div>
                </Button>
              ))}
          </section>
        </div>
      </section>
    </MainTemplate>
  );
}
