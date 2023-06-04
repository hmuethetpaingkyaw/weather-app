import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiCall } from "./service/apiService";
const url = `http://localhost:3000/weather_history`;

export default function WeatherHistory() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const loadData = async () => {
    const tempData = await apiCall(url, "get");
    setData(tempData.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    await apiCall(`${url}/${id}`, "delete");
    loadData();
  };
  const handleUpdate = async (id, row) => {
    await apiCall(`${url}/${id}`, "put", {...row, name: 'Mandalay'});
    loadData();
  };

  return (
    <div className="container">
      <button className="btn btn-success my-5" onClick={() => navigate(-1)}>
        Back
      </button>
      <div className="row">
        {data?.map((row, index) => (
          <div className="card col-3 bg-warning" key={index}>
            <div className="card-body">
              <h5>Date - {row?.date}</h5>
              <h5>Name - {row?.name}</h5>
              <h5>Weather - {row?.weather}</h5>
              <h5>Temp - {row?.temp}</h5>
              <h5>Humidity - {row?.humidity}</h5>
              <h5>Wind speed - {row?.wind_speed}</h5>
              <h5>Feels like - {row?.feels_like}</h5>
            </div>
            <div className="card-footer d-flex gap-3">
              <button
                className="btn btn-primary"
                onClick={() => handleUpdate(row.id, row)}
              >
                Update
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(row.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
