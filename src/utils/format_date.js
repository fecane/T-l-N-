
const DATE_FORMAT_OPTS = { year: 'numeric', month: 'long', day: 'numeric' };

export function toFormatDate(date) {
  return new Date(date).toLocaleDateString('fr-CA', DATE_FORMAT_OPTS)
}
