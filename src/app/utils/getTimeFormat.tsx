export const getTimeFormat = (
  numberTime: number,
  type: "hours" | "minutes" | "all" | "date"
) => {
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  if (type == "hours") {
    return dateFormatter
      .format(numberTime)
      .split(" ")[1]
      .split(":")
      .splice(0, 2)
      .join(":");
  } else if (type == "minutes") {
    return dateFormatter
      .format(numberTime)
      .split(" ")[1]
      .split(":")
      .splice(1, 2)
      .join(":");
  } else if (type == "all") {
    return dateFormatter.format(numberTime).split(" ")[1];
  } else if (type == "date") {
    return dateFormatter.format(numberTime);
  }
};

export function formatMilliseconds(ms: number) {
  // 1. Converta milissegundos em segundos, minutos e horas
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  // 2. Formate para ter dois dígitos, se necessário
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  // 3. Retorne o formato "hh:mm:ss"
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
