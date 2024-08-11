import {ComponentPropsWithoutRef, forwardRef, useState} from 'react';

import s from './Input.module.scss';
import clsx from "clsx";
import {errorNotification} from "../../lib/notifications";

export type InputProps ={error?:string} & ComponentPropsWithoutRef<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (props: InputProps, ref) => {
        const {error,type,...rest} = props;

        return <input type={type} ref={ref} className={clsx(s.input,error && s.error)} {...rest}/>;
    }
);
