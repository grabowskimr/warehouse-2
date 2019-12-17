import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid  from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
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
                <TextField name="index" label="Index" value={props.product.index} onChange={props.onInputChange}/>
            </FormControl>
            <FormControl fullWidth className={classes.topSpace}>
                <TextField name="supplier" label="Supplier" value={props.product.supplier} onChange={props.onInputChange}/>
            </FormControl>
            <FormControl fullWidth className={classes.topSpace}>
                <TextField name="price" label="Price" value={props.product.price} onChange={props.onInputChange}/>
            </FormControl>
            <Grid container spacing={2} className={classes.topSpace}>
                <Grid item xs={10}>
                    <FormControl fullWidth>
                        <TextField name="quantity" label="Quantity" value={props.product.quantity} onChange={props.onInputChange}/>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="quantity-type">Type</InputLabel>
                        <Select
                            labelId="quantity-type"
                            value={props.product.quantityType}
                        >
                            <MenuItem value="kg">Kg</MenuItem>
                            <MenuItem value="liter">Liter</MenuItem>
                            <MenuItem value="pieces">Pieces</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
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