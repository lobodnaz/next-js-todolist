import { format, parseISO } from "date-fns";

interface Props {
  dateTimeString: string;
}

const DateTime = ({ dateTimeString }: Props) => {
  const dateTime = parseISO(dateTimeString);
  return (
    <time dateTime={dateTimeString}>
      {format(dateTime, "dd MMM yyyy HH:mm")}
    </time>
  );
};

export default DateTime;
