import React, { useEffect } from "react";
import "./App.css";
import Dice from "./component/Dice";

function App() {
    const [dice, setDice] = React.useState([]);
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
        <div className="container">
            <h1 className="title">Tenzies</h1>
            <p className="sub-title">Roll until all dice are the same. Click each dice to freeze it as its current value between rolls.</p>
            <div className="diceContainer">{mappedDice}</div>
            <button className="roll" onClick={handleRoll}>
                Roll
            </button>
        </div>
    );
}

export default App;
