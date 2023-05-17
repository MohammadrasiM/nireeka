import {NextSeo} from 'next-seo';
import {useRouter} from 'next/router';

const CustomInfoHead = ({name, description}) => {
  const router = useRouter();
  return (
    <NextSeo
      title={name}
      description={description}
      canonical={decodeURIComponent(`https://nireeka.com${router?.asPath}`)}
      openGraph={{
        url: decodeURIComponent(`https://nireeka.com${router?.asPath}`),
        type: 'website',
        title: name,
        description: description,
        site_name: 'Nireeka'
      }}
    />
  );
};

export default CustomInfoHead;
