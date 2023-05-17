import Link from "next/link";
import React from "react";
import AccessoriesMain from "@/components/Home/Accessories/Accessories";

function Accessories({ Accessories }) {
  return (
    <>
      <AccessoriesMain Accessories={Accessories} />
    </>
  );
}

export default Accessories;
export const getStaticProps = async () => {
  const res = await fetch(`http://api.nireeka.com/api/accessories`);
  const Accessories = await res.json();
  return {
    props: { Accessories },
  };
};
