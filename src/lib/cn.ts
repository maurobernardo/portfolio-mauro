/** Junta classes (usado pelos ícones animados). */
export const cn = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');
