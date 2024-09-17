// CircuitService.js

import refreshToken from "../../helpers/functions";

const CircuitService = {
  getAllCircuits: async () => {
    let http = await refreshToken();
    let result = await http.get(`/circuit`);
    return result.data;
  },

  getCircuitById: async (id) => {
    let http = await refreshToken();
    let result = await http.get(`/circuit/${id}`);
    return result.data;
  },

  addCircuit: async (data) => {
    let http = await refreshToken();
    let result = await http.post(`/circuit`, data);
    return result.data;
  },

  updateCircuit: async (id, data) => {
    let http = await refreshToken();
    let result = await http.put(`/circuit/${id}`, data);
    return result.data;
  },

  deleteCircuit: async (id) => {
    let http = await refreshToken();
    let result = await http.delete(`/circuit/${id}`);
    return result.data;
  },

  getCircuitsByDate: async () => {
    let http = await refreshToken();
    let result = await http.get(`/circuit/date/getByDate`);
    return result.data;
  },

  getByLivreur : async (id) => {
    let http = await refreshToken();
    let result = await http.get(`/circuit/livreur/${id}`);
    return result.data;
  }
};

export default CircuitService;
