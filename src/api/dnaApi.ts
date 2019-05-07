import { Organisasjon } from "../organisasjon";
import { SyfoKallObjekt } from "../syfoKallObjekt";
import { digiSyfoNarmesteLederLink } from "../lenker";

export interface Rolle {
  Roledefinition: number;
  RoleName: string;
  RoleDescription: string;
}

export async function hentOrganisasjoner(): Promise<Array<Organisasjon>> {
  let respons = await fetch("/ditt-nav-arbeidsgiver/api/organisasjoner");
  if (respons.ok) {
    return await respons.json();
  } else {
    return [];
  }
}

export async function hentRoller(orgnr: string): Promise<Array<Rolle>> {
  let respons = await fetch("/ditt-nav-arbeidsgiver-api/api/roller/" + orgnr);
  if (respons.ok) {
    return await respons.json();
  } else {
    return [];
  }
}

export async function hentSyfoTilgang(): Promise<boolean> {
  let respons = await fetch(digiSyfoNarmesteLederLink);
  if (respons.ok) {
    const objekt: SyfoKallObjekt = await respons.json();
    if (objekt.narmesteLedere.length) {
      return true;
    }
  }
  return false;
}

function redirectHvisUnauthorized(respons: Response) {
  if (respons.status === 401) {
    window.location.href = "/ditt-nav-arbeidsgiver/login";
  }
}
