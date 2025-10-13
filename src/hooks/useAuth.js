import { useContext } from "react";
import {AuthContext} from "../context/Authcontext"



// Custom hook to consume AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
