const formatDanbooru = (text: string): string => {
    return text.trim().split(/ +/).join('+');
};

const returnLastTag = (text: string): string => {
    const splitText = text.trim().split(/ +/);
    const lastTag = splitText.length - 1;

    return splitText[lastTag];
};

const returnFirstString = (text: string): string => {
    return text.split(/ +/)[0];
}

const shouldAppend = (text: string): boolean => {
    const splitText = text.trim().split(/ +/);
    const lastTag = splitText.length - 1;

    return lastTag > 0;
}

export { formatDanbooru, returnLastTag, returnFirstString, shouldAppend };
