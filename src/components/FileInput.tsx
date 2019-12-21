import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { TFileType } from '../types/types';

type TFileInput = {
	label: string;
	name: string;
	value: string | null;
	onChange: (value: TFileType) => void;
};

const FileInput: React.FC<TFileInput> = props => {
	const [fileName, setFileName] = useState(props.value ? props.value : '');

	const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		let file: File | null = e.target.files && e.target.files.length ? e.target.files[0] : null;
		if (file) {
			setFileName(file.name);
		} else {
			setFileName('');
		}
		props.onChange({
			file: file,
			fileName: file ? file.name : '',
			inputName: props.name
		});
	};

	return (
		<>
			<TextField type="file" label={props.label} name={props.name} onChange={onChange} />
			<TextField type="hidden" name={props.name} value={fileName} />
		</>
	);
};

export default FileInput;
