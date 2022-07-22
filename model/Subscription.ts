export type Subscription = {
  id: string;
  channelId: string;
  mostRecentIndex: number;
  description: string;
  title: string;
  thumbnail: string;
  subscriptAt: string;
};

export const initialData = {
  id: "",
  mostRecentIndex: 1,
  description: "",
  title: "",
  thumbnail: "",
  subscriptAt: "",
};
