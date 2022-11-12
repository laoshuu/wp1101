import React, { useState, useEffect } from "react";
import {
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import CreateIcon from '@mui/icons-material/Create';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AlignedText from "./AlignedText";
import BoxScore from "./BoxScore";
import axios from '../axios'
import AllCards from './AllCards'
import OneCard from './OneCard'

const useStyles = makeStyles(() => ({
  deleteButton: {},
}));

export default function Home() {
  const classes = useStyles();
  const [team, setTeam] = useState("");
  const [players, setPlayers] = useState();
  const [disabled, setDisabled] = useState(true);
  const [create, setCreate] = useState(false);
  const [history, setHistory] = useState([])

  //Create Game

  const [popUp, setPopUp] = useState(false);

  const handleClickCreate = () => {
    setPopUp(true);
  };
  const handleClosePopUp = () => {
    setPopUp(false);
  };
  const handleSubmitCreate = () => {
    setPopUp(false);
    setCreate(true);
  };


  const handleGet = async () => {
    const {
      data: { message },
    } = await axios.get('/api/get-game')
    setHistory(message)
  }

  useEffect(() => {
    if (isNaN(players) === true || players === "" || Number(players) <= 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    handleGet()

  }, [players, history]);


  const [open, setOpen] = useState(false)
  const [curHis, setCurHis] = useState([]);
  const [popUpDeleteAll, setPopUpDeleteAll] = useState(false)

  const handleClick = (e) => {
    setOpen(true)
    setCurHis(e)
  }

  const deleteAll = async () => {
    setPopUpDeleteAll(false);
    const {
      data: { message },
    } = await axios.delete('/api/delete-allGame')

  }

  return (
    <>
      {create === false && open === false && (
        <div >
          <div className="home">
            <h1 style={{ margin: '1%' }}>Welcome to NTUIM's Stats Page!</h1>
          </div>
          <Button
            style={{ textTransform: "none", position: 'absolute', right: '10px', top: '5px', }}
            size="large"
            variant="contained"
            onClick={handleClickCreate}
            color="primary"
            endIcon={<CreateIcon />}
          >
            Create New Game
          </Button>
          <Button
            style={{ textTransform: "none", position: 'absolute', left: '10px', top: '5px', }}
            size="large"
            variant="contained"
            onClick={() => setPopUpDeleteAll(true)}
            color="secondary"
            startIcon={<DeleteSweepIcon />}
          >
            Delete All Game
          </Button>
          <div>
            <AllCards history={history} handleClick={handleClick} />
          </div>
        </div>
      )}
      {
        create === true && open === false && (
          <div>
            <BoxScore playerNum={players} team={team} setCreate={setCreate} />
          </div>
        )
      }
      {/* Create dialog */}
      <Dialog open={popUp} keepMounted onClose={handleClosePopUp}>
        <DialogTitle>
          <Typography variant="h4">Add Boxscore</Typography>
        </DialogTitle>
        <DialogContent>
          <AlignedText text="Opponent's Name" childrenType="field">
            <TextField
              id="title"
              value={team}
              onChange={(e) => {
                setTeam(e.target.value);
              }}
            />
          </AlignedText>
          <AlignedText text="Number of Players" childrenType="field">
            <TextField
              id="players"
              value={players}
              onChange={(e) => {
                setPlayers(e.target.value);
              }}
            />
          </AlignedText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ textTransform: "none" }}
            variant="contained"
            onClick={handleClosePopUp}
          >
            Cancel
          </Button>
          <Button
            disabled={disabled}
            style={{ textTransform: "none" }}
            variant="contained"
            onClick={() => handleSubmitCreate()}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete All Game */}
      <Dialog open={popUpDeleteAll} keepMounted >
        <DialogTitle>
          <Typography variant="h4">Delete BoxScore</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Once you clicked, all games in the history will be deleted.
            Are you sure to do that?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ textTransform: "none" }}
            variant="contained"
            onClick={() => setPopUpDeleteAll(false)}
          >
            Cancel
          </Button>
          <Button
            style={{ textTransform: "none" }}
            className={classes.deleteButton}
            variant="contained"
            color="secondary"
            // endIcon={<DeleteIcon />}
            onClick={() => deleteAll()}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {
        create === false && open === true && (
          <div>
            <OneCard setOpen={setOpen} curHis={curHis} />
          </div>
        )
      }
    </>
  );
}
