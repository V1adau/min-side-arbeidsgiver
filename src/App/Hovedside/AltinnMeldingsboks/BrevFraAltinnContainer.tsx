import React, { useContext } from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { OrganisasjonsDetaljerContext } from '../../../OrganisasjonDetaljerProvider';
import './BrevFraAltinnContainer.less';
import { AltinnBrev, Meldingsboks, Status } from '../../../api/altinnApi';
import { NyFaneLenke } from '../../../GeneriskeElementer/NyFaneLenke';
import AntallUlest from '../../../GeneriskeElementer/AntallUlest';
import { Normaltekst } from 'nav-frontend-typografi';

const BrevFraAltinnContainer: React.FunctionComponent = _ => {
    const { altinnMeldingsboks } = useContext(OrganisasjonsDetaljerContext);

    if (altinnMeldingsboks === undefined || altinnMeldingsboks.brev.length === 0) {
        return null;
    }

    const antallUlest =
        altinnMeldingsboks.antallUleste === 'mange'
            ? ''
            : altinnMeldingsboks.antallUleste.toString();

    const inboksTittel = (
        <div className="tilskuddsbrev__tittel">
            <div className="tilskuddsbrev__inboxikon">
                <InboxIcon />
                <AntallUlest antallUlest={antallUlest} />
            </div>
            <span>Tilskuddsbrev om NAV-tiltak fra Altinn innboks</span>
        </div>
    );

    return (
        <div className="tilskuddsbrev">
            <Ekspanderbartpanel tittel={inboksTittel}>
                <>
                    <ul className="tilskuddsbrev__liste">
                        {altinnMeldingsboks.brev.map(BrevContainer)}
                    </ul>
                    <SeMer {...altinnMeldingsboks} />
                </>
            </Ekspanderbartpanel>
        </div>
    );
};

const dateFormat = new Intl.DateTimeFormat('no', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
});

const BrevContainer = (brev: AltinnBrev) => {
    const className = `tilskuddsbrev__${brev.status === Status.Lest ? 'lest' : 'ulest'}-lenke`;
    const dato = dateFormat.format(brev.datoSendt);
    return (
        <li className="tilskuddsbrev__liste-element" key={brev.key}>
            <Normaltekst className="tilskuddsbrev__dato">Sendt {dato}</Normaltekst>
            <NyFaneLenke
                className={className}
                href={brev.portalview}
                ariaLabel={`Sendt ${dato}, ${brev.status}, ${brev.tittel}`}
            >
                {brev.tittel}
            </NyFaneLenke>
        </li>
    );
};

const SeMer = (props: Meldingsboks) =>
    props.finnesFlereBrev ? (
        <NyFaneLenke href={props.portalview}>Se flere i Altinn meldingsboks</NyFaneLenke>
    ) : null;

const InboxIcon = () => (
    <svg
        x="0px"
        y="0px"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        enableBackground="new 0 0 24 24"
    >
        <path
            d="M23.994,16.47c-0.002-0.034-0.011-0.065-0.02-0.098c-0.009-0.033-0.017-0.064-0.032-0.094
	c-0.005-0.009-0.004-0.02-0.01-0.029l-3.5-6C20.342,10.095,20.178,10,20,10h-1V1.5C19,1.224,18.776,1,18.5,1h-13
	C5.224,1,5,1.224,5,1.5V10H4c-0.178,0-0.342,0.095-0.432,0.248l-3.5,6c-0.005,0.01-0.005,0.02-0.01,0.029
	c-0.015,0.03-0.023,0.062-0.032,0.094c-0.009,0.033-0.018,0.064-0.02,0.098C0.005,16.48,0,16.489,0,16.5v7C0,23.776,0.224,24,0.5,24
	h23c0.276,0,0.5-0.224,0.5-0.5v-7C24,16.489,23.995,16.48,23.994,16.47z M10.5,6h5C15.776,6,16,6.224,16,6.5
	C16,6.776,15.776,7,15.5,7h-5C10.224,7,10,6.776,10,6.5C10,6.224,10.224,6,10.5,6z M8.5,4h1C9.776,4,10,4.224,10,4.5
	C10,4.776,9.776,5,9.5,5h-1C8.224,5,8,4.776,8,4.5C8,4.224,8.224,4,8.5,4z M8.5,8h7C15.776,8,16,8.224,16,8.5
	C16,8.776,15.776,9,15.5,9h-7C8.224,9,8,8.776,8,8.5C8,8.224,8.224,8,8.5,8z M8.5,10h7c0.276,0,0.5,0.224,0.5,0.5
	c0,0.276-0.224,0.5-0.5,0.5h-7C8.224,11,8,10.776,8,10.5C8,10.224,8.224,10,8.5,10z M8.5,12h7c0.276,0,0.5,0.224,0.5,0.5
	c0,0.276-0.224,0.5-0.5,0.5h-7C8.224,13,8,12.776,8,12.5C8,12.224,8.224,12,8.5,12z M16.5,16c-0.276,0-0.5,0.224-0.5,0.5v1
	c0,0.827-0.673,1.5-1.5,1.5H10c-0.827,0-1.5-0.673-1.5-1.5v-1C8.5,16.224,8.276,16,8,16H1.371l2.917-5H5v3.5
	C5,14.776,5.224,15,5.5,15h13c0.276,0,0.5-0.224,0.5-0.5V11h0.713l2.917,5H16.5z"
        />
    </svg>
);

export default BrevFraAltinnContainer;
