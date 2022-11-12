import {
    Typography,
    makeStyles,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout';

const useStyles = makeStyles(() => ({
    deleteButton: {},
}));

const PopDialog = ({ handleClosePopUpSave, handleClosePopUpDelete, handleSubmitSave, handleSubmitDelete, popUpSave, popUpDelete }) => {
    const classes = useStyles();
    return (
        <>
            {/* Save dialog */}
            <Dialog open={popUpSave} keepMounted onClose={handleClosePopUpSave}>
                <DialogTitle>
                    <Typography variant="h4">Save BoxScore</Typography>
                </DialogTitle>
                <DialogContent>
                    {/* <Typography variant="body1" color="secondary">
                        {team}
                    </Typography> */}
                </DialogContent>
                <DialogContent>
                    <Typography variant="body2">
                        Once you clicked Save, there is no going back and this game will be saved.
                        Are you sure to do that?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ textTransform: "none" }}
                        variant="contained"
                        onClick={() => handleClosePopUpSave()}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{ textTransform: "none" }}
                        className={classes.saveButton}
                        variant="contained"
                        color="primary"
                        onClick={() => handleSubmitSave()}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Delete dialog */}
            <Dialog open={popUpDelete} keepMounted onClose={handleClosePopUpDelete}>
                <DialogTitle>
                    <Typography variant="h4">Leave BoxScore</Typography>
                </DialogTitle>
                <DialogContent>
                    {/* <Typography variant="body1" color="secondary">
                        {team}
                    </Typography> */}
                </DialogContent>
                <DialogContent>
                    <Typography variant="body2">
                        Once you leave, the boxscore will not save for anything you have recorded.
                        Are you sure to do that?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        style={{ textTransform: "none" }}
                        variant="contained"
                        onClick={handleClosePopUpDelete}
                    >
                        Cancel
                    </Button>
                    <Button
                        style={{ textTransform: "none" }}
                        className={classes.deleteButton}
                        variant="contained"
                        color="secondary"
                        onClick={() => handleSubmitDelete()}
                        startIcon={<LogoutIcon />}
                    >
                        Leave
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )

}

export default PopDialog