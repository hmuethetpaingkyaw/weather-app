import { Outlet, useNavigate } from "react-router";
import { getToken } from "../utils/cache";
import { useEffect } from "react";

export default function DefaultLayout() {
  const navigate = useNavigate();

  const check = async () => {
    const token = await getToken();
    if (!token) {
      navigate("/auth");
    }
  }
  useEffect(() => {
    check()
  }, []);

  return (
    <div className="bg-img">
      <Outlet />
    </div>
  );
}
