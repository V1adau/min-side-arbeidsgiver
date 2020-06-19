import React, { FunctionComponent, useContext } from 'react';
import { OrganisasjonsListeContext } from '../../OrganisasjonsListeProvider';
import { SyfoTilgangContext } from '../../SyfoTilgangProvider';
import { Tilgang } from '../LoginBoundary';
import TjenesteBoksContainer from './TjenesteBoksContainer/TjenesteBoksContainer';
import NyttigForDegContainer from './NyttigForDegContainer/NyttigForDegContainer';
import { AltinnContainer } from './AltinnContainer/AltinnContainer';
import { ManglerTilgangContainer } from './ManglerTilgangContainer/ManglerTilgangContainer';
import { FeilmeldingContainer } from './FeilmeldingContainer/FeilmeldingContainer';
import { SkjemaveilederContainer } from './SkjemaveilederContainer/SkjemaveilederContainer';
import IkkeTilgangTilDisseTjenestene from './IkkeTilgangTilDisseTjenestene/IkkeTilgangTilDisseTjenestene';
import { Koronaboks } from '../Koronaboks/Koronaboks';
import Banner from '../HovedBanner/HovedBanner';
import './Hovedside.less';

const Hovedside: FunctionComponent = () => {
    const { organisasjoner, visFeilmelding } = useContext(OrganisasjonsListeContext);
    const { tilgangTilSyfoState, visSyfoFeilmelding } = useContext(SyfoTilgangContext);

    const skalViseManglerTilgangBoks = !(
        organisasjoner.length > 0 || tilgangTilSyfoState === Tilgang.TILGANG
    );

    return (
        <>
            <Banner sidetittel="Min side – arbeidsgiver" />
            <div className="hovedside">
                <FeilmeldingContainer
                    visFeilmelding={visFeilmelding}
                    visSyfoFeilmelding={visSyfoFeilmelding}
                />
                {skalViseManglerTilgangBoks && <ManglerTilgangContainer />}
                {!skalViseManglerTilgangBoks && (
                    <>
                        <Koronaboks />
                        <TjenesteBoksContainer />
                        <NyttigForDegContainer />
                        <AltinnContainer />
                        <SkjemaveilederContainer />
                        <IkkeTilgangTilDisseTjenestene />
                    </>
                )}
            </div>
        </>
    );
};

export default Hovedside;
