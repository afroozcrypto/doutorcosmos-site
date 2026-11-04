// Classes de licença das fontes. Lidas nas páginas oficiais a 2026-11-04.
// Não substitui aconselhamento jurídico.
export const LICENCES = {
  eso: { label: 'CC BY 4.0 (ESO)', url: 'https://creativecommons.org/licenses/by/4.0/', policy: 'https://www.eso.org/public/copyright/', translate: true },
  noirlab: { label: 'CC BY 4.0 (NOIRLab)', url: 'https://creativecommons.org/licenses/by/4.0/', policy: 'https://noirlab.edu/public/copyright/', translate: true },
  'esa-hubble': { label: 'CC BY 4.0 (ESA/Hubble)', url: 'https://creativecommons.org/licenses/by/4.0/', policy: 'https://esahubble.org/public/copyright/', translate: true },
  'esa-webb': { label: 'CC BY 4.0 (ESA/Webb)', url: 'https://creativecommons.org/licenses/by/4.0/', policy: 'https://esawebb.org/copyright/', translate: true },
  nasa: { label: 'NASA: em geral sem copyright nos EUA', url: null, policy: 'https://www.nasa.gov/nasa-brand-center/images-and-media/', translate: true },
  'esa-cc-by-sa-igo': { label: 'CC BY-SA 3.0 IGO (ESA)', url: 'https://creativecommons.org/licenses/by-sa/3.0/igo/', policy: 'https://open.esa.int/image-usage-creative-commons/', translate: true },
  'esa-geral': { label: '©ESA, uso educativo e informativo', url: null, policy: 'https://www.esa.int/About_Us/Law_at_ESA/Intellectual_Property_Rights/ESA_copyright_notice', translate: false },
  'aas-cc-by': { label: 'CC BY 4.0 (AAS, aceites após 11-10-2021)', url: 'https://creativecommons.org/licenses/by/4.0/', policy: null, translate: true },
  ia: { label: 'CC BY 4.0 (IA, iastro.pt)', url: 'https://creativecommons.org/licenses/by/4.0/', policy: null, translate: true },
  resumo: { label: 'Citado e resumido por palavras próprias', url: null, policy: null, translate: false },
};
export const LICENCE_KEYS = Object.keys(LICENCES);

// Licença do texto de cada post.
export const POST_LICENCES = {
  original: { label: 'Texto original do Doutor Cosmos', url: null },
  'cc-by-4.0': { label: 'Adaptação sob CC BY 4.0', url: 'https://creativecommons.org/licenses/by/4.0/' },
  'cc-by-sa-3.0-igo': { label: 'Adaptação sob CC BY-SA 3.0 IGO', url: 'https://creativecommons.org/licenses/by-sa/3.0/igo/' },
};
export const POST_LICENCE_KEYS = Object.keys(POST_LICENCES);
export const IGO_URL = 'https://creativecommons.org/licenses/by-sa/3.0/igo/';
