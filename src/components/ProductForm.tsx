import React, { ChangeEvent, FormEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { TFileType, TProduct } from '../types/types';
import FileInput from './FileInput';

type TProductState = {
	product: TProduct;
	file: File | null;
};

type TProductForm = {
	onSubmit: (event: FormEvent<HTMLFormElement>, product: TProductState) => void;
	product: TProductState;
};

class ProductForm extends React.Component<TProductForm, TProductState> {
	constructor(props: TProductForm) {
		super(props);
		this.state = this.props.product;
	}

	onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		let name: string = e.target.name;
		this.setState({
			product: {
				...this.state.product,
				[name]: e.target.value
			}
		});
	};

	onSelectChange = (e: any): void => {
		let name = e.target.name;
		this.setState({
			product: {
				...this.state.product,
				[name]: e.target.value
			}
		});
	};

	onFileChange = (data: TFileType): void => {
		let name = data.inputName;
		this.setState({
			product: {
				...this.state.product,
				[name]: data.fileName
			},
			file: data.file
		});
	};

	render() {
		return (
			<form onSubmit={e => this.props.onSubmit(e, this.state)}>
				<FormControl fullWidth>
					<TextField name="name" label="Name" value={this.state.product.name} onChange={this.onInputChange} required />
				</FormControl>
				<FormControl fullWidth>
					<TextField name="product_index" label="Index" value={this.state.product.product_index} onChange={this.onInputChange} required />
				</FormControl>
				<FormControl fullWidth>
					<TextField name="supplier" label="Supplier" value={this.state.product.supplier} onChange={this.onInputChange} required />
				</FormControl>
				<FormControl fullWidth>
					<TextField name="price" label="Price" value={this.state.product.price} onChange={this.onInputChange} required />
				</FormControl>
				<Grid container spacing={2}>
					<Grid item xs={10}>
						<FormControl fullWidth>
							<TextField name="quantity" label="Quantity" value={this.state.product.quantity} onChange={this.onInputChange} required />
						</FormControl>
					</Grid>
					<Grid item xs={2}>
						<FormControl fullWidth>
							<InputLabel id="quantity-type">Type</InputLabel>
							<Select labelId="quantity-type" value={this.state.product.quantityType} name="quantityType" onChange={this.onSelectChange} required>
								<MenuItem value="kg">Kg</MenuItem>
								<MenuItem value="liter">Liter</MenuItem>
								<MenuItem value="pieces">Pieces</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<FormControl fullWidth>
					<TextField name="quantityAlert" label="Alert" type="number" value={this.state.product.quantityAlert} onChange={this.onInputChange} required />
				</FormControl>
				<FormControl fullWidth>
					<FileInput label="Picture" name="picture" value={this.state.product.picture} onChange={this.onFileChange} />
				</FormControl>
				<Grid container direction="row" justify="flex-end" alignItems="center">
					<Button type="submit" color="primary" variant="contained">
						Submit
					</Button>
				</Grid>
			</form>
		);
	}
}

export default ProductForm;
