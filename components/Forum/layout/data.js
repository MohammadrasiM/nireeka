import { HomeIcon, UserGroupIcon, TrendingUpIcon, PhotographIcon, ClipboardCheckIcon } from "@heroicons/react/outline";

export const navigation = [
  { name: "Home", href: "/forum/1", icon: HomeIcon },
  {
    name: "Channels",
    href: "/forum/channels",
    icon: UserGroupIcon,
  },
  { name: "Trending", href: "/forum/trending", icon: TrendingUpIcon },
  { name: "Gallery", href: "/forum/gallery", icon: PhotographIcon },
  { name: "Leaderboard", href: "/forum/leaderboard", icon: ClipboardCheckIcon },
];
