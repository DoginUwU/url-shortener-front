const getShortUrl = (shortId: string) => {
    return `${process.env.NEXT_PUBLIC_URL}${shortId}`;
};

export { getShortUrl };
