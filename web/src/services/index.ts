import ApiService from "./api.ts";
import {StorageHelper} from "@/helpers/storageHelper.ts";

const register = async (data: { fullName: string; confirmPassword:string; email: string; password: string }) => {
    return ApiService.post("/auth/register", data)
        .then((response: any) => {
            const { user, accessToken, refreshToken } = response?.data?.data;
            StorageHelper.storeAuthTokens(accessToken, refreshToken)

            StorageHelper.storeUserData(user.fullName, user.email);

            return response?.data.data;
        })
        .catch((error: any) => {
            console.error("Register error:", error);
            throw error;
        });
}

const login = async (data: { email: string; password: string }) => {
    return ApiService.post("/auth/login", data)
        .then((response: any) => {
            const { user, accessToken, refreshToken } = response?.data?.data;
            StorageHelper.storeAuthTokens(accessToken, refreshToken)

            StorageHelper.storeUserData(user.fullName, user.email);
            return response?.data.data;
    }).catch((error: any)=> {
        console.error("Login error:", error);
        throw error;
    })
}


const getNoteDetailService = async (noteId: string) => {
    return ApiService.get(`/note/${noteId}`)
        .then((response: any) => {
            return response?.data.data;
        }).catch((error: any)=> {
            console.error("Fetching error:", error);
            throw error;
        })
}

const getAllNotesService = async (page: number) => {
    return ApiService.get(`/note?page=${page}`)
        .then((response: any) => {
            return response?.data.data;
        }).catch((error: any)=> {
            console.error("Fetching error:", error);
            throw error;
        })
}

const deleteNoteService = async (id: string) => {
    return ApiService.delete(`/note/${id}`)
        .then((response: any) => {
            return response?.data.data;
        }).catch((error: any)=> {
            console.error("Delete error:", error);
            throw error;
        })
}

const createNoteService = async (noteData: any) => {
    return ApiService.post(`/note/create-note`, noteData)
        .then((response: any) => {
            return response?.data.data;
        }).catch((error: any)=> {
            console.error("Create error:", error);
            throw error;
        })
}

const editNoteService = async (id:string, noteData: any) => {
    return ApiService.put(`/note/${id}`, noteData)
        .then((response: any) => {
            return response?.data.data;
        }).catch((error: any)=> {
            console.error("Edit error:", error);
            throw error;
        })
}

export {register, login, getNoteDetailService, getAllNotesService, deleteNoteService, createNoteService, editNoteService}