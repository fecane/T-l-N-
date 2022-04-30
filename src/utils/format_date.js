const DATE_FORMAT_OPTS = { year: "numeric", month: "long", day: "numeric" };

export function toFormatDate(date) {
  // Ensure the ISO date string is treated in the Eastern Standard Timezone
  return new Date(date + "T00:00:00-05:00").toLocaleDateString(
    "fr-CA",
    DATE_FORMAT_OPTS
  );
}
