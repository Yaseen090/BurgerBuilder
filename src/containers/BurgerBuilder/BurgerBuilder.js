import { Component } from "react";
import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Auxillary'
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler'
import { connect } from "react-redux";

import * as burgerBuilderActions from '../../store/actions/index'



class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,


    }


    componentDidMount() {
        console.log(this.props)
        this.props.onSetIngredients()
        // axios.get('/ingredients.json').then(
        //     response => { this.setState({ ingredients: response.data }) }
        // ).catch(err => { this.setState({ error: err }) })
    }
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = { ...this.state.ingredients };
    //     updatedIngredients[type] = updatedCount;

    //     const oldPrice = this.state.price;
    //     const updatedPrice = oldPrice + PRICES[type]
    //     this.setState({ price: updatedPrice, ingredients: updatedIngredients });

    //     this.updatePurchaseState(updatedIngredients)
    // }

    // removeIngredient = (type) => {
    //     if (!this.state.ingredients[type] <= 0) {
    //         const oldCount = this.state.ingredients[type];
    //         const updatedCount = oldCount - 1;
    //         const updatedIngredients = { ...this.state.ingredients };
    //         updatedIngredients[type] = updatedCount;
    //         const oldPrice = this.state.price;
    //         const updatedPrice = oldPrice - PRICES[type]
    //         this.setState({ price: updatedPrice, ingredients: updatedIngredients });
    //         this.updatePurchaseState(updatedIngredients)

    //     }
    // }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey]
        }).reduce((sum, el) => { return sum + el }, 0)

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
    closeHandler = () => {
        this.setState({ purchasing: false })
    }
    continuePurchase = () => {
        // // alert('You continue!');
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Max Schwarzmüller',
        //         address: {
        //             street: 'Teststreet 1',
        //             zipCode: '41351',
        //             country: 'Germany'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order).catch(error => {
        //     console.log('Failure BurgerBuilder', error)

        //     this.setState({ loading: false, purchasing: false });

        // })
        //     .then(response => {
        //         this.setState({ loading: false, purchasing: false });
        //         console.log('Success BurgerBuilder', response)
        //     })

        this.props.onInitPurchase();
        this.props.history.push('/checkout');

    }


    render() {

        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }



        let spinner = null;

        let burger = this.props.error ? <p>Ingredients Didn't Load</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        add={this.props.onIngredientAdded}
                        remove={this.props.onIngredientRemoved}
                        price={this.props.price}
                        disabled={disableInfo}
                        purchaseState={this.updatePurchaseState(this.props.ings)}
                        purchasing={this.purchaseHandler}
                    />

                </Aux>
            )
            spinner = (
                <OrderSummary ingredients={this.props.ings} price={this.props.price}
                    cancelPurchase={this.closeHandler}
                    continuePurchase={this.continuePurchase}
                />
            )
        }

        if (this.state.loading) {
            spinner = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} clicked={this.closeHandler} >
                    {spinner}
                </Modal>
                {burger}
            </Aux>
        )
    }

}
const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.price,
        error: state.burger.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onSetIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.onPurchaseInit())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));