/** CV no idioma do site: PT quando o site está em português, EN nos outros casos. */
export const cvFor = (language: string) => ({
  href: language === 'pt' ? '/CV_Mauro_Bernardo_Zibane_PT.pdf' : '/CV_Mauro_Bernardo_Zibane_EN.pdf',
  file: language === 'pt' ? 'CV_Mauro_Bernardo_Zibane_PT.pdf' : 'CV_Mauro_Bernardo_Zibane_EN.pdf',
});
