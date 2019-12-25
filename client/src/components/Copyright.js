import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

export default function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'MIT © '}
            <Link color="inherit" href="https://github.com/gayanvoice/nosql-editor">
                NoSQL Editor
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}
