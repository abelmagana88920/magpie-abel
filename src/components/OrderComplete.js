import React from "react";
import PESO from "../helpers/toPesoFormat";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import green from "@material-ui/core/colors/green";

const OrderComplete = ({ data, handleConfirm }) => {
  const result = { ...data.data };
  const amount = PESO((result.attributes.amount / 100).toFixed(2));

  const { email, name, phone } = result.attributes.billing;
  const {
    line1,
    city,
    postal_code,
    state,
    country
  } = result.attributes.billing.address;

  const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    paperTitle: {
      padding: 4
    },
    paperTitleIcon: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    purchaseDetails: {
      marginBottom: theme.spacing(2)
    },
    billingDetails: {
      marginBottom: theme.spacing(4)
    }
  }));

  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container justify="center" spacing={1}>
          <DoneAllOutlinedIcon
            className={classes.paperTitleIcon}
            style={{ color: green[500] }}
          />
        </Grid>

        <Typography
          variant="h5"
          className={classes.paperTitle}
          component="h5"
          align="center"
          gutterBottom
        >
          Payment Successful!
        </Typography>

        <TableContainer className={classes.purchaseDetails}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>Purchase Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>{amount}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Magpie Reference No.</TableCell>
                <TableCell>{result.id}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer className={classes.billingDetails}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>Billing Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{email}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Phone</TableCell>
                <TableCell>{phone}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>
                  {line1}, {city}, {postal_code}, {state}, {country}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          color="primary"
          className={classes.pay}
          size="large"
          fullWidth
          onClick={handleConfirm}
        >
          Confirm
        </Button>
      </Paper>
    </>
  );
};

export default OrderComplete;
