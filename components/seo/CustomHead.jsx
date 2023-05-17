import Head from 'next/head'
import { useRouter } from "next/router";

const CustomHead = ({
  images,
  name,
  description,
  categoryUrl,
  price,
  categories,
  gtin,
  available = true,
  keywords = [],
  selfTitle,
}) => {
  const router = useRouter();
  const customName = name ? `Nireeka | ${name} is best bike` : "Nireeka";
  const customTitle = selfTitle ? `${name}` : customName;
  return (
    <>
        <Head>
            <title>{customTitle}</title>
            <link rel="canonical" key="canonical" href={decodeURIComponent(`https:/nireeka.com${router?.asPath}`)} />
            <meta name="description" key="description" content={description} />
            <meta name="keywords" key="keywords"  content={["Nireeka", "ebike", "bike", "carbon fiber", "affordable", "online shop", name, ...keywords].join(",") || name || "nireeka"} />
            <meta name="twitter:url" key="twitterUrl" content={decodeURIComponent(`https:/nireeka.com${router?.asPath}`)} />
            <meta name="twitter:title" key="twitterTitle" content={customTitle} />
            <meta name="twitter:description" key="twitterDescription" content="Nireeka is an electric mobility company that redefines the biking  experience using its solid, sleek, and gorgeous design and strives to make smarter e-bikes with better performance." />
            <meta name="twitter:image" key="twitterImage" content={images?.[0] || 'https://api.nireeka.com/images/promo/nyx-promo-1.jpg'} />
            <meta name="keywords" key="twitterKeywords" content={["Nireeka", "ebike", "bike", "carbon fiber", "affordable", "online shop", name, ...keywords].join(",") || name || "nireeka"} />
            <meta property="og:type" key="openGraphType" content="product" />
            <meta property="og:image" key="openGraphImage" content={images?.[0] || 'https://api.nireeka.com/images/promo/nyx-promo-1.jpg'} />
            <meta property="og:url" key="openGraphUrl" content={decodeURIComponent(`https:/nireeka.com${router?.asPath}`)} />
            <meta property="og:title" key="openGraphTitle" content={customTitle} />
            <meta property="og:description" key="openGraphDescription" content={description} />
        </Head>
      {/*<NextSeo*/}

      {/*  openGraph={{*/}
      {/*    url: decodeURIComponent(`https:/nireeka.com${router?.asPath}`),*/}
      {/*    type: "product",*/}
      {/*    title: name,*/}
      {/*    description: description,*/}
      {/*    images: { url: images?.[0] || 'https://api.nireeka.com/images/promo/nyx-promo-1.jpg' },*/}
      {/*    site_name: "Nireeka",*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<BreadcrumbJsonLd*/}
      {/*  itemListElements={categories?.map((category, index) => ({*/}
      {/*    position: index + 1,*/}
      {/*    name: category.name,*/}
      {/*    item: `https://nireeka.com/configurator/${category.id}`,*/}
      {/*  }))}*/}
      {/*/>*/}
      {/*<ProductJsonLd*/}
      {/*  productName={name}*/}
      {/*  images={images}*/}
      {/*  description={description}*/}
      {/*  brand="Nireeka"*/}
      {/*  manufacturerName="Nireeka"*/}
      {/*  offers={[*/}
      {/*    {*/}
      {/*      price: price || "",*/}
      {/*      priceCurrency: "IRR",*/}
      {/*      priceValidUntil: "",*/}
      {/*      itemCondition: "https://schema.org/NewCondition",*/}
      {/*      availability: available*/}
      {/*        ? "https://schema.org/InStock"*/}
      {/*        : "https://schema.org/SoldOut",*/}
      {/*      url: categoryUrl ? `https://nireeka.com/${categoryUrl}` : null,*/}
      {/*      category: categoryUrl ? `https://nireeka.com/${categoryUrl}` : null,*/}
      {/*      seller: {*/}
      {/*        name: "Nireeka",*/}
      {/*      },*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*  // mpn="925872",*/}
      {/*  gtin13={gtin}*/}
      {/*  category={`https://nireeka.com/${categoryUrl}`}*/}
      {/*  // color="blue"*/}
      {/*  // manufacturerLogo="https://www.example.com/photos/logo.jpg"*/}
      {/*  // material="steel"*/}
      {/*  // slogan="For the business traveller looking for something to drop from a height."*/}
      {/*  // disambiguatingDescription="Executive Anvil, perfect for the business traveller."*/}
      {/*  // releaseDate="2014-02-05T08:00:00+08:00"*/}
      {/*  // productionDate="2015-02-05T08:00:00+08:00"*/}
      {/*  // purchaseDate="2015-02-06T08:00:00+08:00"*/}
      {/*  // award="Best Executive Anvil Award."*/}
      {/*  // reviews={[*/}
      {/*  //   {*/}
      {/*  //     author: 'Jim',*/}
      {/*  //     datePublished: '2017-01-06T03:37:40Z',*/}
      {/*  //     reviewBody: 'This is my favorite product yet! Thanks Nate for the example products and reviews.',*/}
      {/*  //     name: 'So awesome!!!',*/}
      {/*  //     reviewRating: {*/}
      {/*  //       bestRating: '5',*/}
      {/*  //       ratingValue: '5',*/}
      {/*  //       worstRating: '1'*/}
      {/*  //     },*/}
      {/*  //     publisher: {*/}
      {/*  //       type: 'Organization',*/}
      {/*  //       name: 'TwoVit'*/}
      {/*  //     }*/}
      {/*  //   }*/}
      {/*  // ]}*/}
      {/*/>*/}
    </>
  );
};

export default CustomHead;
