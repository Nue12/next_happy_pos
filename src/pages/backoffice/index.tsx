import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const BackOfficeApp = () => {
  const { data } = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log("data: ", data);
    if (data) {
      router.push("/backoffice/orders");
    } else {
      router.push("/auth/signin");
    }
  }, [data, router]);
  return null;
};

export default BackOfficeApp;
