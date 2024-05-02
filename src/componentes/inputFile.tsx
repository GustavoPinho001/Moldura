import React from 'react';
import './index.css'

interface Props {
    label: string;
    nome: string;
    accept: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFile: React.FC<Props> = ({ label, nome, accept, onChange }) => {
    return (
        <label htmlFor={nome}>
            {label}
            <input
                className='bg-red-300 p-3 w-full rounded-xl'
                type="file"
                id={nome}
                name={nome}
                accept={accept}
                onChange={onChange}
            />
        </label>
    );
};

export default InputFile;
