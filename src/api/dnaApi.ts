import {digiSyfoNarmesteLederURL, digiSyfoVirksomheterURL, sjekkInnloggetURL} from '../lenker';
import { Organisasjon } from '../altinn/organisasjon';

interface SyfoKallObjekt {
    tilgang: boolean;
}

export async function hentSyfoTilgang(): Promise<boolean> {
    const respons = await fetch(digiSyfoNarmesteLederURL);
    if (respons.ok) {
        const syfoTilgang: SyfoKallObjekt = await respons.json();
        return syfoTilgang.tilgang;
    }
    throw new Error('Feil ved kontakt mot baksystem.');
}

export async function hentSyfoVirksomheter(): Promise<Organisasjon[]> {
    const respons = await fetch(digiSyfoVirksomheterURL);
    if (respons.ok) {
        return await respons.json();
    }
    throw new Error('Feil ved kontakt mot baksystem.');
}

export const sjekkInnlogget = async (): Promise<boolean> => {
    const {ok} = await fetch(sjekkInnloggetURL)
    return ok
}

export async function hentOrganisasjoner(): Promise<Organisasjon[]> {
    const respons = await fetch('/min-side-arbeidsgiver/api/organisasjoner');
    if (respons.ok) {
        return await respons.json();
    } else {
        throw new Error('Feil ved kontakt mot baksystem.');
    }
}

export async function hentOrganisasjonerOgSyfoVirksomheter(): Promise<Organisasjon[]> {
    return Promise.all([hentOrganisasjoner(), hentSyfoVirksomheter()]).then(r => r.flat());
}
