import React, {FunctionComponent, useContext, useEffect, useState} from 'react';

import {OrganisasjonsDetaljerContext} from '../../../OrganisasjonDetaljerProvider';
import {OrganisasjonsListeContext} from '../../../OrganisasjonsListeProvider';
import './TjenesteBoksContainer.less';

import Syfoboks from './Syfoboks/Syfoboks';
import Pamboks from './Pamboks/Pamboks';
import Innholdsboks from '../Innholdsboks/Innholdsboks';
import Arbeidstreningboks from './Arbeidstreningboks/Arbeidstreningboks';
import IAwebboks from './IAwebboks/IAwebboks';

import LasterBoks from '../AltinnContainer/LasterBoks/LasterBoks';
import {Tilgang} from '../../LoginBoundary';
import {loggTilgangsKombinasjonAvTjenestebokser} from "../../../utils/funksjonerForAmplitudeLogging";

const TjenesteBoksContainer: FunctionComponent = () => {
    const {tilgangsArray,
        valgtOrganisasjon,
    } = useContext(OrganisasjonsDetaljerContext);
    const {
        organisasjonslisteFerdigLastet,
        organisasjonerMedIAFerdigLastet,
        organisasjoner
    } = useContext(OrganisasjonsListeContext);
    const [typeAntall, settypeAntall] = useState('');
    const [ferdigLastet, setFerdigLastet] = useState('laster');

    const [visIA, setVisIA] = useState(false);
    const [visArbeidstrening, setVisArbeidstrening] = useState(false);
    const [visSyfo, setVisSyfo] = useState(false);
    const [visPAM, setVisPam] = useState(false);

    useEffect(() => {
        if (!tilgangsArray.includes(Tilgang.LASTER)) {
            if (tilgangsArray[0] === Tilgang.TILGANG) {
                setVisSyfo(true);
            }
            else {
                setVisSyfo(false);
            }
            if (tilgangsArray[1] === Tilgang.TILGANG) {
                setVisPam(true);
            }
            else {
                setVisPam(false);
            }
            if (tilgangsArray[2] === Tilgang.TILGANG) {
                setVisIA(true);
            }
            else {
                setVisIA(false)
            }
            if (tilgangsArray[3] === Tilgang.TILGANG) {
                setVisArbeidstrening(true);
            }
            else {
                setVisArbeidstrening(false)
            }
        }
    },
        [
        valgtOrganisasjon,
            tilgangsArray
    ]);

    useEffect(() => {
        setFerdigLastet('laster');
        console.log("obs loop");
        const antallTjenester: number = tilgangsArray.filter(tilgang => {
            return tilgang === Tilgang.TILGANG;
        }).length;
        if (
            !tilgangsArray.includes(Tilgang.LASTER))
        {
            if (antallTjenester % 2 === 0) {
                settypeAntall('antall-partall');
            }
            if (antallTjenester % 2 !== 0 && antallTjenester !== 1) {
                settypeAntall('antall-oddetall');
            }
            if (antallTjenester === 1) {
                settypeAntall('antall-en');
            }
            loggTilgangsKombinasjonAvTjenestebokser(tilgangsArray);
            setTimeout(function() {
                setFerdigLastet('ferdig');
            }, 300);
        }
        console.log(tilgangsArray, organisasjoner, organisasjonslisteFerdigLastet);
        if ((organisasjonslisteFerdigLastet && organisasjoner.length === 0 && tilgangsArray[0] !== Tilgang.LASTER)) {
            setFerdigLastet('ferdig');
        }
    }, [
        organisasjonslisteFerdigLastet,
        organisasjonerMedIAFerdigLastet,
        tilgangsArray, organisasjoner
    ]);

    return (
        <>
            {' '}
            <div className={'tjenesteboks-container ' + typeAntall}>
                {ferdigLastet === 'laster' && <LasterBoks />}
                {(ferdigLastet === 'ferdig') && (
                    <>
                        {visSyfo && (
                            <Innholdsboks className={'tjenesteboks innholdsboks'}>
                                <Syfoboks className={'syfoboks'} />
                            </Innholdsboks>
                        )}
                        {visIA && (
                            <div className={'tjenesteboks innholdsboks'}>
                                <IAwebboks />
                            </div>
                        )}
                        {visPAM && (
                            <div className={'tjenesteboks innholdsboks'}>
                                <Pamboks />
                            </div>
                        )}
                        {visArbeidstrening && (
                            <div className={'tjenesteboks innholdsboks'}>
                                <Arbeidstreningboks />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default TjenesteBoksContainer;
