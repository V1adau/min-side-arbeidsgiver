import { gql, TypedDocumentNode, useLazyQuery } from '@apollo/client';
import React, {useContext, useEffect} from 'react';
import * as Sentry from '@sentry/react';
import { GQL } from '@navikt/arbeidsgiver-notifikasjon-widget';
import {AlertContext} from "../../Alerts/Alerts";
import { Filter } from './Saksoversikt/Filter';


const HENT_SAKER: TypedDocumentNode<Pick<GQL.Query, "saker">> = gql`
    query hentSaker($virksomhetsnummer: String!, $tekstsoek: String, $sortering: SakSortering!, $offset: Int, $limit: Int) {
        saker(virksomhetsnummer: $virksomhetsnummer, tekstsoek: $tekstsoek, sortering: $sortering, offset: $offset, limit: $limit) {
            saker {
                id
                tittel
                lenke
                merkelapp
                virksomhet {
                    navn
                    virksomhetsnummer
                }
                sisteStatus {
                    type
                    tekst
                    tidspunkt
                }
                frister
            }
            feilAltinn
            totaltAntallSaker
        }
    }
`

export function useSaker(
    pageSize: number,
    {side, tekstsoek, virksomhetsnummer}: Filter,
    sortering: GQL.SakSortering = GQL.SakSortering.Oppdatert
) {
    const variables = {
        virksomhetsnummer: virksomhetsnummer,
        tekstsoek: (tekstsoek === "") ? null : tekstsoek,
        sortering,
        offset: ((side ?? 0) - 1) * pageSize, /* if undefined, we should not send */
        limit: pageSize
    }

    const [fetchSaker, {loading, data, previousData}] = useLazyQuery(HENT_SAKER,  {
        variables
    })

    useEffect(() => {
        console.log("valg sortering:", {sortering})
        if (virksomhetsnummer !== null && side !== undefined) {
            fetchSaker({ variables })
                .then(_ => { /* effect is seen in return of useLazyQuery */ })
                .catch(Sentry.captureException);
        }

    }, [virksomhetsnummer, tekstsoek, side, sortering])

    const {addAlert, clearAlert} = useContext(AlertContext);

    useEffect(()=>{
        if(data?.saker.feilAltinn ?? false) {
            addAlert("Saker");
        } else {
            clearAlert("Saker");
        }
    }, [data])
    return {loading, data, previousData}
}

