import './Burger.css'
import Ingredients from './Ingredients/Ingredients';
import classes from './Burger.css'
const burger = (props) => {
  let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                return <Ingredients key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);


  if(transformedIngredients.length ===0){
    transformedIngredients = <p>Please Start Adding Ingredients</p>
  }
  return (
    <div className={classes.Burger}>
      <Ingredients type='BreadTop' />
      {transformedIngredients}
      <Ingredients type='BreadBottom' />
    </div>
    
    
  );
}
export default burger;