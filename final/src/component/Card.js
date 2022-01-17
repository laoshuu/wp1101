import Paper from '@material-ui/core/Paper';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core";

import style from 'styled-components';
import { useState } from 'react';

const Wrapper = style.section`
  display: flex;
  flex-direction: row;
  padding: 50px;
`;

const Row = style.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;


const ContentPaper = style(Paper)`
width: 15%;
  height: 10%;
  padding: 2em;
  overflow: auto;
  margin-left: 5%;
  background-color: ghostwhite;
  `;

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

const useStyles = makeStyles(() => ({
    stats: {
        fontSize: "20px",
    },
}));

const Card = ({ history }) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [curHis, setCurHis] = useState([]);

    const stats = ['PTS', 'REB', 'AST', 'STL', 'BLK', 'FGM', 'FGA', 'FG%', '3PM', '3PA', '3P%', 'FTM', 'FTA', 'FT%', 'TO', 'PF']

    const handleClick = (e) => {
        setOpen(true)
        setCurHis(e)
    }

    return (
        <>{open ? (
            <>
                <button onClick={() => setOpen(false)}>X</button>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Players</StyledTableCell>
                                {stats.map((e) => (<StyledTableCell align='right'>{e}</StyledTableCell>))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {curHis.game.map((player) => (
                                <>
                                    <StyledTableRow>
                                        <StyledTableCell component="th" scope="player">
                                            <TextField
                                                id="playerNumber"
                                                value={player.name}
                                                style={{ width: "150px" }}
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
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <div>
                                                <div className={classes.stats}>{player.assists}</div>
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <div>
                                                <div className={classes.stats}>{player.steals}</div>
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <div>
                                                <div className={classes.stats}>{player.blocks}</div>
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <div>
                                                <div className={classes.stats}>{player.FGM}</div>
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <div>
                                                <div className={classes.stats}>{player.FGA}</div>
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
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <div>
                                                <div className={classes.stats}>{player.threePA}</div>
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
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <div>
                                                <div className={classes.stats}>{player.FTA}</div>
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
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <div>
                                                <div className={classes.stats}>{player.fouls}</div>
                                            </div>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                </>)
                            )}
                        </TableBody>
                    </Table>
                </TableContainer></>)
            :
            (<Wrapper>
                {history.map((e) => (
                    <ContentPaper onClick={() => { handleClick(e) }}>
                        <Row>台大資管 v.s. {e.opponent}</Row>
                        <Row>{e.date}</Row>
                    </ContentPaper>
                ))}
            </Wrapper>)
        }
        </>)
}

export default Card