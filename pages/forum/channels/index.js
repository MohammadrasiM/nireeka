import ForumLayout from "@/components/Forum/layout/ForumLayout";
import SecondaryNav from "@/components/Forum/layout/SecondaryNav";
import TertiaryColumn from "@/components/Forum/layout/TertiaryColumn";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import { getForumLayoutProps } from "../../../functions/getForumLayoutProps";
import SecondaryButton from "@/components/Atoms/buttons/SecondaryButton";
import Link from "next/link";
import { useSelector } from "react-redux";
import { subscribeToChannel, unsubscribeFromChannel } from "../../../app/api/forum/channels";
import { getChannelsList } from "../../../app/api/forum";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Head from "next/head";

const Channels = (props) => {
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  // State to hold channels data and refresh them when needed
  const [channels, setChannels] = useState(props.channels);

  const refreshChannelData = useCallback(async () => {
    const res = await getChannelsList();
    if (res instanceof Error) {
      setChannels([]);
      return;
    }
    setChannels(res.data);
  }, []);

  useEffect(() => {
    refreshChannelData();
  }, [refreshChannelData]);

  const handleSubscribeClick = async (channel) => {
    try {
      if (channel.is_subscribe) await unsubscribeFromChannel(channel.id);
      else await subscribeToChannel(channel.id);
    } catch (error) {
      console.log(error)
    } finally {
      refreshChannelData();
    }
  };

  return (
    <>
      <Head>
        <title>Channels - Nireeka Forum</title>
        <meta
          name="description"
          content={`Nireeka Forum - Ask and answer questions about any Nireeka Product with the large community of E-Bike riders!`}
        />
      </Head>
      <ForumLayout
        leftColumn={<SecondaryNav channels={props.channels} />}
        rightColumn={<TertiaryColumn trending={props.trending} leaderboard={props.leaderboard} />}
      >
        {channels.map((channel) => (
          <WhiteShadowCard key={`channelSub-${channel.slug}-${channel.id}`} noPadding>
            <div
              style={{ backgroundImage: `url(${channel.image_path})` }}
              className="bg-center rounded-md"
            >
              <div className="flex w-full h-full px-4 py-8 rounded-md bg-black/50">
                <Link href={`/forum/channels/${channel.slug}`}>
                  <a>
                    <p className="text-white font-light hover:text-blue-600">
                      <span className="text-xl">{channel.name} </span>
                      <span className="text-md">({channel.threads_count} threads)</span>
                    </p>
                  </a>
                </Link>
                {isUserLoggedIn && (
                  <SecondaryButton
                    className="ml-auto"
                    onClick={() => handleSubscribeClick(channel)}
                  >
                    {channel.is_subscribe ? "Unsubscribe" : "Subscribe"}
                  </SecondaryButton>
                )}
              </div>
            </div>
          </WhiteShadowCard>
        ))}
      </ForumLayout>
    </>
  );
};

export default Channels;

export const getStaticProps = async () => {
  const layoutProps = await getForumLayoutProps();

  return {
    props: {
      ...layoutProps,
    },
    revalidate: 60,
  };
};
