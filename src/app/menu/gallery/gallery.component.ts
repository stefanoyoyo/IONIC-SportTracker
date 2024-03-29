import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GalleryService } from 'src/services/App/Gallery/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {

  constructor(private router: Router,
    private componentService: GalleryService) { }

  ngOnInit() {}

  // #region methods

  /**Method to scroll the page at the specified element in the page */
  smoothScroll(id: number) {
    const el: HTMLElement = document.getElementById(`gallery-photo-${id}`)
    el.scrollIntoView({behavior: 'smooth'}); 
  }

  photoInfo(photoInfo: string) {
    // Getting the only numbers from the string
    const valid = Number(photoInfo.replace(/\D/g, ""));
    const date: Date = new Date(valid);
    const format = `${date.toLocaleDateString("it-IT")} ${date.toLocaleTimeString("it-IT")}`;
    return format;
  }

  // #endregion

}
