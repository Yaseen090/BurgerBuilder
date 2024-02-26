import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from './CheckoutSummary.css'
const checkout = (props) => {
    return <div className={classes.CheckoutSummary}>
        <h1>We hope this tastes well</h1>
        <Burger ingredients={props.ingredients} />
        <Button
            btnType='Danger'
            clicked={props.onCancel}>
            Cancel</Button>
        <Button
            btnType='Success'
            clicked={props.onContinue}>
            Continue</Button>
    </div>
}
export default checkout;