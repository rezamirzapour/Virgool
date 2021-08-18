import { Box } from '@material-ui/core';

export function Empty() {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="500px">
            <Box display="flex" flexDirection="column" alignItems="center">
                {/* <img src={NoDataImage} width="200px" height="200px" /> */}
                <span style={{ marginTop: '1em' }}>داده ای برای نمایش وجود ندارد.</span>
            </Box>
        </Box>
    );
}
