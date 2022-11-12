import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { Button } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField } from '@material-ui/core';


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

const OneCard = ({ setOpen, curHis }) => {
    const classes = useStyles();
    const stats = ['PTS', 'REB', 'AST', 'STL', 'BLK', 'FGM', 'FGA', 'FG%', '3PM', '3PA', '3P%', 'FTM', 'FTA', 'FT%', 'TO', 'PF']

    return (

        <>
            <div>
                <h1 style={{ padding: '10px' }}>NTUIM v.s. {curHis.opponent}</h1>
                <Button
                    style={{ textTransform: "full-size-kana", position: 'absolute', right: '10px', top: '10px', }}
                    variant="outlined"
                    color="secondary"
                    onClick={() => setOpen(false)}
                >
                    Back
                </Button>
            </div>
            <h2 style={{ padding: '10px' }}>
                {curHis.us}&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{curHis.enemy}
            </h2>
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
}

export default OneCard