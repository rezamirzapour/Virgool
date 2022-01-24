import { Tooltip, withStyles } from '@material-ui/core';

export default withStyles((theme) => ({
    arrow: {
        color: '#40455b'
    },
    tooltip: {
        backgroundColor: '#40455b',
        color: '#f7f7f9',
        boxShadow: theme.shadows[1],
        fontSize: 14
    }
}))(Tooltip);
