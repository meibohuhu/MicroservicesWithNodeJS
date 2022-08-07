import { useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const Signout = () => {
  const { doRequest }= useRequest({
    url: "/api/users/signout",
    method: "post",
    body: {},
    onSuccess: () => Router.push("/"),
  });
  
  useEffect(() => {       // only happens once
    doRequest();
  }, []);

  return <div>Sgining you out...</div>
}

export default Signout;

