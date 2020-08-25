import React, { useState, useEffect } from "react";
import magpie from "./services/magpie";
import _ from "lodash";

import CssBaseline from "@material-ui/core/CssBaseline";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import ViewsHeader from "./components/ViewsHeader";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import FooterNavigation from "./components/FooterNavigation";
import useColorScheme from "./hooks/useColorScheme";
import grey from "@material-ui/core/colors/grey";




// const Magpie = require('magpie-js-sdk');
// const sandbox = true;
// const public_key = 'pk_test_sYorXrJmYCT4cAl4U6Y9Hg';
// const secret_key = 'sk_test_65ObRyp13oxOyLvw65I2sQ';


// const version = 'v1.1';
// const magpies = new Magpie(public_key, secret_key, sandbox, version);


// const card = {
//     name: 'Juan de la Cruz',
//     number: '5555555555554444',
//     exp_month: '02',
//     exp_year: '2022',
//     cvv: '123'
// }

// magpies.token.create(card.name, card.number, card.exp_month, card.exp_year, card.cvv)
//     .then(response => {
//       console.log('dsd', response)
//         // // We will actually just log response to console :)
//         // if (response.statusCode === 201) {
//         //     // Success
//         //     console.log(JSON.stringify(response, null, 2));
//         // } else {
//         //     // Error
//         //     console.log(response);
//         // }
//     });











const useStyles = bgColor => {
  const bg = bgColor ? { backgroundColor: bgColor } : {};

  return makeStyles(theme => ({
    root: {
      ...bg,
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh"
    },
    main: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2)
    },
    footer: {
      marginTop: "auto"
    }
  }));
};

const App = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const [index, setIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState();
  const [paymentTransitionDelay, setPaymentTransitiondDelay] = useState(false);
  const [orderCompleteData, setOrderCompleteData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [billingInfo, setBillingInfo] = useState({
    number: "4123450131000508",
    exp_month: 12,
    exp_year: 25,
    cvc: "111",
    line1: "blk 1 lot 1 address example",
    city: "Biñan",
    state: "Laguna",
    country: "PH",
    postal_code: "4024",
    name: "John",
    email: "johnmail@gmail.com",
    phone: "09988909890"
  });

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: colorScheme
        },
        typography: {
          fontFamily: [
            "Roboto",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
          ].join(",")
        }
      }),
    [colorScheme]
  );

  const classes = useStyles(colorScheme === "light" ? grey[300] : "")();

  useEffect(() => {
    let transition = false;

    if (paymentTransitionDelay) {
      transition = setTimeout(() => {
        transition = false;
        setPaymentTransitiondDelay(false);
      }, 5000);
    }

    return () => {
      if (transition) {
        clearTimeout(transition);
      }
    };
  }, [paymentTransitionDelay]);

  const handlePayment = event => {
    event.preventDefault();

    const {
      number,
      exp_month,
      exp_year,
      cvc,
      name,
    } = billingInfo;

    const magPieTokenData = {
      card: {
        number,
        exp_month: parseInt(exp_month),
        exp_year: parseInt(exp_year),
        cvc,
        name
      }
    };

    const amount = parseInt(
      cartTotal
        .toFixed(2)
        .toString()
        .replace(".", "")
    );

    const paymongoPaymentData = (tokenId, tokenType) => {
      return {
        data: {
          attributes: {
            amount,
            currency: "PHP",
            source: {
              id: tokenId,
              type: tokenType
            }
          }
        }
      };
    };

    setPaymentTransitiondDelay(true);
    setErrors(null);

    magpie
      .createToken(magPieTokenData)
      .then(result => {
        const tokenId = result.data.id;
        const tokenType = result.data.type;

        magpie
          .createPayment(paymongoPaymentData(tokenId, tokenType))
          .then(data => {
            setOrderCompleteData(data);
            setCart([]);
            setCartTotal(null);
          })
          .catch(error => {
            const code = error.code;
            const message = error.message;
            console.log(code, message);
          });
      })
      .catch(error => {
        const code = error.code;
        const message = error.message;
        console.log(code, message);
        setErrors(message);
      });
  };

  const handleFieldChange = event => {
    const { name, value } = event.target;

    setBillingInfo({ ...billingInfo, [name]: value });
  };

  const handleAddToCart = product => {
    const cartData = [...cart];
    const existingDataIndex = _.findIndex(cartData, { id: product.id });

    if (existingDataIndex >= 0) {
      // 1. if product is already in cart, perform merge
      const productQuantity = cartData[existingDataIndex].quantity + 1;
      const subTotal = cartData[existingDataIndex].price * productQuantity;

      cartData[existingDataIndex] = {
        ...product,
        quantity: productQuantity,
        subTotal: subTotal
      };
    } else {
      // 2. if product is not in the cart, perform add
      cartData.push({
        ...product,
        quantity: 1,
        subTotal: product.price
      });
    }

    const total = cartData.reduce((acc, curr) => acc + curr.subTotal, 0);
    setCartTotal(total);

    setCart(cartData);
    setOrderCompleteData(null);
  };

  const handleCartQuantity = (itemId, operation) => {
    const cartData = [...cart];
    const itemIndex = _.findIndex(cartData, { id: itemId });

    switch (operation) {
      case "increment":
        cartData[itemIndex].quantity++;
        break;
      case "decrement":
        if (cartData[itemIndex].quantity > 1) {
          cartData[itemIndex].quantity--;
        }
        break;
      default:
        break;
    }

    const price = cartData[itemIndex].price;
    const quantity = cartData[itemIndex].quantity;

    cartData[itemIndex].subTotal = price * quantity;

    const total = cartData.reduce((acc, curr) => acc + curr.subTotal, 0);
    setCartTotal(total);

    setCart(cartData);
  };

  const handRemoveFromCart = itemId => {
    let cartData = [...cart];
    cartData = _.filter(cartData, item => item.id !== itemId);

    const total = cartData.reduce((acc, curr) => acc + curr.subTotal, 0);
    setCartTotal(total);

    setCart(cartData);
  };

  const handleConfirm = () => {
    setIndex(0);
    setOrderCompleteData(null);
  };

  const views = [
    {
      title: "Products",
      component: <Products handleAddToCart={handleAddToCart} />
    },
    {
      title: "Cart",
      component: (
        <Cart
          cart={cart}
          cartTotal={cartTotal}
          handleCartQuantity={handleCartQuantity}
          handRemoveFromCart={handRemoveFromCart}
          setIndex={setIndex}
        />
      )
    },
    {
      title: "Checkout",
      component: (
        <Checkout
          cart={cart}
          cartTotal={cartTotal}
          handlePayment={handlePayment}
          handleFieldChange={handleFieldChange}
          billingInfo={billingInfo}
          orderCompleteData={orderCompleteData}
          handleConfirm={handleConfirm}
          paymentTransitionDelay={paymentTransitionDelay}
          errors={errors}
        />
      )
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />

        <Container component="main" className={classes.main} maxWidth="sm">
          {
            <ViewsHeader
              colorScheme={colorScheme}
              setColorScheme={setColorScheme}
            >
              {views[index].title}
            </ViewsHeader>
          }
          {views[index].component}
        </Container>

        <Container component="footer" className={classes.footer} maxWidth="sm">
          <FooterNavigation
            onChange={setIndex}
            index={index}
            cartCount={cart.length}
          />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
