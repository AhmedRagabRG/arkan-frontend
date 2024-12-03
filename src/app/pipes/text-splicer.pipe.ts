import { Pipe } from "@angular/core";

@Pipe({
    name: "textSplicer",
    standalone: true
})
export class TextSplicerPipe {
    transform(value: string, length: number = 10): string {
        return value.length > length ? value.slice(0, length) + "..." : value;
    }
}