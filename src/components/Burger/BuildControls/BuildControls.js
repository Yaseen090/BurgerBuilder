import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css'

const controls = [
    'Salad', 'Cheese', 'Bacon', 'Meat'
]



const buildControls = (props) => {
    let transformedControls = controls.map(igkey => {
        return <BuildControl
            Label={igkey}
            key={igkey}
            add={() => props.add(igkey)}
            remove={() => props.remove(igkey)}
            disabled={props.disabled[igkey]}

        />
    })
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {transformedControls}
            <button
                className={classes.OrderButton}
                disabled={!props.purchaseState}
                onClick={props.purchasing}
            >Order Now!!</button>

        </div>
    )
}
export default buildControls;