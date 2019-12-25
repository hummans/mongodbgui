import { amber, green } from '@material-ui/core/colors';
const SnackBar = theme => ({
    success: {
        backgroundColor: green[600],
    },
    warning: {
        backgroundColor: amber[700],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    mt5:{
        marginTop: '1.5rem'
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
});
export default SnackBar;
