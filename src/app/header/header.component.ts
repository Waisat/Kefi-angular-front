import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TweenLite, TimelineMax, Linear, Back, Sine, gsap, TweenMax} from 'gsap/all'
import ScrollToPlugin from "gsap/ScrollToPlugin";
import * as CustomWiggle from 'gsap/CustomWiggle';
gsap.registerPlugin(ScrollToPlugin);
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  scrollDown = ScrollToPlugin
  heightNavBar:string = ""

  images = [
    {path: "assets/buffet.jpg"},
    {path: "assets/roof.jpg"},
    {path: "assets/cotedazur.jpg"},
    {path: "assets/stone.jpg"},
    {path: "assets/network.jpg"},
    {path: "assets/chill.jpg"}
  ]
  constructor() { }

  ngOnInit(): void {
    this.animateTitle()
   const aboutSection = this.getAboutSection()
    console.log('abouuut', aboutSection)
    const GetHeightNavBar = document.getElementsByClassName('nav_logo')[0]
    const getHeader = document.getElementsByTagName("header")[0]
    this.heightNavBar = GetHeightNavBar.clientHeight.toString() + "px"
    getHeader.style.marginTop = this.heightNavBar
    console.log('client width', getHeader)
  }

  animateTitle(){
    gsap.from("#main-slogan", {opacity:0, duration:1 ,
      ease: "bounce. out",
      y: -500
    })
    gsap.from("#reason-to-choose-us", {opacity:0, duration:1
    })
  }

  getAboutSection(){
    let aboutSection = document.getElementById("about")
    // @ts-ignore
    let position  = aboutSection.offsetTop
    console.log('do i have this ', )
    return position
  }

  clickScrollToAbout(){
    let aboutSection = document.getElementById("about")
    // @ts-ignore
    let offset = aboutSection.offsetTop
    gsap.to(window, 1,{scrollTo:{y:offset}});

  }

}
