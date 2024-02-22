import { Component } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { trigger, style, animate, transition, query, stagger, keyframes } from '@angular/animations';

@Component({
  selector: 'app-animations',
  standalone: true,
  imports: [],
  templateUrl: './animations.component.html',
  styleUrl: './animations.component.css',
  animations: [
    trigger('photosAnimation', [
      transition('* => *', [
        query('img',style({ transform: 'translateX(-100%)'})),
        query('img',
          stagger('600ms', [
            animate('900ms', style({ transform: 'translateX(0)'}))
        ]))
      ])
    ])
],

})
export class AnimationsComponent {
  constructor() { }

  items = [
    'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/640px-Flag_of_India.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/800px-Flag_of_New_Zealand.svg.png',
    'https://www.visualcapitalist.com/wp-content/uploads/2022/03/Flags-of-Countries-China.jpg',
    'https://t4.ftcdn.net/jpg/00/02/98/93/360_F_2989339_2Ho7Msl80NPQRxTzrjcdV1PvISTzMs.jpg',
    'https://www.worldatlas.com/r/w768/upload/5e/d5/75/shutterstock-172967774.jpg',
    'https://cdn.britannica.com/39/3039-004-52B064C7/Flag-Morocco.jpg',
    'https://qph.cf2.quoracdn.net/main-qimg-4837b1a0a44f0e617e5c5f4879608bf2',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_of_Myanmar.svg/800px-Flag_of_Myanmar.svg.png',

  ];

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    //Loop over all the sections and set animations
    gsap.utils.toArray("section").forEach((section: any, i) => {

      // Set the bg variable for the section
      section.bg = section.querySelector(".bg");

      // Give the backgrounds some random images
      section.bg.style.backgroundImage = `url(https://picsum.photos/${innerWidth}/${innerHeight}?random=${i})`;

      // Set the initial position for the background
      section.bg.style.backgroundPosition = `50% ${-innerHeight / 2}px`;

      // Do the parallax effect on each section
      gsap.to(section.bg, {
        backgroundPosition: `50% ${innerHeight / 2}px`,
        ease: "none", // Don't apply any easing function.
        scrollTrigger: {
          // Trigger the animation as soon as the section comes into view
          trigger: section,
          // Animate on scroll/scrub
          scrub: true
        }
      });
    });
  }
}
