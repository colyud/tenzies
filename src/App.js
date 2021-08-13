import React, { useEffect } from "react";
import "./App.css";
import Dice from "./component/Dice";
import Won from "./component/Won";

function App() {
    const [dice, setDice] = React.useState([]);
    const [isWon, setWon] = React.useState(false);

    useEffect(() => {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            const newNumber = Math.ceil(Math.random() * 6);
            newDice.push({
                number: newNumber,
                isHeld: false,
            });
        }
        // console.log(newDice);
        setDice(newDice);
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
                setWon(true);
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
    }

    return (
        <>
            {isWon && <Won />}
            <div className="container">
                <h1 className="title">Tenzies</h1>
                <p className="sub-title">Roll until all dice are the same. Click each dice to freeze it as its current value between rolls.</p>
                <div className="diceContainer">{mappedDice}</div>
                <button className="roll" onClick={handleRoll}>
                    Roll
                </button>
            </div>
        </>
    );
}

export default App;
