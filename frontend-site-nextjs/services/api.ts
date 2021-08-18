import { http } from "utils";

const fetchData = (path: string, params: any, options: any) =>
  http(path, { params, ...options }).then(response => {
    console.log("THE RESPONSE", response);
    return response
  }).catch(error => {
    console.log("I Caught error", error)
    return error
  })

const fetchAll = (path: string, params = { paginate: true }, options: any) => http(path, { params, ...options }).then(response => {
  console.log("THE RESPONSE", response);
  return response;
}).catch(error => {
  console.log("I Caught error", error)
  return error
});

const fetchOne = (path: string, id: number | string, params: any, options: any) => http(`${path}/${id}`, { params, ...options })
  .then((response) => {
    console.log("THE RESPONSE", response);
    return response;
  }).catch(error => {
    console.log("I Caught error", error)
    return error
  })

const createData = (path: string, data: any, params: any, options: any) => http.post(path, data, { params, ...options });
const updateData = (path: string, id: number | string, data: any, params: any, options: any) => http.put(`${path}/${id}`, data, { params, ...options });
const deleteData = (path: string, id: number | string, params: any, options: any) => http.delete(`${path}/${id}`, { params, ...options });

export { fetchData, fetchAll, fetchOne, createData, updateData, deleteData };
