import {DatePipe} from "@angular/common";
import {Pipe} from "@angular/core";



// Format the timestamp as a date , with fix format depending on the differentce
// between the timestamp and the current time. Only show date when it's not the same
// day , if the same day only show mediumTime instead.
@Pipe({
  name: 'timestamp'
})
export class TimestampPipe extends DatePipe {

  transform(value: string | number | Date, timezone?: string, locale?: string): string;
  transform(value: null, format?: string, timezone?: string, locale?: string): null;
  transform(value: string | number | Date, format?: string, timezone?: string, locale?: string): string;
  transform(value: unknown, format?: unknown, timezone?: unknown, locale?: unknown): string {

    const valueType = typeof value;

    let dateTime: Date;
    if (valueType === "string" || valueType === "number") {
      dateTime = new Date(value as any);
    } else if (value instanceof Date) {
      dateTime = value;
    }

    const currentTime = new Date();
    if (currentTime.getDate() !== dateTime.getDate()) {
      format = 'HH:mm:ss dd/MM';
    } else {
      if (format !== "shortTime") {
        format = 'HH:mm:ss';
      }
    }

    return super.transform(dateTime, format as string, timezone as string, locale as string);
  }

}
