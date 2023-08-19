export type Tab = {
  index: number;
  name: string;
  link: string;
};

export const tabs: Tab[] = [
  { index: 0, name: "Home", link: "/" },
  { index: 1, name: "Articles", link: "/articles" },
  { index: 2, name: "Tools", link: "/tools" },
];
