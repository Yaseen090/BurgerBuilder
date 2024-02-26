import { Component } from "react";
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from "./ContactData/ContactData";
import Aux from '../../hoc/Auxillary'
import { Route, Redirect } from 'react-router-dom'

import { connect } from "react-redux";
class Checktout extends Component {


    // componentDidMount() {
    //     const queryParams = new URLSearchParams(this.props.location.search);
    //     const ingredients = {}
    //     for (let i of queryParams.entries()) {
    //         if (i[0] === 'price') {
    //             this.setState({ price: i[1] })
    //         }
    //         else {
    //             ingredients[i[0]] = +i[1]
    //         }

    //     }
    //     console.log(ingredients)
    //     this.setState({ ingredients: ingredients })

    // }
    onCancelHandler = () => {
        this.props.history.goBack();
    }
    onContinueHandler = () => {
        this.props.history.replace('/Checkout/Contact-Data')
    }

    render() {

        let checkout = <Redirect to="/" />
        if (this.props.ings) {
            const purchased = this.props.purchased ? <Redirect to='/' /> : null
            console.log(this.props.purchased)
            checkout = (<Aux>
                {purchased}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    onCancel={this.onCancelHandler}
                    onContinue={this.onContinueHandler} />
                <Route path={this.props.match.path + '/Contact-Data'} component={ContactData} />
            </Aux>)
        }
        return checkout
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        purchased: state.order.purchased
    }
}
export default connect(mapStateToProps)(Checktout);