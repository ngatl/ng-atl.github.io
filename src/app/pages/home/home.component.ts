import { Component, OnInit } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { SpeakersService } from '../../speakers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
  community: Array<any>;
  sponsors: Array<any>;
  signup = {
    FNAME: '',
    LNAME: '',
    EMAIL: '',
    b_0b058da04fc0ba7ae956cb672_b623efabaf: ''
  };
  mcSubmitted: boolean = false;
  showMCSubmit: boolean = true;
  message: string = '';

  constructor(private jsonp: Jsonp) {
  }

  submitMailChimp() {
    this.mcSubmitted = true;
    event.preventDefault();
    this.jsonp.get(
      `http://ng-atl.us15.list-manage.com/subscribe/post-json?u=0b058da04fc0ba7ae956cb672&amp;id=b623efabaf&subscribe=Subscribe&EMAIL=${this.signup.EMAIL}&FNAME=${this.signup.FNAME}&LNAME=${this.signup.LNAME}&b_0b058da04fc0ba7ae956cb672_b623efabaf=${this.signup.b_0b058da04fc0ba7ae956cb672_b623efabaf}&c=JSONP_CALLBACK`)
      .map((response: Response) => response.json())
      .subscribe((mcResult: MailChimpResult) => {
        this.showMCSubmit = false;
        if (mcResult.result === 'error') {
          if (mcResult.msg.indexOf('already subscribed') > -1) {
            this.message = 'You\'ve already subscribed. Please check your email.';
          }
        } else {
          if (mcResult.msg.indexOf('Almost finished') > -1) {
            this.message = 'See you soon! Please make sure to verify your email!';
          }
        }
      });
  }

  ngOnInit() {
    this.sponsors = [
      {name: 'ADP', level: 'Gold', image: '/sponsors/adp_logo.svg'},
      {name: 'GitHub', level: 'Diversity Supporter', image: '/sponsors/GitHub_Logo.png'},
      {name: 'Robert Half Technology', level: 'Silver', image: '/sponsors/robert-half.gif'},
      {name: 'TSYS', level: 'Silver', image: '/sponsors/tsys.svg'},
      {name: 'Progress', level: 'Gold', image: '/sponsors/progress.png'},
      {name: 'Valor Software', level: 'Gold', image: '/sponsors/valor_software.png'}

    ].sort(SpeakersService.sorting);
    this.community = [
      {
        name: 'AngularAir',
        logo: '/community/ng-air-logo-light.png',
        link: 'https://angularair.com/',
      },
      {
        name: 'ngGirls',
        logo: '/community/ngGirls.png',
        link: 'http://ng-girls.org/',
      },
      {
        name: 'Vets Who Code',
        logo: '/community/VetsWhoCode.jpg',
        link: 'http://vetswhocode.io/',
      },
      {
        name: 'Atlanta JavaScript Meetup',
        logo: '/community/AtlJS.png',
        link: 'https://www.meetup.com/AtlantaJavaScript/',
      },
      {
        name: 'Women Who Code, Atlanta',
        logo: '/community/WomenWhoCode.jpg',
        link: 'https://www.meetup.com/Women-Who-Code-Atlanta/',
      },
      {
        name: 'ATL-Angular',
        logo: '/community/AtlAngular.jpg',
        link: 'https://www.meetup.com/ATL-Angular/',
      },
      {
        name: 'Front End Happy Hour',
        logo: '/community/front-end-happy-hour.png',
        link: 'http://frontendhappyhour.com/',
      }
    ].sort(SpeakersService.sorting)
  }

}

export interface MailChimpResult {
  result: string;
  msg: string;
}
