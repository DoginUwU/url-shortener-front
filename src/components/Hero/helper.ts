import * as yup from 'yup';
import { URL_REGEX_VALIDATE } from '../../constants/regex';

const schema = yup.object({
    url: yup.string().required().trim().matches(URL_REGEX_VALIDATE),
    limit: yup
        .number()
        .min(0)
        .integer()
        .max(100)
        .transform((value) => (isNaN(value) || value === 0 ? undefined : value)),
    password: yup
        .string()
        .trim()
        .transform((value) => (value.length > 0 ? value : undefined)),
    category: yup
        .string()
        .trim()
        .transform((value) => (value.length > 0 ? value : undefined)),
});

export { schema };
