import React from "react";
import expYearList from "../helpers/expirationYearList";
import PESO from "../helpers/toPesoFormat";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import CreditCardIcon from "@material-ui/icons/CreditCard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";

const CheckoutForm = ({ cart, handlePayment }) => {
  const total = cart.reduce((acc, curr) => acc + curr.subTotal, 0);

  const useStyles = makeStyles(theme => ({
    title: {
      marginBottom: theme.spacing(3)
    },
    form: {
      "& .MuiInput-root": {
        marginBottom: theme.spacing(1)
      }
    },
    formTitle: {
      padding: 4
    },
    formTitleIcon: {
      marginRight: theme.spacing(1)
    },
    paper: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    table: {
      marginTop: theme.spacing(1)
    },
    grandTotal: {
      "& td": {
        backgroundColor: blue[50],
        borderBottom: "none"
      },
      "& .MuiTableCell-root": {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
      }
    },
    pay: {
      marginTop: theme.spacing(2),
      backgroundColor: green[600],
      "&:hover, &:focus, &:active": {
        backgroundColor: green[900]
      }
    }
  }));

  const classes = useStyles();

  return (
    <>
      {cart.length > 0 && (
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={handlePayment}
        >
          <Paper className={classes.paper}>
            <Grid
              container
              alignItems="center"
              spacing={1}
              className={classes.formTitle}
            >
              <CreditCardIcon
                className={classes.formTitleIcon}
                color="secondary"
              />
              <Typography variant="h6" component="h6">
                Credit Cart
              </Typography>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  id="cc-number"
                  name="cc-number"
                  fullWidth
                  label="Credit Card Number"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="exp-month-label">Exp. Month</InputLabel>
                  <Select
                    labelId="exp-month-label"
                    id="exp-month"
                    name="exp-month"
                    value="01"
                    fullWidth
                    // onChange={handleChange}
                  >
                    <MenuItem value="01">01</MenuItem>
                    <MenuItem value="02">02</MenuItem>
                    <MenuItem value="03">03</MenuItem>
                    <MenuItem value="04">04</MenuItem>
                    <MenuItem value="05">05</MenuItem>
                    <MenuItem value="06">06</MenuItem>
                    <MenuItem value="07">07</MenuItem>
                    <MenuItem value="08">08</MenuItem>
                    <MenuItem value="09">09</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="11">11</MenuItem>
                    <MenuItem value="12">12</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="exp-year-label">Exp. Year</InputLabel>
                  <Select
                    labelId="exp-year-label"
                    id="exp-year"
                    name="exp-year"
                    value="20"
                    fullWidth
                    // onChange={handleChange}
                  >
                    {expYearList().map(year => (
                      <MenuItem key={year.value} value={year.value}>
                        {year.text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField id="cvc" name="cvc" fullWidth label="CVC" />
              </Grid>
            </Grid>
          </Paper>

          <Paper className={classes.paper}>
            <Grid
              container
              alignItems="center"
              spacing={1}
              className={classes.formTitle}
            >
              <AccountBoxIcon
                className={classes.formTitleIcon}
                color="secondary"
              />
              <Typography variant="h6" component="h6">
                Billing Details
              </Typography>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField id="name" name="name" fullWidth label="Name" />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  fullWidth
                  label="Email"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="phone"
                  name="phone"
                  fullWidth
                  label="Phone No."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  name="address"
                  fullWidth
                  label="Address"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField id="city" name="city" fullWidth label="City" />
              </Grid>
              <Grid item xs={6}>
                <TextField id="state" name="state" fullWidth label="State" />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="country"
                  name="country"
                  fullWidth
                  label="Country"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="postal_code"
                  name="postal_code"
                  fullWidth
                  label="Postal Code"
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper className={classes.paper}>
            <Grid
              container
              alignItems="center"
              spacing={1}
              className={classes.formTitle}
            >
              <ShoppingBasketIcon
                className={classes.formTitleIcon}
                color="secondary"
              />
              <Typography variant="h6" component="h6">
                Order Review
              </Typography>
            </Grid>

            <TableContainer>
              <Table
                className={classes.table}
                aria-label="review order table"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map(item => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        {item.title}

                        <Typography
                          variant="body2"
                          component="p"
                          color="textSecondary"
                        >
                          {`Price: ${PESO(item.price)}`}
                          <br />
                          {`Quantity: ${item.quantity}`}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{PESO(item.subTotal)}</TableCell>
                    </TableRow>
                  ))}

                  <TableRow className={classes.grandTotal}>
                    <TableCell>
                      <strong>Grand Total</strong>:
                    </TableCell>
                    <TableCell align="right">
                      <strong>{PESO(total)}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.pay}
              size="large"
              fullWidth
              onClick={() => handlePayment()}
            >
              Pay
            </Button>
          </Paper>
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
