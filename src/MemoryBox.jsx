export default function MemoryBox(props) {
    return (
        <div onClick={props.handleClick} className={props.box.isCompleted ? "memory--box selected completed" : props.box.isSelected ? "memory--box selected" : "memory--box"}>
            <div className="back-face">
                <img src={props.box.card} alt="" />
            </div>
            <div className="front-face"></div>
        </div>
    )
}