import React from 'react';
import Modal from 'nav-frontend-modal';
import { infoOmNærmesteLederURL } from '../../../../lenker';
import informasjonsikon from './informasjonsikon.svg';
import NyFaneIkon from '../TjenesteInfo/NyFaneIkon';
import './SyfoBeOmTilgangModalBoks.less';
import { LenkeMedLogging } from '../../../../GeneriskeElementer/LenkeMedLogging';
import {BodyLong, Heading} from "@navikt/ds-react";

interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
}

const SyfoBeOmTilgangModalBoks = ({ isOpen, onRequestClose }: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            closeButton={true}
            contentLabel="digitale sykmeldinger-modal"
            className="syfo-modal"
            appElement={document.getElementById("root") ?? undefined}
        >
            <div className="syfo-modal__innhold">
                <div className="syfo-modal__overskrift-og-info">
                    <img src={informasjonsikon} alt="" className="infoikon" />
                    <Heading size="small" level="2" className="syfo-modal__tittel">
                        Tilgang til dine sykmeldte
                    </Heading>
                </div>

                <div className="syfo-modal__personvern-info">
                    <BodyLong className="syfo-modal__tekst">
                        For å bruke denne tjennesten må du være registrert som nærmeste leder for én
                        eller flere ansatte. Tilgangsstyringen skiller seg fra våre andre tjenester
                        ved at den ikke baserer seg på hvilken virksomhet du har valgt i menyen, men
                        kun baserer seg på om du er nærmeste leder eller ikke.
                    </BodyLong>

                    <LenkeMedLogging
                        loggLenketekst="Be om tilgang - Les om hvordan nærmeste leder registreres"
                        className="syfo-modal__lenke"
                        href={infoOmNærmesteLederURL}
                        target="_blank"
                    >
                        <span>Les om hvordan nærmeste leder registreres</span>
                        <NyFaneIkon />
                    </LenkeMedLogging>
                </div>
            </div>
        </Modal>
    );
};

export default SyfoBeOmTilgangModalBoks;
