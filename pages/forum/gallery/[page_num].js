import { getGalleryPicsByPage } from "../../../app/api/forum";
import Pagination from "@/components/Atoms/pagination/Pagination";
import GalleryPicture from "@/components/Forum/gallery/GalleryPicture";
import ForumLayout from "@/components/Forum/layout/ForumLayout";
import SecondaryNav from "@/components/Forum/layout/SecondaryNav";
import TertiaryColumn from "@/components/Forum/layout/TertiaryColumn";
import { getForumLayoutProps } from "../../../functions/getForumLayoutProps";
import { paginate } from "../../../functions/paginate";
import Head from "next/head";

const Gallery = (props) => {
  const pageCount = Math.ceil(props.pagination.total / props.pagination.page_size);
  const pagination = paginate(props.pagination.current, pageCount);
  const paginationLinks = pagination.indexes.map((pageIndex) => {
    if (pageIndex === -1) return "#";
    return { pathname: `/forum/gallery/${pageIndex}` };
  });

  return (
    <>
      <Head>
        <title>Gallery - Nireeka Forum</title>
        <meta
          name="description"
          content={`Nireeka Forum - ${props.pagination.current} - Ask and answer questions about any Nireeka Product with the large community of E-Bike riders!`}
        />
      </Head>
      <ForumLayout
        leftColumn={<SecondaryNav channels={props.channels} />}
        rightColumn={<TertiaryColumn trending={props.trending} leaderboard={props.leaderboard} />}
      >
        <div>
          <div className="flex flex-wrap justify-between items-center">
            {props.galleryPics.map((item, index) => (
              <GalleryPicture
                key={item.image_path + index}
                src={item.image_path}
                alt={item.title}
                title={item.title}
                href={item.link}
              />
            ))}
          </div>
        </div>
        <Pagination pagination={pagination} links={paginationLinks} />
      </ForumLayout>
    </>
  );
};

export default Gallery;

export const getStaticProps = async (context) => {
  const { page_num } = context.params;

  const responses = await Promise.all([getGalleryPicsByPage(page_num), getForumLayoutProps()]);
  const pics = responses[0];
  const layoutProps = responses[1];

  return {
    props: {
      galleryPics: pics.data.list,
      pagination: pics.data.pagination,
      ...layoutProps,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const pics = await getGalleryPicsByPage(1);
  const pageCount = Math.ceil(pics.data.pagination.total / pics.data.pagination.page_size);
  const paths = [];
  for (let i = 1; i <= pageCount; i++) paths.push({ params: { page_num: `${i}` } });

  return {
    paths,
    fallback: false,
  };
};
