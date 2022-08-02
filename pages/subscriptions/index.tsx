import classNames from "classnames";
import { useEffect, useState } from "react";
import { ClickArea, MainTemplate, Shimmer, TopBar } from "../../components";
import { Subscription } from "../../model";
import { useWindowWidth } from "../../useWindowWidth";
import { EmptyVideoPage } from "../../views";
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
  const isMobileView = useWindowWidth() < 1290;

  return (
    <MainTemplate>
      {!isMobileView && (
        <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}

      <section className={classNames(isMobileView ? "" : "mx-32", "py-12")}>
        <h1
          className={classNames(
            isMobileView ? "flex justify-center" : "ml-24",
            "text-4xl my-12 text-white"
          )}
        >
          Your Subscriptions
        </h1>
        <div
          className={classNames(
            isMobileView ? "flex-col items-center" : "mx-32",
            "flex flex-wrap my-12 gap-4"
          )}
        >
          {!subs ? (
            <div className="h-screen">
              <div className="animate-pulse flex flex-col space-y-4">
                <Shimmer rounded className="w-28 h-28" />
                <Shimmer className="h-6" />
              </div>
            </div>
          ) : subs.length === 0 ? (
            <EmptyVideoPage />
          ) : (
            subs
              .filter((sub) =>
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
                  <div className="font-semibold text-lg text-center text-gray-400">
                    {title}
                  </div>
                </ClickArea>
              ))
          )}
        </div>
      </section>
    </MainTemplate>
  );
}
