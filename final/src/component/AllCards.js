import style from 'styled-components';
import Paper from '@material-ui/core/Paper';
import axios from '../axios';
import { useState } from 'react';
import {
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles(() => ({
  deleteButton: {},
}));

const Wrapper = style.section`
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  padding: 50px;
`;

const Row = style.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5%;
`;


const ContentPaper = style(Paper)`
width: 15%;
  height: 10%;
  padding: 2em;
  overflow: auto;
  margin-left: 9%;
  margin-bottom:2%;
  background-color: cornsilk;
  `;

const handleDelete = async (opponent) => {
  const {
    data: { message },
  } = await axios.post('/api/delete-game', {
    opponent,
  });
}

const AllCards = ({ history, handleClick }) => {
  const classes = useStyles();

  const [popUpDelete, setPopUpDelete] = useState(false);

  const [candidate, setCandidate] = useState('')

  const handleClosePopUpDelete = () => {
    setPopUpDelete(false);
  };

  const handleSubmitDelete = () => {
    setPopUpDelete(false);
    handleDelete(candidate);
    setCandidate('');
  };
  return (<Wrapper>
    {history.map((e) => (
      <>
        <ContentPaper onClick={() => { handleClick(e) }}>
          <Row>NTUIM v.s. {e.opponent}</Row>
          <Row>{e.us}&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;  :  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{e.enemy}</Row>
          <Row>{e.date}</Row>
        </ContentPaper>
        <Button startIcon={<HighlightOffIcon />} onClick={() => { setPopUpDelete(true); setCandidate(e.opponent) }}
          style={{ position: 'relative', right: '3%', height: '5%' }} size="small" />
      </>))}
    <Dialog open={popUpDelete} keepMounted onClose={handleClosePopUpDelete}>
      <DialogTitle>
        <Typography variant="h4">Delete Box Score</Typography>
      </DialogTitle>
      <DialogContent>
        {/* <Typography variant="body1" color="secondary">
                        {team}
                    </Typography> */}
      </DialogContent>
      <DialogContent>
        <Typography variant="body2">
          Once you delete an Box Score, there is no going back.
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
          endIcon={<DeleteIcon />}
          onClick={() => handleSubmitDelete()}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  </Wrapper>)
}

export default AllCards