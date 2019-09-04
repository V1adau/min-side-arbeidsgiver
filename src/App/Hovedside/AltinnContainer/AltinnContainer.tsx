import React, { FunctionComponent, useContext, useEffect, useState } from 'react';

import { OrganisasjonsDetaljerContext, TilgangAltinn } from '../../../OrganisasjonDetaljerProvider';

import './AltinnContainer.less';
import { Undertittel } from 'nav-frontend-typografi';

import {
    inntekstmelding,
    soknadskjemaInkluderingstilskudd,
    soknadsskjemaLonnstilskudd,
    soknadTilskuddTilMentor,
} from '../../../lenker';
import AltinnLenke from './AltinnLenke/AltinnLenke';
import { AltinnSkjema, OrganisasjonsListeContext } from '../../../OrganisasjonsListeProvider';
import { SkjemaMedOrganisasjonerMedTilgang } from '../../../api/dnaApi';

const ListeMedAltinnSkjemaKoder: AltinnSkjema[] = [
    {
        navn: 'Ekspertbistand',
        kode: '5384',
    },
    {
        navn: 'InkluderingsTilskudd',
        kode: '5212',
    },
    {
        navn: 'Lønnstilskudd',
        kode: '5159',
    },
    {
        navn: 'Mentortilskudd',
        kode: '5216',
    },
    {
        navn: 'Inntektsmelding',
        kode: '4936',
    },
];

const AltinnContainer: FunctionComponent = () => {
    const [typeAntall, settypeAntall] = useState('');

    const [erFem, seterFem] = useState('');
    const [tilgangInkluderingstilskudd, setTilgangInkluderingstilskudd] = useState(
        TilgangAltinn.LASTER
    );
    const [tilgangEkspertBistand, setTilgangEkspertbistand] = useState(TilgangAltinn.LASTER);
    const [tilgangLønnsTilskudd, setTilgangLønnsTilskudd] = useState(TilgangAltinn.LASTER);
    const [tilgangMentortilskudd, setTilgangMentortilskudd] = useState(TilgangAltinn.LASTER);
    const [tilgangInntektsMelding, setilgangInntektsMelding] = useState(TilgangAltinn.LASTER);

    const [generellAltinnTilgang, setgenerellAltinnTilgang] = useState(false);
    const { tilgangTilAltinnForInntektsmelding } = useContext(OrganisasjonsDetaljerContext);
    const { listeMedSkjemaOgTilganger } = useContext(OrganisasjonsListeContext);
    listeMedSkjemaOgTilganger;

    const finnOrganisasjonForTilgang = (skjema: SkjemaMedOrganisasjonerMedTilgang) => {
        if (listeMedSkjemaOgTilganger.includes(skjema)) {
        }
    };

    useEffect(() => {
        setgenerellAltinnTilgang(true);
        const tellAntallSkjema = () => {
            let antallTilganger: number = 0;
            if (tilgangTilAltinnForInntektsmelding === TilgangAltinn.TILGANG) {
                antallTilganger++;
            }
            if (tilgangTilAltinnForFireSkjemaState === TilgangAltinn.TILGANG) {
                antallTilganger += 4;
            }
            if (antallTilganger % 2 === 0) {
                settypeAntall('antall-skjema-partall');
            }
            if (antallTilganger % 2 !== 0 && antallTilganger !== 1) {
                settypeAntall('antall-skjema-oddetall');
            }
            if (antallTilganger === 1) {
                settypeAntall('antall-skjema-en');
            }
            if (antallTilganger === 5) {
                seterFem('fem');
            }
            if (antallTilganger > 0) {
                setgenerellAltinnTilgang(true);
            }
        };
        tellAntallSkjema();
    }, [tilgangTilAltinnForFireSkjemaState, tilgangTilAltinnForInntektsmelding]);

    return (
        <div className={'altinn-container'}>
            {generellAltinnTilgang && (
                <Undertittel className={'altinn-container__tekst'}>Skjema på Altinn</Undertittel>
            )}
            <div className={'altinn-container__bokser' + erFem}>
                {tilgangTilAltinnForFireSkjemaState === TilgangAltinn.TILGANG && (
                    <AltinnLenke
                        className={'altinn-container__' + typeAntall + erFem}
                        href={soknadskjemaInkluderingstilskudd()}
                        tekst={'Inkluderingstilskudd'}
                    />
                )}
                {tilgangTilAltinnForFireSkjemaState === TilgangAltinn.TILGANG && (
                    <AltinnLenke
                        className={'altinn-container__' + typeAntall + erFem}
                        href={soknadsskjemaLonnstilskudd()}
                        tekst={'Lønnstilskudd'}
                    />
                )}
                {tilgangTilAltinnForFireSkjemaState === TilgangAltinn.TILGANG && (
                    <AltinnLenke
                        className={'altinn-container__' + typeAntall + erFem + erFem}
                        href={soknadTilskuddTilMentor()}
                        tekst={'Tilskudd til mentor'}
                    />
                )}
                {tilgangTilAltinnForFireSkjemaState === TilgangAltinn.TILGANG && (
                    <AltinnLenke
                        className={'altinn-container__' + typeAntall + erFem}
                        href={inntekstmelding}
                        tekst={'Tilskudd til ekspertbistand'}
                    />
                )}

                {tilgangTilAltinnForInntektsmelding === TilgangAltinn.TILGANG && (
                    <AltinnLenke
                        className={'altinn-container__' + typeAntall + erFem}
                        href={inntekstmelding}
                        tekst={'Inntektsmelding'}
                    />
                )}
            </div>
        </div>
    );
};

export default AltinnContainer;
