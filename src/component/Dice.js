export default function Dice({ number, isHeld, hold }) {
    const classN = isHeld ? "dice held" : "dice";
    return (
        <span onClick={hold} className={classN}>
            {number}
        </span>
    );
}
