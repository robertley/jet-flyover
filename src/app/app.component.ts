import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'jet-flyover';

  @ViewChild('video') video: ElementRef;

  constructor(private sanitizer: DomSanitizer) {

  }

  playvideo = false;
  jetts: Jett[] = [
    {
      url: "https://www.youtube.com/embed/avx1kzp6PwQ",
      options: ["start=106"]
    },
    {
      url: "https://www.youtube.com/embed/eyYS9D47jwI",
      options: ["end=14"]
    },
    {
      url: "https://www.youtube.com/embed/OdcyiXnB9p8",
      options: ["start=32", "end=39"]
    },
    {
      url: "https://www.youtube.com/embed/OdcyiXnB9p8",
      options: ["start=50", "end=61"]
    },
    {
      url: "https://www.youtube.com/embed/OdcyiXnB9p8",
      options: ["start=80", "end=108"]
    },
    {
      url: "https://www.youtube.com/embed/OdcyiXnB9p8",
      options: ["start=111", "end=126"]
    },
  ]
  jetToSend = 5;
  src: SafeUrl;

  ngOnInit() {
    let i = this.jetToSend != null ? this.jetToSend : Math.floor(Math.random()*this.jetts.length);
    let jet = this.jetts[i];
    let src = jet.url + "?autoplay=1&mute=0";
    
    for (let option of jet.options) {
      src += `&${option}`
    }

    console.log(src)

    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
  }

  ngAfterViewInit() {
    console.log(this.video)
  }

  togglePlay() {
    this.playvideo = !this.playvideo;
  }
}

export interface Jett {
  url: string;
  options: string[]
}