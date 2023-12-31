interface Resource {
  type: string;
  name: string;
  url: string;
  caption: string;
}

const resources: Resource[] = [
  {
    type: 'Library',
    name: "Barnard's Zines Library",
    url: 'https://zines.barnard.edu/',
    caption: "Barnard's zines reflect the Barnard College student population with regard to gender.",
  },
  {
    type: 'Workshop;Letterpress',
    name: "Albertine Press",
    url: 'https://albertinepress.com/',
    caption: "Albertine Press was conceived in 2005 by Shelley Barandes, a sometime-architect and paper fanatic with connections to printing that run deep.",
  },
  {
    type: 'Library',
    name: "Center for Book Arts",
    url: 'https://centerforbookarts.org/',
    caption: "Center for Book Arts promotes active explorations of artistic practices related to the BOOK as ART. As the oldest nonprofit dedicated to uplifting the book arts, we support the field through education, preservation, exhibitions, studio access, and community building.",
  },
  {
    type: 'Library',
    name: "Thomas J. Watson Library",
    url: 'https://library.metmuseum.org/search~S1?/jArtists%27+books./jartists+books/-3,-1,0,B/browse',
    caption: "Thomas J. Watson Library is The Met's research library with collection of more than one million volumes, extensive digital collections, and online resources.",
  },
  {
    type: 'Workshop;Letterpress',
    name: "Spudnik Press",
    url: 'https://www.spudnikpress.org/',
    caption: "Through collaboration, education, and access to professional equipment, Spudnik creates an environment that welcomes individuals from all backgrounds into the studio.",
  },
];

export default resources;