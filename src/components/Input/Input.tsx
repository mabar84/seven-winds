import {ComponentPropsWithoutRef, forwardRef} from 'react';
import clsx from "clsx";

import s from './Input.module.scss';

export type InputProps ={error?:string} & ComponentPropsWithoutRef<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (props: InputProps, ref) => {
        const {error,type,...rest} = props;

        return <input type={type} ref={ref} className={clsx(s.input,error && s.error)} {...rest}/>;
    }
);
