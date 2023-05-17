import ForumLayout from "@/components/Forum/layout/ForumLayout";
import SecondaryNav from "@/components/Forum/layout/SecondaryNav";
import TertiaryColumn from "@/components/Forum/layout/TertiaryColumn";
import { getForumLayoutProps } from "../../../functions/getForumLayoutProps";
import Leaderboard from "@/components/Atoms/leaderboard/Leaderboard";
import Head from "next/head";

const LeaderboardPage = (props) => {
  return (
    <>
      <Head>
        <title>Leaderboard - Nireeka Forum</title>
        <meta
          name="description"
          content={`Nireeka Forum - Ask and answer questions about any Nireeka Product with the large community of E-Bike riders!`}
        />
      </Head>
      <ForumLayout
        leftColumn={<SecondaryNav channels={props.channels} />}
        rightColumn={<TertiaryColumn trending={props.trending} leaderboard={props.leaderboard} />}
      >
        {/* <WhiteShadowCard className="space-y-4">
        {props.allLeaderboard.map((item, index) => (
          <LeaderboardItem key={index} user={item.user} points={item.points} rank={index + 1} />
        ))}
      </WhiteShadowCard> */}
        <Leaderboard NSDCount={50} forumCount="more" leaderboard={props.leaderboard} noViewAll />
      </ForumLayout>
    </>
  );
};

export const getStaticProps = async () => {
  const layoutProps = await getForumLayoutProps();

  return {
    props: layoutProps,
    revalidate: 60,
  };
};

export default LeaderboardPage;
