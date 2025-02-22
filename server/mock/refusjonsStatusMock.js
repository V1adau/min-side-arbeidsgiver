export const mock = (app) => {
    app.use(
        '/min-side-arbeidsgiver/api/refusjon_status', (req, res) => {
            res.send([
                {
                    virksomhetsnummer: "999999999",
                    statusoversikt: {
                        "KLAR_FOR_INNSENDING": 3,
                        "FOR_TIDLIG": 1,
                    },
                    tilgang: true,
                },
                {
                    virksomhetsnummer: "121488424",
                    statusoversikt: {
                        "KLAR_FOR_INNSENDING": 1,
                        "FOR_TIDLIG": 2,
                    },
                    tilgang: true,
                },
                {
                    virksomhetsnummer: "182345674",
                    statusoversikt: {
                        "FOR_TIDLIG": 2,
                    },
                    tilgang: true,
                },
            ])
        }
    );
}