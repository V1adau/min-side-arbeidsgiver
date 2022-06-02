module.exports = {
    mock: (app) => {
        app.use(
            '/min-side-arbeidsgiver/api/narmesteleder/virksomheter', (req, res) => {
                res.send([
                    {
                        OrganizationNumber: "974491850",
                        Name: "Gunnars bakeri Storgata",
                        Type: "Business",
                        ParentOrganizationNumber: "982033268",
                        OrganizationForm: "BEDR",
                        Status: "Active",
                    },
                    {
                        OrganizationNumber: "999999999",
                        Name: "Saltrød og Høneby",
                        Type: "Business",
                        ParentOrganizationNumber: "910825555",
                        OrganizationForm: "BEDR",
                        Status: "Active",
                    },
                ])
            }
        );
        app.use(
            '/min-side-arbeidsgiver/api/narmesteleder', (req, res) => {
                res.send({ tilgang: true })
            }
        );
    }
}
