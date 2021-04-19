import axios from 'axios';
import { useState } from 'react';
import { Site, GenericImage } from '../interfaces/types';

const urls = [
    "https://danbooru.donmai.us",
    "https://yande.re",
    "https://gelbooru.com",
]

/** Returns a string with the baseURL of the supported website */
const chooseSite = (site: Site): string => {
    switch(site) {
        case "danbooru":
            return urls[0];
        case "yande.re":
            return urls[1];
        case "gelbooru":
            return urls[2];
        default:
            return urls[0];
    }
}

/** Narrow down each response into a common Generic object for consumption by the app */
const filterBySite = (site: Site, response: any[]): GenericImage[] => {
    let list: GenericImage[];

    switch (site) {
        case "yande.re":
            list = response.map(item => {
                return {
                    id: item.id,
                    preview_url: item.preview_url,
                    file_url: item.file_url,
                    large_file_url: item.jpeg_url,
                    source: item.source,
                    tags: item.tags,
                    file_ext: item.file_ext,
                    md5: item.md5,
                }
            });
            break;
        case "gelbooru":
            list = response.map(item => {
                return {
                    id: item.id,
                    preview_url: `https://img3.gelbooru.com/thumbnails/${item.directory}/thumbnail_${item.image}`,
                    file_url: item.file_url,
                    large_file_url: item.file_url,
                    source: item.source,
                    tags: item.tags,
                    file_ext: ".png",
                    md5: item.hash,
                }
            });
            break;
        case "danbooru":
        default:
            list = response.map(item => {
                return {
                    id: item.id,
                    preview_url: item.preview_file_url,
                    file_url: item.file_url,
                    large_file_url: item.large_file_url,
                    source: item.source,
                    tags: item.tag_string,
                    file_ext: item.file_ext,
                    md5: item.md5,
                }
            });
    }

    return list;
}

type Status = "idle" | "pending" | "success" | "error";

/** Perform a request using axios */
export default function useAxiosRequest(site: Site, initialState: any, filter = false) {
    const [requestStatus, setRequestStatus] = useState<Status>("idle");
    const [requestValue, setRequestValue] = useState(initialState);
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
                if (filter) {
                    setRequestValue(filterBySite(site, response.data));
                } else {
                    setRequestValue(response.data);
                }
                setRequestStatus("success");
            })
            .catch(error => {
                setRequestError(error);
                setRequestStatus("error");
            });
    };

    return { get, requestValue, requestStatus, requestError };
}