// fix the timezone to UTC to prevent tests failing before / after switching to DST :)
export const setup = () => {
    process.env.TZ = 'UTC';
};
