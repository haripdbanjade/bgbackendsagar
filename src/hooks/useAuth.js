import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// Custom hook to consume AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
