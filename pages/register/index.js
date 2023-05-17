import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import RegisterFirstForm from "../../components/Login/RegisterFirstForm";
import Head from "next/head";
import { resetAuthSideEffects } from "app/store/authSlice";
import CustomHead from "@/components/seo/CustomHead";

function Register() {
  const router = useRouter();
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);

  useEffect(() => {
    if (isUserLoggedIn) {
      router.push("/dashboard");
    }
  }, [dispatch, isUserLoggedIn, router]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthSideEffects());
    };
  }, [dispatch]);

  return (
    <>
      <CustomHead
        selfTitle
        name="Register"
        description="Create a new Nireeka account and start shopping for bikes and accessories."
        keywords={["Nireeka", "register", "account", "bike", "accessories"]}
        available
      />
      <Head>
        {/* <title>Register - Nireeka</title> */}
        <meta name="description" content="Join the Nireeka World!" />
      </Head>
      <RegisterFirstForm />
    </>
  );
}

export default Register;
