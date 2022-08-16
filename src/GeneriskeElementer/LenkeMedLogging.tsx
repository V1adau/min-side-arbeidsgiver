import { FunctionComponent, MouseEventHandler } from 'react';
import {Link, LinkProps} from '@navikt/ds-react';
import { loggNavigasjon } from '../utils/funksjonerForAmplitudeLogging';
import { useLocation } from 'react-router-dom';

export interface Props extends LinkProps {
    loggLenketekst: string;
}

export const LenkeMedLogging: FunctionComponent<Props> = props => {
    const {onClick, loggLenketekst, ...rest} = props;
    const {pathname} = useLocation()

    const onClickLog: MouseEventHandler<HTMLAnchorElement> = event => {
        loggNavigasjon(props.href, loggLenketekst, pathname);
        onClick?.(event);
    };
    return <Link style={{fontSize:"18px"}} onClick={onClickLog} {...rest}/>
};