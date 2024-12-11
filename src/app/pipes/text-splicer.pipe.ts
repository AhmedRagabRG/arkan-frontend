import { Pipe } from "@angular/core";

@Pipe({
    name: "textSplicer",
    standalone: true
})
export class TextSplicerPipe {
    transform(value: string | undefined | null, length: number = 10): string {
        if (!value) return "";
        return value.length > length ? value.slice(0, length) + "..." : value;
    }
}