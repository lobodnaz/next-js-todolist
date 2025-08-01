import axios from "axios";

export interface TaskRequest {
    title: string;
    description?: string | null;
};

const api = axios.create({
    baseURL: "https://localhost:7108",
    headers: {
        "Content-Type": "application/json"
    },
});

export const getPagSortTasks = async (page: number, pageSize: number, sortBy: string, sortOrder: string, searchedText?: string) => {
    const response = await api.get("/Tasks", {params: {page, pageSize, sortBy, sortOrder, searchedText}});
    return response.data;
};

export const createTask = async (taskRequest: TaskRequest) => {
    try {
        const response = await api.post("/Tasks", taskRequest);
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.data) {
            throw error.response.data;
        } else {
            throw {general: "Something went wrong"};
        }
    }
};

export const updateTask = async (id: string, taskRequest: TaskRequest) => {
    try {
        console.log(1)
        const response = await api.put(`/Tasks/${id}`, taskRequest);
        console.log(2)
        return response.data;
    } catch (error: any) {
        console.log(3)
        if (axios.isAxiosError(error) && error.response?.data) {
            console.log(4)
            throw error.response.data;
        } else {
            throw {general: "Something went wrong"};
        }
    }
};

export const updateTaskStatus = async (id:string) => {
    await api.patch(`/Tasks/${id}`);
}

export const deleteTask = async (id: string) => {
    await api.delete(`/Tasks/${id}`);
};
