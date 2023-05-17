import { SearchIcon } from "@heroicons/react/outline";
import Leaderboard from "../Atoms/leaderboard/Leaderboard";
import Trending from "@/components/Atoms/trending/Trending";
import DashboardSearchBar from "../Dashboard/layout/DashboardSearchBar";

export default function ProfileLayout(props) {
  return (
    <div className="min-h-full bg-gray-100">
      <header className="pt-4 pb-32 bg-gradient-to-r from-gray-200 to-gray-300"></header>
      <main className="-mt-24 pb-8">
        <div className="max-w-3xl mx-auto px-0 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Profile</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">{props.children}</div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              <div className="max-w-xs mx-auto w-full lg:max-w-md">
                <DashboardSearchBar />
              </div>
              <Trending posts={props.trending} />
              <Leaderboard leaderboard={props.leaderboard} noNumber />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
          <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
            <span className="block sm:inline">&copy; 2022 Nireeka Inc.</span>{" "}
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
