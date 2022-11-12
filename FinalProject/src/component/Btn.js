import { Button, Input, TextField } from "@material-ui/core";
import { useState } from "react";




const Btn = ({ team, setPopUpSave, setPopUpDelete, us, enemy, setUs, setEnemy }) => {


    return (
        <>
            <div>
                <h1 style={{ padding: '10px' }}>NTUIM v.s. {team}</h1>
                <div style={{ padding: '5px' }} >
                    <h2 >
                        <TextField variant="standard" size="small" type="number" value={us} onChange={(e) => setUs(e.target.value)}
                            inputProps={{ min: 0, style: { textAlign: 'center' } }} /> :
                        <TextField variant="standard" size="small" type="number" value={enemy} onChange={(e) => setEnemy(e.target.value)}
                            inputProps={{ min: 0, style: { textAlign: 'center' } }} />
                    </h2>
                </div>
                <Button
                    style={{ textTransform: "full-size-kana", position: 'absolute', right: '10px', top: '10px', }}
                    color="primary"
                    variant="outlined"
                    onClick={() => (setPopUpSave(true))}
                >
                    Save
                </Button>
                <Button
                    style={{ textTransform: "full-size-kana", position: 'absolute', right: '100px', top: '10px', }}
                    variant="outlined"
                    color="secondary"
                    onClick={() => (setPopUpDelete(true))}
                >
                    Leave
                </Button>
            </div>
        </>
    )
}

export default Btn