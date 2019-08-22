import React, { FunctionComponent } from 'react';
import './Innloggingstjenester.less';
import medisin from './medicine-capsule-1.svg';
import sok from './search.svg';
import verktoy from './toolbox.svg';
import skjema from './skjema.svg';
import { Element } from 'nav-frontend-typografi';

export const Innloggingstjenester: FunctionComponent = () => {
    return (
        <div className={'innloggingsside-tjenester'}>
            <div className={'innloggingsside-tjenester__tjeneste'}>
                <img
                    src={medisin}
                    alt={'Bilde av piller for å illustrere sykefravær'}
                    className={'innloggingsside-tjenester__tjeneste-ikon'}
                />
                <Element>Sykefraværsoppfølging </Element>
            </div>
            <div className={'innloggingsside-tjenester__tjeneste'}>
                <img
                    src={sok}
                    alt={'Bilde av forstørrelsesglass for å illustrere rekrutteringstjenesten'}
                    className={'innloggingsside-tjenester__tjeneste-ikon'}
                />
                <Element>Rekruttering </Element>
            </div>
            <div className={'innloggingsside-tjenester__tjeneste'}>
                <img
                    alt="{Bilde av en verktøykasse }"
                    src={verktoy}
                    className={'innloggingsside-tjenester__tjeneste-ikon'}
                />
                <Element>Arbeidstrening </Element>
            </div>
            <div className={'innloggingsside-tjenester__tjeneste'}>
                <img
                    alt={'Bilde av skjemaer for å illustrere skjemaer på altinn'}
                    src={skjema}
                    className={'innloggingsside-tjenester__tjeneste-ikon'}
                />
                <Element>Digitale skjemaer </Element>
            </div>
        </div>
    );
};
