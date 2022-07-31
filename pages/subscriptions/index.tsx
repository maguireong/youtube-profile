import classNames from "classnames";
import { useEffect, useState } from "react";
import { Button, MainTemplate, TopBar } from "../../components";
import { getSubscriptionData, Subscription } from "../../model";

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
      <section className={classNames("ml-28", searchTerm && "h-screen")}>
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
              .map(({ id, title, thumbnail }) => (
                <Button
                  key={id}
                  link={`/subscriptions/${encodeURIComponent(id)}`}
                  className="flex hover:opacity-50 items-center m-1 w-48 rounded flex-col gap-y-2"
                >
                  <img
                    src={thumbnail.url}
                    alt="Subscription thumbnail"
                    height="60%"
                    width="60%"
                  />
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
