const formatDanbooru = (text: string): string => {
    return text.trim().split(/ +/).join('+');
};

export { formatDanbooru };
