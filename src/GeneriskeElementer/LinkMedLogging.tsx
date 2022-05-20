import {FunctionComponent, MouseEventHandler} from 'react';
import {loggNavigasjon} from '../utils/funksjonerForAmplitudeLogging';
import {Link, LinkProps, useLocation} from 'react-router-dom';

export interface Props extends LinkProps {
    loggLenketekst: string;
}

export const LinkMedLogging: FunctionComponent<Props> = props => {
    const {onClick, loggLenketekst, ...rest} = props;
    const {pathname} = useLocation()

    const onClickLog: MouseEventHandler<HTMLAnchorElement> = event => {
        window.scrollTo(0,0);
        loggNavigasjon(props.href, loggLenketekst, pathname);
        onClick?.(event);
    };

    return <Link onClick={onClickLog} {...rest} />;
};