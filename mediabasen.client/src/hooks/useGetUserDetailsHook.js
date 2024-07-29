import { useEffect } from "react";
import userService from "../services/userService";

export default function useGetUserDetailsHook(setUser) {
  useEffect(() => {
    async function tryGetUserDetails() {
      const result = await userService.getUserDetails();

      if (result) {
        setUser(result);
      }
    }

    tryGetUserDetails();
  }, []);
}
