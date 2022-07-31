export type Subscription = {
  id: string;
  channelId: string;
  mostRecentIndex: number;
  description: string;
  title: string;
  thumbnail: {
    url: string;
    height: string;
    width: string;
  };
  subscriptAt: string;
};

export * from "./getSubscriptionData";
