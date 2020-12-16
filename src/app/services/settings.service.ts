import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/blue.css';
    this.linkTheme.setAttribute('href',url);
   }

  changeTheme(theme:string, links:NodeListOf<Element>){
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href',url);
    localStorage.setItem('theme',url);
    this.checkCurrentTheme(links);
  }

  checkCurrentTheme(links:NodeListOf<Element>){
    links.forEach((element)=>{
      element.classList.remove('working');
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    })
  }

  checkTheme():string{
    let url = this.linkTheme.getAttribute('href').split('/');
    return url[url.length-1];
  }
}



