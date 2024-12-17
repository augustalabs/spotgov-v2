export const formatLink = (link: string) => {
    if (link.includes('vortal')) return 'Vortal';
    if (link.includes('anogov')) return 'Anogov';
    if (link.includes('acingov')) return 'Acingov';
    if (link.includes('diariodarepublica')) return 'Diário da República';

    const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/;
    const match = link.match(domainRegex);
  
    if (match && match[1]) {
      return match[1].split('.')[0];
    }
  
    return '';
};