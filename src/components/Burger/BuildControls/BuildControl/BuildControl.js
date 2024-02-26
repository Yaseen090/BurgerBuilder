import classes from './BuildControl.css'

const buildControl = (props)=> {
    return (
        <div className={classes.BuildControl}>
            <p className={classes.Label}>{props.Label}</p>
            <button 
            className={classes.Less} 
            onClick={props.remove}
            disabled = {props.disabled}
            >Less</button>
            <button className={classes.More} onClick={props.add}>More</button>
        </div>
    )
}
export default buildControl;