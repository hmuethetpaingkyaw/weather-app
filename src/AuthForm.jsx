import { useRef, useState } from "react";
import { apiCall } from "./service/apiService";
import { setToken } from "./utils/cache";
import { useNavigate } from "react-router";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (emailRef.current.value && passwordRef.current.value) {
      const url = isLogin
        ? "http://localhost:3000/login"
        : "http://localhost:3000/register";

      const resp = await apiCall(url, "post", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      setToken(resp?.data?.accessToken);
      navigate("/");
    }
  };
  return (
    <div className="container">
      <div
        className="row d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
        }}
      >
        <div className="card col-5 bg-warning p-5">
          <div className="card-body d-flex flex-column gap-3">
            <h1>{isLogin ? "Log in" : "Sign Up"}</h1>
            <input
              type="email"
              className="form-control"
              placeholder="email"
              ref={emailRef}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              ref={passwordRef}
            />

            <button className="btn btn-danger" onClick={handleSave}>
              {isLogin ? "Log in" : "Sign Up"}
            </button>
            {isLogin ? (
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setIsLogin(false)}
              >
                Not register yet ?
              </span>
            ) : (
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setIsLogin(true)}
              >
                Log in
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
