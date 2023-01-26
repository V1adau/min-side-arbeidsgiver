import React, {FC, useEffect, useState} from "react";
import * as Sentry from '@sentry/react';
import "./Saksfilter.css"
import {
    Organisasjon, OrganisasjonEnhet,
    Virksomhetsmeny
} from "./Virksomhetsmeny/Virksomhetsmeny";
import {byggOrganisasjonstre} from "./ByggOrganisasjonstre";
import {Søkeboks} from './Søkeboks';
import {Filter} from '../Saksoversikt/useOversiktStateTransitions';
import {Ekspanderbartpanel} from "../../../../GeneriskeElementer/Ekspanderbartpanel";
import {BodyShort, Checkbox, CheckboxGroup} from "@navikt/ds-react";
import {Sakstype} from "../../../../api/graphql-types";


type SaksfilterProps = {
    filter: Filter;
    setFilter: (filter: Filter) => void;
    valgteVirksomheter: Organisasjon[] | "ALLEBEDRIFTER";
    setValgteVirksomheter: (valgteVirksomheter: Organisasjon[] | "ALLEBEDRIFTER") => void;
    sakstyper: Sakstype[] | undefined;
    organisasjoner: Organisasjon[];
}

type KollapsHvisMobilProps = {
    width: Number
    children?: React.ReactNode | undefined
}

const KollapsHvisMobil: FC<KollapsHvisMobilProps> = ({width, children}: KollapsHvisMobilProps) => {
    if (width < 730) {
        return <Ekspanderbartpanel tittel="Filtrering">
            {children}
        </Ekspanderbartpanel>
    } else {
        return <>{children}</>
    }
}


export const Saksfilter = ({
                               valgteVirksomheter,
                               setValgteVirksomheter,
                               organisasjoner,
                               filter,
                               setFilter,
                               sakstyper,
                           }: SaksfilterProps) => {
    const [organisasjonstre, setOrganisasjonstre] = useState<OrganisasjonEnhet[]>()
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        byggOrganisasjonstre(organisasjoner)
            .then(setOrganisasjonstre)
            .catch(Sentry.captureException)
    }, [organisasjoner])

    useEffect(() => {
        const setSize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", setSize);
        return () => window.removeEventListener("resize", setSize);
    }, [setWidth]);


    if (organisasjonstre === undefined) {
        return null
    }

    console.log(sakstyper)
    return <KollapsHvisMobil width={width}>
        <div className="saksfilter">
            <Virksomhetsmeny organisasjonstre={organisasjonstre}
                             valgteEnheter={valgteVirksomheter}
                             settValgteEnheter={setValgteVirksomheter}/>

            <Søkeboks filter={filter} byttFilter={setFilter}></Søkeboks>

            {sakstyper && <CheckboxGroup
                legend="Type sak"
                value={filter.sakstyper}
                onChange={valgteSakstyper => {
                    setFilter({...filter, sakstyper: valgteSakstyper});
                }}
            >
                {
                    sakstyper.map(({navn}) =>
                        <Checkbox value={navn}>
                            <BodyShort>
                                {navn}
                            </BodyShort>
                        </Checkbox>)
                }
            </CheckboxGroup>}
        </div>
    </KollapsHvisMobil>

}

