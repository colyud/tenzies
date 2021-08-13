import React, { useEffect } from "react";
import "./App.css";
import Dice from "./component/Dice";
import Won from "./component/Won";

function App() {
    const [dice, setDice] = React.useState([]);
    const [isWon, setIsWon] = React.useState(false);

    function newDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            const newNumber = Math.ceil(Math.random() * 6);
            newDice.push({
                number: newNumber,
                isHeld: false,
            });
        }
        return newDice;
    }
    useEffect(() => {
        setDice(newDice());
    }, []);

    const mappedDice = dice.map((ele, index) => <Dice key={index} number={ele.number} isHeld={ele.isHeld} hold={() => holdDice(index)} />);

    function holdDice(index) {
        setDice((oldDice) => {
            const newDice = [...oldDice];
            newDice[index] = {
                ...oldDice[index],
                isHeld: !oldDice[index].isHeld,
            };
            const isAllEqual = newDice.every((ele) => ele.number === newDice[0].number);
            const isAllCheck = !newDice.some((e) => e.isHeld === false);
            if (isAllCheck && isAllEqual) {
                setIsWon(true);
            }
            return newDice;
        });
    }

    function handleRoll() {
        setDice(
            [...dice].map((obj) => {
                if (!obj.isHeld) {
                    return {
                        ...obj,
                        number: Math.ceil(Math.random() * 6),
                    };
                } else {
                    return { ...obj };
                }
            })
        );
        if (isWon) {
            setDice(newDice());
            setIsWon(false);
        }
    }

    return (
        <>
            <div className="container">
                {isWon && <Won />}
                <h1 className="title">Tenzies</h1>
                <p className="sub-title">Roll until all dice are the same. Click each dice to freeze it as its current value between rolls.</p>
                <div className="diceContainer">{mappedDice}</div>
                <button className="roll" onClick={handleRoll}>
                    {isWon ? "Play Again" : "Roll"}
                </button>
                <p className="credit">@locpham</p>
            </div>
        </>
    );
}

export default App;
