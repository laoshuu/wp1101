import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { Dialog, makeStyles } from "@material-ui/core";
import axios from '../axios'
import Btn from './Btn'
import PopDialog from "./Dialog";

const useStyles = makeStyles(() => ({
  plusButton: {
    minWidth: "15px !important",
    height: "25px !important",
    color: "white !important",
    backgroundColor: "turquoise !important",
    borderRadius: "50% !important",
  },
  minusButton: {
    minWidth: "25px !important",
    height: "25px !important",
    color: "white !important",
    backgroundColor: "deepskyblue !important",
    borderRadius: "50% !important",
  },
  stats: {
    fontSize: "20px",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "cornflowerblue",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BoxScore = ({ playerNum, team, setCreate }) => {
  const classes = useStyles();
  const [playerList, setPlayerList] = useState(
    Array.from({ length: Number(playerNum) }, () => {
      return {
        name: "",
        points: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        twoMade: 0,
        twoMiss: 0,
        FG: Number(0).toFixed(3),
        threeMade: 0,
        threeMiss: 0,
        threePP: Number(0).toFixed(3),
        FTMade: 0,
        FTMiss: 0,
        FTP: Number(0).toFixed(3),
        offenseRebounds: 0,
        defenseRebounds: 0,
        turnovers: 0,
        fouls: 0,
        FGM: 0,
        FGA: 0,
        threePA: 0,
        FTA: 0,
      };
    })
  );
  // useEffect to control the stats changed in boxScore
  useEffect(() => {
    //
  }, [playerList]);
  const stats = ['PTS', 'REB', 'AST', 'STL', 'BLK', '2Pmade', '2Pmiss', 'FG%', '3Pmade', '3Pmiss', '3P%', 'FTMade', 'FTMiss', 'FT%', 'TO', 'PF']
  const updateFG = (player) => {
    player.FGA = player.twoMade + player.twoMiss + player.threeMade + player.threeMiss;
    player.FGM = player.twoMade + player.threeMade;
    player.threePA = player.threeMade + player.threeMiss;
    player.FTA = player.FTMade + player.FTMiss;
    if (player.FGA === 0)
      player.FG = Number(0).toFixed(3);
    else
      player.FG = Number(player.FGM / player.FGA).toFixed(3);
    if (player.threePA === 0)
      player.threePP = Number(0).toFixed(3);
    else
      player.threePP = Number(player.threeMade / player.threePA).toFixed(3);
    if (player.FTA === 0)
      player.FTP = Number(0).toFixed(3);
    else
      player.FTP = Number(player.FTMade / player.FTA).toFixed(3);

  }

  const [popUpSave, setPopUpSave] = useState(false);
  const [popUpDelete, setPopUpDelete] = useState(false);

  const handleClosePopUpSave = () => {
    setPopUpSave(false);
  }

  const handleSubmitSave = async () => {
    const {
      data: { message },
    } = await axios.post('/api/save-game', {
      playerList,
      team,
      us,
      enemy
    })

    setPopUpSave(false);
    setCreate(false);
  }

  const handleClosePopUpDelete = () => {
    setPopUpDelete(false);
  };

  const handleSubmitDelete = () => {
    setPopUpDelete(false);
    setCreate(false);
  };

  const [us, setUs] = useState(0)
  const [enemy, setEnemy] = useState(0)

  return (
    <>
      <Btn team={team} setPopUpSave={setPopUpSave} setPopUpDelete={setPopUpDelete} us={us} setUs={setUs} enemy={enemy} setEnemy={setEnemy} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Players</StyledTableCell>
              {stats.map((e) => (<StyledTableCell align='right'>{e}</StyledTableCell>))}
            </TableRow>
          </TableHead>
          <TableBody>
            {playerList.map((player, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="player">
                  <TextField
                    id="playerNumber"
                    value={player.name}
                    style={{ width: "150px" }}
                    onChange={(e) => {
                      let newList = [...playerList]; // copying the old datas array
                      newList[index].name = e.target.value; // replace e.target.value with whatever you want to change it to
                      setPlayerList(newList);
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="auto">
                  <div>
                    <div className={classes.stats}>{player.points}</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.rebounds}</div>
                    <Button
                      className={classes.plusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].rebounds += 1; // replace e.target.value with whatever you want to change it to
                        setPlayerList(newList);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      className={classes.minusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].rebounds -= 1; // replace e.target.value with whatever you want to change it to
                        setPlayerList(newList);
                      }}
                      disabled={playerList[index].rebounds === 0}
                    >
                      -
                    </Button>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.assists}</div>
                    <Button
                      className={classes.plusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].assists += 1; // replace e.target.value with whatever you want to change it to
                        setPlayerList(newList);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      className={classes.minusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].assists -= 1; // replace e.target.value with whatever you want to change it to
                        setPlayerList(newList);
                      }}
                      disabled={playerList[index].assists === 0}
                    >
                      -
                    </Button>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.steals}</div>
                    <Button
                      className={classes.plusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].steals += 1; // replace e.target.value with whatever you want to change it to
                        setPlayerList(newList);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      className={classes.minusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].steals -= 1; // replace e.target.value with whatever you want to change it to
                        setPlayerList(newList);
                      }}
                      disabled={playerList[index].assists === 0}
                    >
                      -
                    </Button>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.blocks}</div>
                    <Button
                      className={classes.plusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].blocks += 1; // replace e.target.value with whatever you want to change it to
                        setPlayerList(newList);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      className={classes.minusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].blocks -= 1; // replace e.target.value with whatever you want to change it to
                        setPlayerList(newList);
                      }}
                      disabled={playerList[index].blocks === 0}
                    >
                      -
                    </Button>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.twoMade}</div>
                    <Button
                      className={classes.plusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].twoMade += 1; // replace e.target.value with whatever you want to change it to
                        newList[index].points += 2;
                        updateFG(newList[index]);
                        setPlayerList(newList);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      className={classes.minusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].twoMade -= 1; // replace e.target.value with whatever you want to change it to
                        newList[index].points -= 2;
                        updateFG(newList[index]);
                        setPlayerList(newList);
                      }}
                      disabled={playerList[index].twoMade === 0}
                    >
                      -
                    </Button>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.twoMiss}</div>
                    <Button
                      className={classes.plusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].twoMiss += 1; // replace e.target.value with whatever you want to change it to  
                        updateFG(newList[index]);
                        setPlayerList(newList);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      className={classes.minusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].twoMiss -= 1; // replace e.target.value with whatever you want to change it to
                        updateFG(newList[index]);
                        setPlayerList(newList);
                      }}
                      disabled={playerList[index].twoMiss === 0}
                    >
                      -
                    </Button>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.FG}</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.threeMade}</div>
                    <Button
                      className={classes.plusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].threeMade += 1; // replace e.target.value with whatever you want to change it to
                        newList[index].points += 3;
                        updateFG(newList[index]);
                        setPlayerList(newList);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      className={classes.minusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].threeMade -= 1; // replace e.target.value with whatever you want to change it to
                        newList[index].points -= 3;
                        updateFG(newList[index]);
                        setPlayerList(newList);
                      }}
                      disabled={playerList[index].threeMade === 0}
                    >
                      -
                    </Button>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.threeMiss}</div>
                    <Button
                      className={classes.plusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].threeMiss += 1; // replace e.target.value with whatever you want to change it to
                        updateFG(newList[index]);
                        setPlayerList(newList);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      className={classes.minusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].threeMiss -= 1; // replace e.target.value with whatever you want to change it to
                        updateFG(newList[index]);
                        setPlayerList(newList);
                      }}
                      disabled={playerList[index].threeMiss === 0}
                    >
                      -
                    </Button>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.threePP}</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.FTMade}</div>
                    <Button
                      className={classes.plusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].FTMade += 1; // replace e.target.value with whatever you want to change it to
                        newList[index].points += 1;
                        updateFG(newList[index]);
                        setPlayerList(newList);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      className={classes.minusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].FTMade -= 1; // replace e.target.value with whatever you want to change it to    
                        newList[index].points -= 1;
                        updateFG(newList[index]);
                        setPlayerList(newList);
                      }}
                      disabled={playerList[index].FTMade === 0}
                    >
                      -
                    </Button>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.FTMiss}</div>
                    <Button
                      className={classes.plusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].FTMiss += 1; // replace e.target.value with whatever you want to change it to
                        updateFG(newList[index]);
                        setPlayerList(newList);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      className={classes.minusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].FTMiss -= 1; // replace e.target.value with whatever you want to change it to
                        updateFG(newList[index]);
                        setPlayerList(newList);
                      }}
                      disabled={playerList[index].FTMiss === 0}
                    >
                      -
                    </Button>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.FTP}</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.turnovers}</div>
                    <Button
                      className={classes.plusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].turnovers += 1; // replace e.target.value with whatever you want to change it to
                        setPlayerList(newList);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      className={classes.minusButton}
                      onClick={(e) => {
                        if (Number(playerList[index].turnovers) <= 0) {
                          let newList = [...playerList]; // copying the old datas array
                          newList[index].turnovers = 0; // replace e.target.value with whatever you want to change it to
                          setPlayerList(newList);
                        } else {
                          let newList = [...playerList]; // copying the old datas array
                          newList[index].turnovers -= 1; // replace e.target.value with whatever you want to change it to
                          setPlayerList(newList);
                        }
                      }}
                    >
                      -
                    </Button>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <div className={classes.stats}>{player.fouls}</div>
                    <Button
                      className={classes.plusButton}
                      onClick={(e) => {
                        let newList = [...playerList]; // copying the old datas array
                        newList[index].fouls += 1; // replace e.target.value with whatever you want to change it to
                        setPlayerList(newList);
                      }}
                    >
                      +
                    </Button>
                    <Button
                      className={classes.minusButton}
                      onClick={(e) => {
                        if (Number(playerList[index].fouls) <= 0) {
                          let newList = [...playerList]; // copying the old datas array
                          newList[index].fouls = 0; // replace e.target.value with whatever you want to change it to
                          setPlayerList(newList);
                        } else {
                          let newList = [...playerList]; // copying the old datas array
                          newList[index].fouls -= 1; // replace e.target.value with whatever you want to change it to
                          setPlayerList(newList);
                        }
                      }}
                    >
                      -
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PopDialog handleClosePopUpSave={handleClosePopUpSave} handleClosePopUpDelete={handleClosePopUpDelete}
        handleSubmitSave={handleSubmitSave} handleSubmitDelete={handleSubmitDelete} popUpSave={popUpSave} popUpDelete={popUpDelete} />
    </>
  );
}

export default BoxScore