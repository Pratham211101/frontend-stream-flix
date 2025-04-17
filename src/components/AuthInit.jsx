import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { login , logout} from "../store/authSlice"; // your action

export default function AuthInit({ children }) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      console.log("calling refresh token");
      
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/refresh-token`, {
          method: "POST",
          credentials: "include", // very important!
        });

        const result = await res.json();
        if (res.ok && result.data.accessToken) {
          // Set auth status in Redux
          dispatch(login(result.data.user));
          // Optionally store accessToken somewhere if needed
        } else {
          console.log("User not authenticated");
          dispatch(logout())
        }
      } catch (err) {
        console.error("Error refreshing token:", err);
        dispatch(logout())
      } finally {
        setLoading(false);
      }
    };

    refresh();
  }, [dispatch]);

  if (loading) return <h1>Loading...</h1>;
  return <>{children}</>;
}
