import React, { ChangeEvent, FormEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '../containers/Paper';

import ProductForm from "./ProductForm";

class AddProductPage extends React.Component {
    state = {
        product: {
            name: '',
            index: '',
            supplier: '',
            quantity: 0,
            quantityType: '',
            price: '',
            picture: null
        }
    };

    submitForm = (e: FormEvent<HTMLFormElement>) => {

    };

    onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let name: string = e.target.name;
        console.log(e.target.value);
        this.setState({
            product: {
                ...this.state.product,
                [name]: e.target.value
            }
        });
    };

    onFileChange = () => {

    };


    render() {
        return (
            <div>
                <Paper>
                    <Typography variant="h5">Add Product</Typography>
                    <ProductForm onSubmit={this.submitForm} onInputChange={this.onInputChange}
                                 onFileChange={this.onFileChange} product={this.state.product}/>
                </Paper>
            </div>
        )
    }
}

export default AddProductPage;