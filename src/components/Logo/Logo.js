import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.css'
const logo = () => {
    return <div className={classes.Logo}>
      <img src={burgerLogo} alt='BurgerLogo'/> 

    </div>
}
export default logo;