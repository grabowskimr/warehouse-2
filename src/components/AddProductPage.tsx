import React, {FormEvent} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '../containers/Paper';

import ProductForm from "./ProductForm";

class AddProductPage extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            product: {
                name: '',
                price: '',
                quantity: 0,
                picture: null
            }
        }
    }

    submitForm = (e: FormEvent<Element>) => {

    };

    onInputChange = (e: FormEvent<Element>) => {

    };

    onFileChange = () => {

    };


    render() {
        return (
            <div>
                <Paper>
                    <Typography variant="h5">Add Product</Typography>
                    <ProductForm onSubmit={this.submitForm} onInputChange={this.onInputChange} onFileChange={this.onFileChange} product={this.state.product}/>
                </Paper>
            </div>
        )
    }
}

export default AddProductPage;