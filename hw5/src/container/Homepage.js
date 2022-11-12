import { useEffect, useState } from "react";

const Homepage = () => {

    const buttonValue = ["<=", "C", "MR", "MC", 7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "x", 0, ".", "=", "/"];
    const [operand1, setoperand1] = useState(0);
    const [operand2, setoperand2] = useState(0);
    const [operator, setOperator] = useState("");
    const [firstNum, setFirstNum] = useState(false);
    const [float, setFloat] = useState(false);
    const [degree, setDegree] = useState(0);
    const [prevDeg, setPrevDeg] = useState(0);
    const [memory, setMemory] = useState(0);
    const [memoryDeg, setMemoryDeg] = useState(0);
    const [answer, setAnswer] = useState(0);


    const handleClick = (clicked) => {
        if (operator !== "=" && firstNum === true) {
            setoperand2(operand1);
            setPrevDeg(Math.max(degree, prevDeg));
            setDegree(0);

        }

        if (typeof (clicked) === "number") {
            if (firstNum === true) {
                setoperand1(clicked);
                setFirstNum(false);
            }
            else if (float === true) {
                setoperand1(Math.pow(0.1, degree + 1) * clicked + operand1);
                setDegree(degree + 1);
            }
            else
                setoperand1(clicked + operand1 * 10)
        }
        else if (clicked === ".") {
            setFloat(true);
        }
        else if (clicked === "MR") {
            setMemory(Number(operand1.toFixed(Math.max(degree, prevDeg))));
            setMemoryDeg(Math.max(degree, prevDeg));
        }

        else if (clicked === "MC") {
            setDegree(memoryDeg);
            setoperand1(memory);
        }
        else if (clicked === "C") {
            setoperand1(0);
            setoperand2(0);
            setFirstNum(false);
            setFloat(false);
            setOperator("");
            setDegree(0);
            setPrevDeg(0);
        }
        else if (clicked === "<=") {
            if (degree + prevDeg === 0)
                setoperand1(Math.floor(operand1 / 10));
            else {
                if (prevDeg > degree) {
                    setoperand1(Math.floor(operand1 * Math.pow(10, prevDeg - 1)) / Math.pow(10, prevDeg - 1));
                    setPrevDeg(prevDeg - 1);
                }
                else {
                    setoperand1(Math.floor(operand1 * Math.pow(10, degree - 1)) / Math.pow(10, degree - 1));
                    setDegree(degree - 1);
                }

            }
            // console.log(degree, prevDeg);
        }
        else {
            if (operator === "+")
                setoperand1(operand1 + operand2);
            else if (operator === "-")
                setoperand1(operand2 - operand1)
            else if (operator === "x")
                setoperand1(operand1 * operand2)
            else if (operator === "/")
                setoperand1(operand2 / operand1)


            setOperator(clicked);
            setFirstNum(true);
            setFloat(false);

            // console.log(degree, prevDeg);
        }



    };

    useEffect(() => {
        console.log(degree, prevDeg)
        if (degree + prevDeg > 0)
            setAnswer(Number(operand1.toFixed(Math.max(degree, prevDeg))));
        else
            setAnswer(operand1);
    }, [operand1, degree, float, prevDeg])



    return (
        <table>
            <input type="text" id="answer" value={answer} />
            {buttonValue.map((clicked) => (<button onClick={() => handleClick(clicked)}>{clicked}</button>))}
        </table>
    );
}

export default Homepage;