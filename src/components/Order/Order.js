import classes from './Orders.css'
const order = (props) => {
    const orders = []
    for (let i in props.orderIngredients) {
        orders.push({
            ingredientName: i,
            ingredientAmount: props.orderIngredients[i]
        })
    }

    const ordersArray = orders.map(order => {
        return <span>{order.ingredientName}:({order.ingredientAmount})</span>
    })
    return <div className={classes.Order}>
        <p>Ingredients:{ordersArray} </p>
        <p>Price: <strong>USD: {props.orderPrice}</strong></p>
    </div>
}
export default order;