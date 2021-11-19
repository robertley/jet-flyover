import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { find } from 'lodash';

@Component({
  selector: 'app-jet-flyover',
  templateUrl: './jet-flyover.component.html',
  styleUrls: ['./jet-flyover.component.scss']
})
export class JetFlyoverComponent implements OnInit, AfterViewInit {
  title = 'jet-flyover';

  jetKey: string | null;

  @ViewChild('video') video: ElementRef;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute) {

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

  specialJets: Jett[] = [
    {
      url: "https://www.youtube.com/embed/Arl2Ncrlpq4",
      options: ["start=7"],
      key: "heli"
    }
  ]

  jetToSend = -1;
  src: SafeUrl;

  ngOnInit() {
    this.jetKey = this.route.snapshot.paramMap.get('jetKey');

    let jet: Jett | undefined;

    if (this.jetKey) {
      jet = find(this.specialJets, {key: this.jetKey})
    }
    if (jet == undefined) {
      let i = this.jetToSend != -1 ? this.jetToSend : Math.floor(Math.random()*this.jetts.length);
      jet = this.jetts[i];
    }

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
  options: string[];
  key?: string;
}