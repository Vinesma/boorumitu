import axios from 'axios';
import { useState } from 'react';
import { Site } from '../interfaces/types';

const urls = [
    "https://danbooru.donmai.us",
    "https://yande.re",
]

/** Returns a string with the baseURL of the supported website */
const chooseSite = (site: Site): string => {
    switch(site) {
        case "danbooru":
            return urls[0];
        case "yande.re":
            return urls[1];
        default:
            return urls[0];
    }
}

type Status = "idle" | "pending" | "success" | "error";

/** Perform a request using axios */
export default function useAxiosRequest<ResponseType>(site: Site, initialState: any) {
    const [requestStatus, setRequestStatus] = useState<Status>("idle");
    const [requestValue, setRequestValue] = useState<ResponseType>(initialState);
    const [requestError, setRequestError] = useState<any>(null);

    const axiosInstance = axios.create({
        baseURL: chooseSite(site),
    });

    const get = (params: string): Promise<void> => {
        setRequestStatus("pending");
        setRequestValue(initialState);
        setRequestError(null);

        return axiosInstance.get(params)
            .then(response => {
                setRequestValue(response.data);
                setRequestStatus("success");
            })
            .catch(error => {
                setRequestError(error);
                setRequestStatus("error");
            });
    };

    return { get, requestValue, requestStatus, requestError };
}