import ConfiguratorMain from "@/components/configurator/MainConfigurator";
import { getConfiguratorBikesFilters } from "app/api/configurator";
import CustomHead from "@/components/seo/CustomHead";

function Configurator({ bikes, filters }) {
  return (
    <>
      <CustomHead
        // name="configurator"
        selfTitle
        // title="configurator"
        title="configurator"
        name="Configurator | Build your own customized Nireeka ebike"
        keywords={Object.keys(bikes)}
        images={Object.values(bikes)?.map((bike) => bike?.[0]?.variation_image)}
        available
        categoryUrl="configurator"
        description="Build your own customized Nireeka ebike"
      />
      <ConfiguratorMain bikes={bikes} filters={filters} />
    </>
  );
}

export default Configurator;
export const getStaticProps = async () => {
  let allBikes = await getConfiguratorBikesFilters();

  return {
    props: { bikes: allBikes?.data?.bikes, filters: allBikes?.data?.filters },
    revalidate: 2000,
  };
};
