export const getCurrentTime = () => {
    const date = new Date();
    const options: any = {
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return date.toLocaleDateString('en-US', options).toString();
};