import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState
} from "react";
import { Normaltekst, Systemtittel, Ingress } from "nav-frontend-typografi";
import { OrganisasjonsDetaljerContext } from "../../OrganisasjonDetaljerProvider";
import {
  hentOverordnetEnhet,
  hentUnderenhet
} from "../../api/enhetsregisteretApi";
import {
  tomEnhetsregOrg,
  EnhetsregisteretOrg
} from "../../enhetsregisteretOrg";
import "./InformasjonOmBedrift.less";
import Lenke from "nav-frontend-lenker";
import Tekstboks from "./Tekstboks/Tekstboks";
import { basename } from "../../paths";

const InformasjonOmBedrift: FunctionComponent = () => {
  const { valgtOrganisasjon } = useContext(OrganisasjonsDetaljerContext);
  const [underenhet, setUnderenhet] = useState<EnhetsregisteretOrg>(
    tomEnhetsregOrg
  );
  const [overordnetEnhet, setOverordnetEnhet] = useState<EnhetsregisteretOrg>(
    tomEnhetsregOrg
  );
  const orgnr = valgtOrganisasjon.OrganizationNumber;
  useEffect(() => {
    const setEnheter = async () => {
      if (orgnr !== "") {
        setUnderenhet(await hentUnderenhet(orgnr));
        setOverordnetEnhet(
          await hentOverordnetEnhet(underenhet.overordnetEnhet)
        );
      }
    };
    setEnheter();
  }, [orgnr, underenhet.overordnetEnhet]);

  return (
    <>
      <Lenke
        className={"tilbake-til-forsiden"}
        href={basename + "/" + valgtOrganisasjon.OrganizationNumber + "/"}
      >
        Tilbake til forsiden
      </Lenke>
      <div className="informasjon-om-bedrift">
        {underenhet !== tomEnhetsregOrg && (
          <div className={"informasjon-om-bedrift__tekstomrade"}>
            <Systemtittel>{underenhet.navn}</Systemtittel>
            <br />
            {underenhet.organisasjonsnummer && (
              <Tekstboks>
                <Normaltekst>Organisasjonsnummer</Normaltekst>
                <Ingress> {underenhet.organisasjonsnummer}</Ingress>
              </Tekstboks>
            )}
            {underenhet.overordnetEnhet && (
              <Tekstboks>
                <Normaltekst>Overordnet enhet</Normaltekst>
                <Ingress> {overordnetEnhet.navn}</Ingress>
              </Tekstboks>
            )}
            {underenhet.forretningsadresse && (
              <Tekstboks>
                <Normaltekst>Forretningsadresse</Normaltekst>
                <Ingress> {underenhet.forretningsadresse.adresse[0]}</Ingress>
                <Ingress>
                  {underenhet.forretningsadresse.postnummer +
                    " " +
                    underenhet.forretningsadresse.poststed}
                </Ingress>
              </Tekstboks>
            )}
            <Tekstboks>
              <Normaltekst className={"informasjon-om-bedrift__naeringskoder"}>
                Næringskoder
              </Normaltekst>
              {underenhet.naeringskode1 && (
                <Ingress>
                  {underenhet.naeringskode1.kode +
                    ". " +
                    underenhet.naeringskode1.beskrivelse}
                </Ingress>
              )}
              {underenhet.naeringskode2 && (
                <Ingress>
                  {underenhet.naeringskode2.kode +
                    ". " +
                    underenhet.naeringskode2.beskrivelse}
                </Ingress>
              )}
              {underenhet.naeringskode3 && (
                <Ingress>
                  {underenhet.naeringskode3.kode +
                    ". " +
                    underenhet.naeringskode3.beskrivelse}
                </Ingress>
              )}
            </Tekstboks>
            {underenhet.hjemmeside && (
              <Tekstboks>
                <Normaltekst>Hjemmeside</Normaltekst>
                <Lenke href={underenhet.hjemmeside}>
                  {underenhet.hjemmeside}
                </Lenke>
                <br />
              </Tekstboks>
            )}

            {underenhet.organisasjonsform && (
              <Tekstboks>
                <Normaltekst>Organisasjonsform </Normaltekst>
                <Ingress>
                  {underenhet.organisasjonsform.beskrivelse +
                    " " +
                    "(" +
                    underenhet.organisasjonsform.kode +
                    ")"}
                </Ingress>
              </Tekstboks>
            )}
            {underenhet.postadresse && (
              <Tekstboks>
                <Normaltekst>Postadresse</Normaltekst>
                <Ingress>{underenhet.postadresse.adresse[0]}</Ingress>
                <Ingress>
                  {underenhet.postadresse.postnummer +
                    " " +
                    underenhet.postadresse.poststed}
                </Ingress>
              </Tekstboks>
            )}
          </div>
        )}
        {underenhet === tomEnhetsregOrg && (
          <div> Kunne ikke hente informasjon</div>
        )}
      </div>
    </>
  );
};

export default InformasjonOmBedrift;
