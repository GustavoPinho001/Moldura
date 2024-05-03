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
        <label htmlFor={nome} className='text-2xl w-[70%] bg-red-300 border border-red-300 rounded-lg p-4 hover:border-black'>
            {label}
            <input
                className=' hidden   '
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
