import { ButtonHTMLAttributes } from 'react';
import '../styles/buttons.scss';

type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?:boolean
};


export function Button({isOutlined=false, ...props}: ButtonTypes){
    return(
        <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props}/>
    )
}