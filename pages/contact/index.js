import React, { useState } from "react";
import { toast } from "react-toastify";
import { getFormContactUs } from "../../app/api/contact";
import Contact from "@/components/contact/Contact";
import Head from "next/head";
import CustomHead from "@/components/seo/CustomHead";

function Index() {
  return (
    <>
      <CustomHead
        selfTitle
        title="Contact - Nireeka Bikes"
        name="Contact Us"
        description="Get in touch with us for any inquiries or feedback."
        // images={["https://example.com/contact-image.jpg"]}
        keywords={["contact us", "inquiries", "feedback"]}
        available
      />

      <Contact />
    </>
  );
}

export default Index;
