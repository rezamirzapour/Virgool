import { Typography, Link } from '@material-ui/core'
export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"کپی رایت © "}
            <Link color="inherit" href="https://material-ui.com/">
                ویرگول
            </Link>{" "}
            {new Date().getFullYear().toLocaleString("fa-ir")}
            {"."}
        </Typography>
    );
}