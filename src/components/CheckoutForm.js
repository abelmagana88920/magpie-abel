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
import Alert from "@material-ui/lab/Alert";

import CreditCardIcon from "@material-ui/icons/CreditCard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import cyan from "@material-ui/core/colors/cyan";

const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: theme.spacing(3)
  },
  form: {
    "& .MuiInput-root": {
      marginBottom: theme.spacing(1)
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: theme.palette.type === "dark" ? cyan[300] : theme.palette.primary
    },
    "& .MuiInput-underline:after": {
      borderBottomColor:
        theme.palette.type === "dark" ? cyan[300] : theme.palette.primary
    }
  },
  formTitle: {
    padding: 4
  },
  formTitleIcon: {
    marginRight: theme.spacing(1),
    color:
      theme.palette.type === "dark" ? cyan[300] : theme.palette.secondary.main
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
      backgroundColor: theme.palette.type === "dark" ? blue[700] : blue[50],
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
  },
  error: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

const CheckoutForm = ({
  cart,
  cartTotal,
  handlePayment,
  handleFieldChange,
  billingInfo,
  errors
}) => {
  const classes = useStyles();

  return (
    <>
      {cart.length > 0 && (
        <form className={classes.form} onSubmit={handlePayment}>
          <Paper className={classes.paper}>
            {errors && (
              <Alert severity="error" className={classes.error}>
                {errors}
              </Alert>
            )}
            <Grid
              container
              alignItems="center"
              spacing={1}
              className={classes.formTitle}
            >
              <CreditCardIcon className={classes.formTitleIcon} />
              <Typography variant="h6" component="h6">
                Credit Card
              </Typography>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  id="number"
                  name="number"
                  fullWidth
                  label="Credit Card Number"
                  onChange={handleFieldChange}
                  value={billingInfo.number}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="exp-month-label">Exp. Month</InputLabel>
                  <Select
                    labelId="exp-month-label"
                    id="exp_month"
                    name="exp_month"
                    value={billingInfo.exp_month}
                    fullWidth
                    onChange={handleFieldChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel id="exp-year-label">Exp. Year</InputLabel>
                  <Select
                    labelId="exp-year-label"
                    id="exp_year"
                    name="exp_year"
                    value={billingInfo.exp_year}
                    fullWidth
                    onChange={handleFieldChange}
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
                <TextField
                  id="cvc"
                  name="cvc"
                  value={billingInfo.cvc}
                  fullWidth
                  label="CVC"
                  onChange={handleFieldChange}
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
              <AccountBoxIcon className={classes.formTitleIcon} />
              <Typography variant="h6" component="h6">
                Billing Details
              </Typography>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  value={billingInfo.name}
                  onChange={handleFieldChange}
                  fullWidth
                  label="Full Name"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  value={billingInfo.email}
                  fullWidth
                  label="Email"
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="phone"
                  value={billingInfo.phone}
                  name="phone"
                  fullWidth
                  label="Phone No."
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  name="line1"
                  value={billingInfo.line1}
                  fullWidth
                  label="Address"
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="city"
                  name="city"
                  value={billingInfo.city}
                  fullWidth
                  label="City"
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="state"
                  name="state"
                  value={billingInfo.state}
                  fullWidth
                  label="State"
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="country"
                  name="country"
                  value={billingInfo.country}
                  fullWidth
                  label="Country"
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="postal_code"
                  name="postal_code"
                  value={billingInfo.postal_code}
                  fullWidth
                  label="Postal Code"
                  onChange={handleFieldChange}
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
              <ShoppingBasketIcon className={classes.formTitleIcon} />
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
                      <strong>{PESO(cartTotal)}</strong>
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
              onClick={handlePayment}
            >
              Pay with magpie
            </Button>
          </Paper>
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
