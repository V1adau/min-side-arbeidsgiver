import { useEffect, useReducer } from 'react';
import { SIDE_SIZE } from './Saksoversikt';
import { useSessionState } from './useOversiktSessionStorage';
import { useSaker } from '../useSaker';
import amplitude from '../../../../utils/amplitude';
import { Organisasjon } from '../Saksfilter/Virksomhetsmeny/Virksomhetsmeny';
import {
    OppgaveTilstand,
    OppgaveTilstandInfo,
    Sak,
    SakerResultat,
    SakSortering,
    Sakstype,
} from '../../../../api/graphql-types';


export type Filter = {
    side: number,
    tekstsoek: string,
    virksomheter: Organisasjon[] | 'ALLEBEDRIFTER',
    sortering: SakSortering,
    sakstyper: string[],
    oppgaveTilstand: OppgaveTilstand[],
}

export type State = {
    state: 'loading';
    filter: Filter;
    sider: number | undefined;
    totaltAntallSaker: number | undefined;
    forrigeSaker: Array<Sak> | null;
    sakstyper: Array<Sakstype> | undefined;
    oppgaveTilstandInfo: Array<OppgaveTilstandInfo> | undefined;
    startTid: Date;
} | {
    state: 'done';
    filter: Filter;
    sider: number;
    saker: Array<Sak>;
    sakstyper: Array<Sakstype>;
    totaltAntallSaker: number;
    oppgaveTilstandInfo: Array<OppgaveTilstandInfo>;
} | {
    state: 'error';
    filter: Filter;
    sider: number | undefined;
    sakstyper: Array<Sakstype> | undefined;
    totaltAntallSaker: number | undefined;
    oppgaveTilstandInfo: Array<OppgaveTilstandInfo> | undefined;
}

type Action =
    | { action: 'bytt-filter', filter: Filter }
    | { action: 'lasting-pågår' }
    | { action: 'lasting-ferdig', resultat: SakerResultat }
    | { action: 'lasting-feilet' }


export const useOversiktStateTransitions = (alleVirksomheter: Organisasjon[]) => {
    const [sessionState, setSessionState] = useSessionState(alleVirksomheter)

    const [state, dispatch] = useReducer(reduce, {
        state: 'loading',
        filter: sessionState,
        forrigeSaker: null,
        sider: undefined,
        totaltAntallSaker: undefined,
        sakstyper: undefined,
        oppgaveTilstandInfo: undefined,
        startTid: new Date(),
    });

    const { loading, data } = useSaker(SIDE_SIZE, state.filter);

    useEffect(() => {
        setSessionState(state.filter)
    }, [state.filter])

    useEffect(() => {
        if (loading) {
            dispatch({ action: 'lasting-pågår' });
        } else if (data?.saker?.__typename !== 'SakerResultat') {
            dispatch({ action: 'lasting-feilet' });
        } else {
            amplitude.logEvent('komponent-lastet', {
                komponent: 'saksoversikt',
                side: state.filter.side,
                tekstsoek: state.filter.tekstsoek.trim() !== '',
                totaltAntallSaker: data.saker.totaltAntallSaker,
            });
            dispatch({ action: 'lasting-ferdig', resultat: data.saker });
        }
    }, [loading, data]);

    return {
        state,
        byttFilter: (filter: Filter) => dispatch({ action: 'bytt-filter', filter }),
    };
};

const reduce = (current: State, action: Action): State => {
    switch (action.action) {
        case 'bytt-filter':
            if (equalFilter(current.filter, action.filter)) {
                return current;
            }

            if (equalFilter(
                { ...current.filter, side: 1, sortering: SakSortering.Frist },
                { ...action.filter, side: 1, sortering: SakSortering.Frist },
            )) {
                return {
                    state: 'loading',
                    filter: action.filter,
                    sider: current.sider,
                    startTid: new Date(),
                    sakstyper: current.sakstyper,
                    oppgaveTilstandInfo: current.oppgaveTilstandInfo,
                    totaltAntallSaker: current.totaltAntallSaker,
                    forrigeSaker: finnForrigeSaker(current),
                };
            }
            return {
                state: 'loading',
                filter: action.filter,
                sider: undefined,
                sakstyper: current.sakstyper,
                oppgaveTilstandInfo: current.oppgaveTilstandInfo,
                startTid: new Date(),
                totaltAntallSaker: undefined,
                forrigeSaker: finnForrigeSaker(current),
            };
        case 'lasting-pågår':
            return {
                state: 'loading',
                filter: current.filter,
                sider: current.sider,
                sakstyper: current.sakstyper,
                oppgaveTilstandInfo: current.oppgaveTilstandInfo,
                startTid: new Date(),
                totaltAntallSaker: current.totaltAntallSaker,
                forrigeSaker: finnForrigeSaker(current),
            };
        case 'lasting-feilet':
            return {
                state: 'error',
                filter: current.filter,
                sider: current.sider,
                totaltAntallSaker: current.totaltAntallSaker,
                sakstyper: current.sakstyper,
                oppgaveTilstandInfo: current.oppgaveTilstandInfo,
            };
        case 'lasting-ferdig':
            const { totaltAntallSaker, saker } = action.resultat;
            const sider = Math.ceil(totaltAntallSaker / SIDE_SIZE);
            if (totaltAntallSaker > 0 && saker.length === 0) {
                // på et eller annet vis er det saker (totaltAntallSaker > 0), men
                // vi mottok ingen. Kan det være fordi vi er forbi siste side? Prøv
                // å gå til siste side.
                return {
                    state: 'loading',
                    filter: { ...current.filter, side: Math.max(1, sider - 1) },
                    sider,
                    totaltAntallSaker,
                    startTid: new Date(),
                    forrigeSaker: null,
                    sakstyper: current.sakstyper,
                    oppgaveTilstandInfo: current.oppgaveTilstandInfo,
                };
            } else {
                return {
                    state: 'done',
                    filter: current.filter,
                    sider,
                    saker: action.resultat.saker,
                    sakstyper: action.resultat.sakstyper,
                    totaltAntallSaker: action.resultat.totaltAntallSaker,
                    oppgaveTilstandInfo: action.resultat.oppgaveTilstandInfo,
                };
            }
    }
};

const finnForrigeSaker = (state: State): Array<Sak> | null => {
    switch (state.state) {
        case 'done':
            return state.saker;
        case 'loading':
            return state.forrigeSaker ?? null;
        case 'error':
            return null;
    }
};


function equalVirksomhetsnumre(a: Filter, b: Filter) {
    const virksomheterA = a.virksomheter;
    const virksomheterB = b.virksomheter;
    if (virksomheterA === 'ALLEBEDRIFTER' && virksomheterB === 'ALLEBEDRIFTER') {
        return true;
    } else if (Array.isArray(virksomheterA) && Array.isArray(virksomheterB)) {
        return virksomheterA.length === virksomheterB.length &&
            virksomheterA.every(aVirksomhet => virksomheterB.some(bVirksomhet => aVirksomhet.OrganizationNumber === bVirksomhet.OrganizationNumber));
    } else {
        return false;
    }
}

export function equalAsSets(a: string[], b: string[]) {
    return a.length === b.length && a.every(aa => b.includes(aa));
}

export const equalFilter = (a: Filter, b: Filter): boolean =>
    a.side === b.side &&
    a.tekstsoek === b.tekstsoek &&
    equalVirksomhetsnumre(a, b) &&
    a.sortering === b.sortering &&
    equalAsSets(a.sakstyper, b.sakstyper) &&
    equalAsSets(a.oppgaveTilstand, b.oppgaveTilstand);
