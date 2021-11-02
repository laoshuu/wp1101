/****************************************************************************
  FileName      [ Modal.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Modal component. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from "react";
import './css/Modal.css'

export default function Modal({ restartGame, backToHome, win }) {
    const [render, setRender] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setRender(true);
        }, 1000);
    }, []);

    if (win === true) {
        return (
            <div className="modal">
                <div className="modalWrapper" />
                <div className="modalContent">
                    <div className="modalResult">WIN</div>
                    <div className="modalBtnWrapper">
                        <div className="modalBtn" onClick={restartGame}>
                            New Game
                        </div>
                        <div className="modalBtn" onClick={backToHome}>
                            Back To Home
                        </div>
                    </div>
                </div>
                <div className="modalWrapper" />
            </div>
        )
    }
    else {
        return (
            <div className="modal">
                <div className="modalWrapper" />
                <div className="modalContent">
                    <div className="modalResult">Game Over</div>
                    <div className="modalBtnWrapper">
                        <div className="modalBtn" onClick={restartGame}>
                            Try Again
                        </div>
                        <div className="modalBtn" onClick={backToHome}>
                            Back To Home
                        </div>
                    </div>
                </div>
                <div className="modalWrapper" />
            </div>
        )
    }

    /* Useful Hint: style = {{opacity: 1 or 0 }} */


}