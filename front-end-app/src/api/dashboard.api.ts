import axiosClient from "./axiosClient";
import { ENDPOINTS } from "./endpoints";

export const getDashboardData = async () => {
    const res = await axiosClient.get(ENDPOINTS.DASHBOARD);
    return res.data;
};