import { CircularProgress, makeStyles } from '@material-ui/core';

export default function FacebookCircularProgress(props: any) {
    const classes = useStylesFacebook();
    return (
        <div className={classes.root}>
            <CircularProgress
                variant="determinate"
                className={classes.bottom}
                size={40}
                thickness={4}
                value={100}
                {...props}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                classes={{
                    circle: classes.circle,
                }}
                size={40}
                thickness={4}
                {...props}
            />
        </div>
    );
}

const useStylesFacebook = makeStyles((theme) => ({
    root: {
        position: 'relative',
        display: "flex"
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
        color: '#1a90ff',
        animationDuration: '550ms',
        position: 'absolute',
        left: 0,
    },
    circle: {
        strokeLinecap: 'round',
    },
}));
