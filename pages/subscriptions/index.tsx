import { useEffect, useState } from "react";
import { ClickArea, MainTemplate, TopBar } from "../../components";
import { Subscription } from "../../model";
import { getSubscriptionData } from "../../youtube";

export default function Subscriptions() {
  const [subs, setSubs] = useState<Subscription[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const getSubscriptions = async () => {
    const transformData = await getSubscriptionData({});
    setSubs(Array.isArray(transformData) ? transformData : undefined);
  };
  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <MainTemplate>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <section className="mx-32 py-12">
        <h1 className="text-4xl my-12 ml-24 text-white">Your Subscriptions</h1>
        <div className="flex flex-wrap mx-32 my-12 gap-4">
          {subs
            ?.filter((sub) =>
              sub.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(({ id, title, thumbnail }) => (
              <ClickArea
                key={id}
                click={`/subscriptions/${encodeURIComponent(id)}`}
                className="flex hover:opacity-50 items-center m-1 w-48 rounded flex-col gap-y-2"
              >
                <img
                  src={thumbnail.url}
                  className="rounded-full"
                  alt="Subscription thumbnail"
                  height="60%"
                  width="60%"
                />
                <div className="font-semibold text-lg text-gray-400">
                  {title}
                </div>
              </ClickArea>
            ))}
        </div>
      </section>
    </MainTemplate>
  );
}
