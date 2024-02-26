import Button from "../../UI/Button/Button"
const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients).map(igkey =>{
        return <li key={igkey}>{igkey}: {props.ingredients[igkey]}</li>
    })
    return(
    <div>
        <h3>Your Order</h3>
        <h5>This is Delicious burger containing following ingredients</h5>
        <ul>
        {ingredients}
        </ul>
        <p>Total Price: {props.price.toFixed(2)}</p>
        <Button btnType='Danger' clicked={props.cancelPurchase}>Cancel</Button>
        <Button btnType='Success' clicked={props.continuePurchase}>Continue</Button>

    </div>)
}
export default orderSummary;