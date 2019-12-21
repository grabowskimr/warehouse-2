import React, { ChangeEvent, FormEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '../containers/Paper';

import ProductForm from './ProductForm';
import { TFileType, TSelect } from '../types/types';
import { sendData } from '../actions/dbActions';
import withContext from '../utils/withContext';

class AddProductPage extends React.Component<any, any> {
	state = {
		product: {
			name: '',
			index: '',
			supplier: '',
			quantity: 0,
			quantityType: '',
			quantityAlert: 0,
			price: '',
			picture: null
		},
		file: null
	};

	submitForm = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		let data = await sendData({
			...this.state.product,
			file: this.state.file,
			action: 'addProduct'
		});
		this.props.dispatch({
			type: 'SET_MESSAGE_VISIBLE',
			payload: {
				message: data.message
			}
		});
	};

	onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		let name: string = e.target.name;
		this.setState({
			product: {
				...this.state.product,
				[name]: e.target.value
			}
		});
	};

	onSelectChange = (data: TSelect): void => {
		let name = data.name;
		this.setState({
			product: {
				...this.state.product,
				[name]: data.value
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
			<div>
				<Paper>
					<Typography variant="h5">Add Product</Typography>
					<ProductForm onSubmit={this.submitForm} onInputChange={this.onInputChange} onFileChange={this.onFileChange} onSelectChange={this.onSelectChange} product={this.state.product} />
				</Paper>
			</div>
		);
	}
}

export default withContext(AddProductPage);
