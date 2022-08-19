import axios from "axios";

export async function AxciosRequest(url, method, headers, params) {
  return params
    ? axios({
        url: url,
        method: method,
        headers: headers,
        data: params,
        timeout: 1000,
      })
    : axios({
        url: url,
        method: method,
        headers: headers,
        data: {},
        timeout: 1000,
      });
}

//GET request

const Getcustomers = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Customers",
    "GET",
    headers,
    {}
  );
};

//POST request


const Postcustomer = (data) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Customers",
    "POST",
    headers,
    data
  );
};


//PUT request

const Putcustomers = (data, id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Customers/" + id,
    "PUT",
    headers,
    data
  );
};


//DELETE request

const deletecustomers = (id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return AxciosRequest(
    "https://localhost:5001/api/Customers/" + id,
    "DELETE",
    headers,
    {}
  );
};


export {
  Getcustomers,
  Postcustomer,
  Putcustomers,
  deletecustomers,
};
