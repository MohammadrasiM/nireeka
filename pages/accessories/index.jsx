import AccessoriesMain from "@/components/Home/Accessories/Accessories";
import { getAccessories } from "app/api/accessories";
import CustomHead from "@/components/seo/CustomHead";

function Accessories({ accessories }) {
  return (
    <>
      <CustomHead
        selfTitle
        title="Accessories - Nireeka Bikes"
        name="Bike Accessories"
        description="Upgrade your ride with Nireeka bike accessories, including helmets, lights, bags, and more."
        keywords={Object.values(accessories.data)?.map((bike) => bike.title)}
        images={Object.values(accessories.data)?.map((bike) => bike.thumbnail)}
      />
      <AccessoriesMain accessories={accessories} />
    </>
  );
}

export default Accessories;

export const getStaticProps = async () => {
  let data = await getAccessories();
  return {
    props: { accessories: data },
    revalidate: 6 * 60 * 60,
  };
};
