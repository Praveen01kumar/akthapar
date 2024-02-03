import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  menuTg: boolean = false;

  menuBar: any[] = [
    { name: "HOME", href: "home_section" },
    { name: "VIDEOS", href: "video_section" },
    { name: "ABOUT", href: "about_section" },
    { name: "PLAYLISTS", href: "plvideo_section" },
    { name: "CHANNELS", href: "channels_section" },
    { name: "CONTACT", href: "contact_section" },
  ];

  constructor() { }
  currentSectionId: string = 'home_section';
  ngOnInit(): void {
    
  }
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.scrollY+50;
    const homeOffset = document.getElementById('home_section')?.offsetTop || 0;
    const videoOffset = document.getElementById('video_section')?.offsetTop || 0;
    const aboutOffset = document.getElementById('about_section')?.offsetTop || 0;
    const playlistOffset = document.getElementById('plvideo_section')?.offsetTop || 0;
    const channelsOffset = document.getElementById('channels_section')?.offsetTop || 0;
    const contactOffset = document.getElementById('contact_section')?.offsetTop || 0;
    if (scrollPosition >= homeOffset && scrollPosition < videoOffset) {
      this.currentSectionId = 'home_section';
    } else if (scrollPosition >= videoOffset && scrollPosition < aboutOffset) {
      this.currentSectionId = 'video_section';
    } else if (scrollPosition >= aboutOffset && scrollPosition < playlistOffset) {
      this.currentSectionId = 'about_section';
    } else if (scrollPosition >= playlistOffset && scrollPosition < channelsOffset) {
      this.currentSectionId = 'plvideo_section';
    } else if (scrollPosition >= channelsOffset && scrollPosition < contactOffset) {
      this.currentSectionId = 'channels_section';
    } else if (scrollPosition >= contactOffset) {
      this.currentSectionId = 'contact_section';
    } else {
      this.currentSectionId = '';
    }
  }

  isSectionActive(sectionId: string) {
     this.currentSectionId = sectionId;
  }

  toggleMenu() { this.menuTg = !this.menuTg; }

}
