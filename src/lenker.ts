import environment from "./utils/environment";

export const soknadskjemaInkluderingstilskudd = () => {
  if (environment.MILJO === "prod-sbs") {
    return "https://www.altinn.no/skjemaoversikt/arbeids--og-velferdsetaten-nav/soknad-om-inkluderingstilskudd/";
  } else {
    return "https://tt02.altinn.no/Pages/ServiceEngine/Start/StartService.aspx?ServiceEditionCode=1&ServiceCode=5212";
  }
};

export const soknadsskjemaLonnstilskudd = () => {
  if (environment.MILJO === "prod-sbs") {
    return "https://altinn.no/skjemaoversikt/arbeids--og-velferdsetaten-nav/avtale-om-oppstart-av-lonnstilskudd/";
  } else {
    return "https://tt02.altinn.no/Pages/ServiceEngine/Start/StartService.aspx?ServiceEditionCode=1&ServiceCode=5159";
  }
};

export const soknadTilskuddTilMentor = () => {
  if (environment.MILJO === "prod-sbs") {
    return "https://www.altinn.no/skjemaoversikt/arbeids--og-velferdsetaten-nav/soknad-om-tilskudd-til-mentor/";
  } else {
    return "https://tt02.altinn.no/Pages/ServiceEngine/Start/StartService.aspx?ServiceEditionCode=1&ServiceCode=5216";
  }
};
export const inntekstmelding =
  "https://www.altinn.no/skjemaoversikt/arbeids--og-velferdsetaten-nav/Inntektsmelding-til-NAV/";

export const skjemaForArbeidsgivere =
  "https://www.nav.no/no/bedrift/skjemaer-for-arbeidsgivere";

export const syfoLink = () => {
  if (environment.MILJO === "prod-sbs") {
    return "https://tjenester.nav.no/sykefravaerarbeidsgiver";
  } else {
    return "https://tjenester-q1.nav.no/sykefravaerarbeidsgiver";
  }
};

export const veilarbStepup = () => {
  if (environment.MILJO === "prod-sbs") {
    return "https://tjenester.nav.no/veilarbstepup/oidc?url=https://arbeidsgiver.nav.no/ditt-nav-arbeidsgiver/";
  } else {
    return "https://tjenester-q1.nav.no/veilarbstepup/oidc?url=https://arbeidsgiver-q.nav.no/ditt-nav-arbeidsgiver/";
  }
};

export const pamRekruttering = () => {
  if (environment.MILJO === "prod-sbs") {
    return "https://arbeidsplassen.nav.no/kandidater/";
  } else {
    return "https://arbeidsplassen-q.nav.no/kandidater";
  }
};
export const pamStillingsannonser = () => {
  if (environment.MILJO === "prod-sbs") {
    return "https://arbeidsplassen.nav.no/stillingsregistrering/";
  } else {
    return "https://arbeidsplassen-q.nav.no/stillingsregistrering/";
  }
};

export const pamSettBedriftLenke = (orgnr: string) => {
  if (environment.MILJO === "prod-sbs") {
    return `https://arbeidsplassen.nav.no/stillingsregistrering-api/api/arbeidsgiver/${orgnr}`;
  } else {
    return `https://arbeidsplassen-q.nav.no/stillingsregistrering-api/api/arbeidsgiver/${orgnr}`;
  }
};

export const pamHentStillingsannonserLenke = () => {
  if (environment.MILJO === "prod-sbs") {
    return "https://arbeidsplassen.nav.no/stillingsregistrering-api/api/stillinger/numberByStatus";
  } else {
    return "https://arbeidsplassen-q.nav.no/stillingsregistrering-api/api/stillinger/numberByStatus";
  }
};

export const digiSyfoNarmesteLederLink =
  "/ditt-nav-arbeidsgiver/api/narmesteleder";

export const enhetsregisteretApiLink = (orgnr: string) => {
  return `https://data.brreg.no/enhetsregisteret/api/enheter/${orgnr}`;
};
