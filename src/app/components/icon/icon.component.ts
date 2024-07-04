import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

const svgsCache = new Map<string, string>();
const requests = new Map<string, Promise<void>>();
const parser = new DOMParser();

@Component({
  standalone: true,
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styles: [':host { display: inline } '],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe],
})
export class IconComponent implements OnInit {
  @Input() name!: string;

  svgData$ = new BehaviorSubject<SafeHtml | null>(null);

  constructor(private _sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this._initSvg();
  }

  private _initSvg(): void {
    const url = `../../../assets/icons/${this.name}.svg`;

    if (svgsCache.has(url)) {
      this.svgData$.next(
        this._sanitizer.bypassSecurityTrustHtml(svgsCache.get(url) as string)
      );
    } else {
      this._loadAsyncSvg(url).then(() =>
        this.svgData$.next(
          this._sanitizer.bypassSecurityTrustHtml(svgsCache.get(url) || '')
        )
      );
    }
  }

  private _loadAsyncSvg(url: string): Promise<void> {
    let req = requests.get(url);

    if (!req) {
      req = this._fetchSvgData(url);
      requests.set(url, req);
    }

    return req;
  }

  private async _fetchSvgData(url: string): Promise<void> {
    try {
      const svgData = await fetch(url).then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw Error(`Missing icon at ${url}`);
      });

      svgsCache.set(url, this._parseSvgData(svgData));
    } catch (err) {
      console.log(err);
    }
  }

  private _parseSvgData(svgData: string): string {
    const parsedSvgData = parser.parseFromString(svgData, 'text/html');
    const svg = parsedSvgData.querySelector('svg');

    if (svg) {
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');

      return svg.outerHTML;
    }

    return '';
  }
}
