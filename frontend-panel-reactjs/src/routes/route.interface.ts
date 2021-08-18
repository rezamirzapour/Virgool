import { ReactNode } from 'react';
import { RouteProps } from 'react-router-dom';

export interface RouteType extends RouteProps {
    title?: string;
    name: string;
    icon?: ReactNode;
    show?: boolean;
    auth: boolean
}


export default RouteType