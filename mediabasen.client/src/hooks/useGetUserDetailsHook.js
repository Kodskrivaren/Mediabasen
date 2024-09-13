import { useEffect } from "react";
import userService from "../services/userService";

export default function useGetUserDetailsHook(setUser, setUserLoaded) {
  useEffect(() => {
    async function tryGetUserDetails() {
      const result = await userService.getUserDetails();

      if (result) {
        setUser(result);
      }

      setUserLoaded(true);
    }

    tryGetUserDetails();
  }, []);
}
