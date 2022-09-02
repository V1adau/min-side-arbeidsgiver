import React, {FunctionComponent, useContext} from 'react';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import {OrganisasjonsDetaljerContext} from '../OrganisasjonDetaljerProvider';
import {OrganisasjonerOgTilgangerContext} from '../OrganisasjonerOgTilgangerProvider';
import * as Record from '../../utils/Record';
import {NotifikasjonWidget} from "@navikt/arbeidsgiver-notifikasjon-widget";
import amplitude from "../../utils/amplitude";

interface OwnProps {
    sidetittel: string;
}

const Banner: FunctionComponent<OwnProps> = ({sidetittel}) => {

    const {organisasjoner} = useContext(OrganisasjonerOgTilgangerContext);
    const {endreOrganisasjon} = useContext(OrganisasjonsDetaljerContext);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const orgs = organisasjoner ? Record.mapToArray(organisasjoner, (orgnr, {organisasjon}) => organisasjon) : [];

    return (
        <Bedriftsmeny
            sidetittel={sidetittel}
            organisasjoner={orgs}
            onOrganisasjonChange={endreOrganisasjon}
            amplitudeClient={amplitude}
        >
            <NotifikasjonWidget/>
        </Bedriftsmeny>
    );
};

export default Banner;
