import { Outlet, useNavigate } from "react-router";
import { getToken } from "../utils/cache";
import { useEffect } from "react";

export default function DefaultLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/auth");
    }
  }, []);

  return (
    <div className="bg-img">
      <Outlet />
    </div>
  );
}
