import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const distanceFromNow = (date: Date) => {
    return formatDistance(date, new Date(), { addSuffix: true, locale: ptBR });
};

export { distanceFromNow };
