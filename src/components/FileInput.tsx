import React, {FormEvent, useState} from 'react';
import TextField from "@material-ui/core/TextField";

type TFileInput = {
    label: string,
    name: string,
    onChange: (value: string) => void
}

const FileInput = (props: TFileInput) => {
    const [file, setFile] = useState();

    const onChange = (e: FormEvent<Element>) => {
        console.log(e.target);
        props.onChange('test');
    };

    return (
        <TextField type="file" name={props.name} label={props.label} value={file} onChange={onChange}/>
    )
};

export default FileInput;