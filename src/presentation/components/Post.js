import { Card, CardContent, Divider, Typography } from "@mui/material";

const history = [
    {
        "year": "1977",
        "events": [
            "Opens made-to-measure studio in Vienna.",
        ]
    },
    {
        "year": "1980-84",
        "events": [
            "Development of signature collections and made-to-measure service in Vienna.",
        ]
    },
    {
        "year": "1986",
        "events": [
            `First presentation in Paris. Shown off the Paris fashion calendar as part of the exhibition "Vienne 1880-1939: L'Apocalypse Joyeuse" at The Centre National d'Art et de Culture Georges Pompidou.`,
        ]
    },
    {
        "year": "1987",
        "events": [
            "Introduction of the first Helmut Lang Men's collection. Women and Men's collections are shown together on the Paris fashion calendar. Men's silhouette marked the return of the narrow and tailored suit shown with the white shirt, black tie, and made-to-measure shoes."
        ]
    },
    {
        "year": "1988",
        "events": [
            "Rejects the structure of the traditional fashion show. Introduces the concept of “Séance de Travail.”"
        ]
    },
    {
        "year": "1990",
        "events": [
            "Introduces layering of transparent fabrics in new materials and textures. New approach towards the treatment of these.",
            "Introduction of Helmut Lang footwear"
        ]
    },
    {
        "year": "1991",
        "events": [
            "Introduces wet looks, thermal fabrics, paper dresses and Native American influences."
        ]
    },
    {
        "year": "1992",
        "events": [
            "Introduces extremely shiny fabrics and textures. Thermal leathers, technical fabrics, padded clothing and body-conscious shapes."
        ]
    },
    {
        "year": "1993",
        "events": [
            "A/W '93-'94. Street style / haute couture presented in wool knits, pure cashmere and velvet. Trademark slit and slashed sleeves first introduced.",
            "S/S '94. Introduces cuffed pants, holographic fabrics, holographic sterling silver jeans, lacquered silks, phantom prints, apron dresses, colored tuxedo stripes, stretch daytime smoking coats, raw denim and customized silk dresses. Introduces hand-sprayed shoes and customized dancing shoes.",
            "First separate Men's presentation. Men's S/S '94 shown as part of the Paris fashion calendar.",
            "Begins collaboration with Juergen Teller on backstage documentation and advertising.",
            "Lang accepted a professorship at 'Modeklasse', the famous department of fashion design at the University of Applied Arts Vienna."
        ]
    },
    {
        "year": "1994",
        "events": [
            "A/W '94-'95. Latex-bounded lace, lacquered silks, smoking coats and suits, nylon veil dresses, airbrushed silks and slash geometric patterns on candy-colored fabrics. Introduced reflective fabrics and nude as staple color.",
            "First show presented at 17 Rue Commines.",
            `S/S '95. "Hawaiian techno,” high-tech and air-tech. New nylon fabrics introduced.`
        ]
    },
    {
        "year": "1995",
        "events": [
            "A/W '95-'96. “Couture customized”, camel and tweeds, bra holsters, chiffon and faille. Introduces two-color bloc paneling.",
            "Introduction of Helmut Lang underwear.",
            `S/S '96. New take on lace for men and women, delicate materials, electro vibe, visible bras, apron belts and contrast layering.`
        ]
    },
    {
        "year": "1996",
        "events": [
            "A/W '96-'97. Techno jungle, covered sequins, floral patterns, cargo styles, Japanese Obi style tops and evening dresses. Introduces signature uniform outerwear. Presented with gold blanked covered audience."
        ]
    },
    {
        "year": "1997",
        "events": [
            "A/W '97-'98. Shift toward luxury with the use of classic and pure materials. Reintroduction of fine cashmeres, blended wools and silks. Introduction of funnel neck coats and pleated skirts. Silk tulle, cummerbunds and silk down coated duvet wraps. Definition of new Helmut Lang style with made-to-measure finishing."
        ]
    },
    {
        "year": "1998",
        "events": [
            "Relocates company from Vienna to New York. First fashion house to make a transcontinental move."
        ]
    },
    {
        "year": "1999",
        "events": [
            "A/W '99-'00. Introduction of interior strap extensions. Introduction of shearing and colored leathers. Pure sterling silver fabrics and anti-stress materials. Introduction of the neck-rest."
        ]
    },
    {
        "year": "2000",
        "events": [
            "A/W '00-'01. Monochromatic uniforms."
        ]
    },
    {
        "year": "2001",
        "events": [
            "A/W '01-'02. Opaque and sheer contrasts, luxury materials, organza and leather trim details."
        ]
    },
    {
        "year": "2002",
        "events": [
            "A/W '02-'03. Structured layering, re-worked fisherman knits, monochromatic and metal blocks, combined scarf-tops and further incorporation of movement."
        ]
    },
    {
        "year": "2003",
        "events": [
            "A/W '03-'04. “Urban Warrior” vernacular, aviation fragmented pieces, magnetic flaps, petaled organza, layering as clothing extension, interchangeable and modular pieces, one leg smoking chap and parachute holsters. Introduction of chaps for men and women. Introduction of cashmere and fleece fused material."
        ]
    },
    {
        "year": "2004",
        "events": [
            "A/W 04-05. Eastern European influences, colored shearing, horsehair, copper leather, Hungarian pleats, French maid look, cummerbund tops, drapée holsters, skirt capes, French lace and Russian bark pattern. Introduction of made-to-measure evening dresses."
        ]
    },
]

export const Post = (props) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h4">Helmut Lang</Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary" component="span" >an ode to industrial minimalism</Typography>

                {history.map(event => {
                    return (
                        <>
                            <Divider></Divider>
                            <Typography sx={{ fontSize: 16, fontWeight: "bold" }} component="span" mr="30px" >{event.year}</Typography>
                            {event.events.map(event => {
                                return (
                                    <Typography sx={{ fontSize: 16, maxWidth: "250px", display: "inline-block" }} mr="20px" >{event}</Typography>
                                );
                            })}
                        </>
                    );
                })}
            </CardContent>
        </Card>
    );
}