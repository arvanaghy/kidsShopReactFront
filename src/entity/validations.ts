import { searchPattern } from "@entity/pattern";

export const validateSearch = (search: string) => search?.match(searchPattern);
