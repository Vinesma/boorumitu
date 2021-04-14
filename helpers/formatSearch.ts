/** Returns a formatted string that can be used in a request to the Danbooru API. */
const formatDanbooru = (text: string): string => {
    return text.trim().split(/ +/, 2).join('+');
};

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

export { formatDanbooru, returnLastTag, returnFirstTag, shouldAppend };
