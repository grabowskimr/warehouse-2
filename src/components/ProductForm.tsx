import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid  from '@material-ui/core/Grid';
import makeStyles from "@material-ui/core/styles/makeStyles";

import {TProduct} from '../types/types';
import FileInput from "./FileInput";

const useStyles = makeStyles(theme => ({
    topSpace: {
        marginTop: theme.spacing(2)
    }
}));

type TProductForm = {
    onSubmit: React.FormEventHandler<HTMLFormElement>,
    product: TProduct,
    onInputChange: React.FormEventHandler,
    onFileChange: (type: string) => void
}

const ProductForm = (props: TProductForm) => {
    const classes = useStyles();
    return (
        <form onSubmit={props.onSubmit}>
            <FormControl fullWidth className={classes.topSpace}>
                <TextField name="name" label="Name" value={props.product.name} onChange={props.onInputChange}/>
            </FormControl>
            <FormControl fullWidth className={classes.topSpace}>
                <TextField name="price" label="Price" value={props.product.price} onChange={props.onInputChange}/>
            </FormControl>
            <FormControl fullWidth className={classes.topSpace}>
                <TextField name="quantity" label="Quantity" value={props.product.quantity} onChange={props.onInputChange}/>
            </FormControl>
            <FormControl fullWidth className={classes.topSpace}>
                <FileInput label="Picture" name="picture" onChange={(test: string) => props.onFileChange(test)}/>
            </FormControl >
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                className={classes.topSpace}
            >
                <Button type="submit" color="primary" variant="contained">Submit</Button>
            </Grid>
        </form>
    )
};

export default ProductForm;