import CookiesService from "../services/CookiesService";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userDataPending } from "app/store/authSlice";
import { handleLogoutSuccess } from "services/AuthService";

const ForceLoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.isReady) {
      if (router.query.token) {
        const options = { path: "/", secure: true };
        handleLogoutSuccess();
        CookiesService.set("access_token", router.query.token, options);
        dispatch(userDataPending());
        router.push("/dashboard/orders");
      } else {
        router.push("./404");
      }
    }
  }, [router, dispatch]);
  return <></>;
};

export default ForceLoginPage;
