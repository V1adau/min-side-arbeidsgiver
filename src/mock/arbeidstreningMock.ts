import fetchMock from "fetch-mock";
import { hentArbeidsavtalerApiLink } from "../lenker";

fetchMock.get(hentArbeidsavtalerApiLink(), [
  {
    deltakerFnr: "01093434109",
    bedriftNr: "111111111",
    veilederNavIdent: "X123456",
    opprettetTidspunkt: "2019-06-06T12:20:18.805",
    id: "6ae3be81-abcd-477e-a8f3-4a5eb5fe91e3",
    versjon: 7,
    deltakerFornavn: "Didrik",
    deltakerEtternavn: "Deltaker",
    bedriftNavn: "Fiskebåten",
    arbeidsgiverFornavn: "Filip",
    arbeidsgiverEtternavn: "Fisker",
    arbeidsgiverTlf: "22334455",
    veilederFornavn: "Vera",
    veilederEtternavn: "Veileder",
    veilederTlf: "33445566",
    oppfolging: "Ingen",
    tilrettelegging: "Ingen",
    startDato: "2019-03-25",
    arbeidstreningLengde: 2,
    arbeidstreningStillingprosent: 100,
    maal: [
      {
        id: "d16350f6-27ea-49b3-9fbc-25fcee0dd080",
        opprettetTidspunkt: "2019-06-06T12:20:18.805",
        kategori: "Arbeidserfaring",
        beskrivelse: "Sette sjøbein."
      }
    ],
    oppgaver: [
      {
        id: "76a83e6d-e668-4073-a1ac-88885ae4df90",
        opprettetTidspunkt: "2019-06-06T12:20:18.805",
        tittel: "Fiskemann",
        beskrivelse: "Trekke opp garn. Pilking.",
        opplaering: "Opplæring underveis."
      }
    ],
    godkjentAvDeltaker: false,
    godkjentAvArbeidsgiver: false,
    godkjentAvVeileder: false,
    erLaast: false,
    status: "Mangler godkjenning"
  },
  {
    deltakerFnr: "01093434109",
    bedriftNr: "222222222",
    veilederNavIdent: "X123456",
    opprettetTidspunkt: "2019-06-06T12:20:18.805",
    id: "5ae3be81-abcd-477e-a8f3-4a5eb5fe91e3",
    versjon: 7,
    deltakerFornavn: "Dagny",
    deltakerEtternavn: "Deltaker",
    bedriftNavn: "Pers butikk",
    arbeidsgiverFornavn: "Per",
    arbeidsgiverEtternavn: "Kremmer",
    arbeidsgiverTlf: "22334455",
    veilederFornavn: "Vera",
    veilederEtternavn: "Veileder",
    veilederTlf: "33445566",
    oppfolging: "Telefon hver uke",
    tilrettelegging: "Ingen",
    startDato: "2019-03-25",
    arbeidstreningLengde: 2,
    arbeidstreningStillingprosent: 100,
    maal: [
      {
        id: "e16350f6-27ea-49b3-9fbc-25fcee0dd080",
        opprettetTidspunkt: "2019-06-06T12:20:18.805",
        kategori: "Arbeidserfaring",
        beskrivelse: "Lære butikkarbeid"
      }
    ],
    oppgaver: [
      {
        id: "86a83e6d-e668-4073-a1ac-88885ae4df90",
        opprettetTidspunkt: "2019-06-06T12:20:18.805",
        tittel: "Lager",
        beskrivelse: "Rydde på lageret",
        opplaering: "Ryddekurs"
      }
    ],
    godkjentAvDeltaker: false,
    godkjentAvArbeidsgiver: false,
    godkjentAvVeileder: false,
    erLaast: false,
    status: "Mangler godkjenning"
  }
]);