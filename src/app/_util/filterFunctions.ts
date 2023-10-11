import { COUNTRY_CODES } from "./model/data-helper";

export const filterCountry = (input: string): string => {
    for (const key in COUNTRY_CODES) {
        if (COUNTRY_CODES[key as keyof typeof COUNTRY_CODES].toLowerCase().search(input.toLowerCase()) > -1) {
            return key;
        }
    }
    return '';
};
