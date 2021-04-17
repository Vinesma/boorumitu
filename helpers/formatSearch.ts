import { Site } from "../interfaces/types";

/** Returns a formatted string that can be used in a request to the Danbooru API. */
const formatDanbooru = (text: string): string => {
    return text.trim().split(/ +/, 2).join('+');
};

/** Returns a formatted string that can be used in a request to most of the APIs. */
const formatSearch = (text: string): string => {
    return text.trim().split(/ +/).join('+');
};

/** Returns the proper search string for the website */
const switchSearch = (text: string, site: Site): string => {
    switch (site) {
        case "danbooru":
            return formatDanbooru(text);
        case "yande.re":
            return formatSearch(text);
        default:
            return formatSearch(text);
    }
}

/** Returns the first TAG of a string, TAGs are individual strings used for searching and indexing. */
const returnFirstTag = (text: string): string => {
    return text.split(/ +/)[0];
}

/** Returns the last TAG of a string, TAGs are individual strings used for searching and indexing. */
const returnLastTag = (text: string): string => {
    const splitText = text.trim().split(/ +/);
    const lastTag = splitText.length - 1;

    return splitText[lastTag];
};

/** Verify if a search string should be replaced or appended to. Useful for autocompletion. */
const shouldAppend = (text: string): boolean => {
    const splitText = text.trim().split(/ +/);
    const lastTag = splitText.length - 1;

    return lastTag > 0;
}

export { switchSearch, returnLastTag, returnFirstTag, shouldAppend };
