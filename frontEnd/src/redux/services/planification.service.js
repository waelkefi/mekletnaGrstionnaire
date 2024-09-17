// planificationService.js
import refreshToken from "../../helpers/functions";

export const createPlanification = async (data) => {

  let http = await refreshToken();
  let result = await http.post(`planification`, data);
  return result.data;
}
export const getPlanifications = async () => {
  let http = await refreshToken();
  let result = await http.get(`planification/`);
  return result.data;
}
export const getPlanificationById = async (id) => {
  let http = await refreshToken();
  let result = await http.get(`planification/${id}`);
  return result.data;
}

export const updatePlanification = async (id, data) => {
  let http = await refreshToken();
  let result = await http.put(`planification/${id}`, data);
  return result.data;
}

export const deletePlanification = async (id) => {
  let http = await refreshToken();
  let result = await http.delete(`planification/${id}`);
  return result.data;
}

export const getPlanificationsByDate = async (date) => {
  let http = await refreshToken();
  let result = await http.get(`planification/date/${date}`);
  return result.data;
}
