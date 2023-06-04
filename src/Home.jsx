
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { apiCall } from "./service/apiService";
import { removeToken } from "./utils/cache";

export default function Home() {
  const [data, setData] = useState(null);
  const inputValueRef = useRef();
  const navigate = useNavigate();

  const loadData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=189271b827844bff7388350c44848615&units=metric`;
    const tempData = await apiCall(url, 'get', null, true);
    setData(tempData.data);
  };
  useEffect(() => {
    loadData("Rome");
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      loadData(inputValueRef.current.value);
    }
  };

  const handleSave = async ()=> {
      const date = new Date();

    const postData = {
      name: data?.name,
      weather: data?.weather[0]?.main,
      temp: data?.main?.temp,
      humidity: data?.main?.humidity,
      wind_speed: data?.wind?.speed,
      feels_like: data?.main?.feels_like,
      date: `${date.getFullYear()}-${date.getMonth()} - ${date.getDay()}`,
    };
    const url = 'http://localhost:3000/weather_history';
    await apiCall(url, 'post', postData);
    navigate('/weather-history');
  }
  const handleLogout = ()=> {
    removeToken();
    navigate('/auth');
  }
  if (!data) {
    return <h1>loading....</h1>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <div className="d-flex justify-content-end col-12">
        <button
          className="btn btn-warning"
          onClick={handleLogout}
        >
          Log out
        </button>
        <button
          className="btn btn-danger"
          onClick={() => navigate("/weather-history")}
        >
          History
        </button>
      </div>
      <div className="col-6 bg-dark p-5 border border-white rounded d-flex flex-column gap-3">
        <input
          type="text"
          className="form-control input"
          placeholder="Search location"
          ref={inputValueRef}
          onKeyDown={handleSearch}
        />
        <h1 className="text-warning">{data?.name}</h1>
        <div className="d-flex align-items-center group justify-content-center">
          <img src={`http://openweathermap.org/img/wn/10n@2x.png`} alt="" />
          <h1>{data?.weather[0]?.main}</h1>
        </div>

        <h1>{data?.main?.temp} °C</h1>

        <div className="row">
          <div className="col-sm-4">
            <div>
              <p>Humidity</p>
              <h1>{data?.main?.humidity} %</h1>
            </div>
          </div>

          <div className="col-sm-4">
            <div>
              <p>Wind</p>
              <h1>{data?.wind?.speed} km/h</h1>
            </div>
          </div>

          <div className="col-sm-4">
            <div>
              <p>Feels Like</p>
              <h1>{data?.main?.feels_like} °C</h1>
            </div>
          </div>
          <button className="btn btn-primary mt-3" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
