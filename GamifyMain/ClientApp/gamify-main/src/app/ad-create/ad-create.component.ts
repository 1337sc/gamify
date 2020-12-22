import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertisement } from '../advertisement';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.scss'],
})
export class AdCreateComponent implements OnInit {
  currentAd = new Advertisement(0, 0, "");
  currentPlaceId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {
    this.currentPlaceId = Number.parseInt(
      this.activatedRoute.snapshot.params['id']
    );
  }

  ngOnInit(): void {}

  save() {
    this.currentAd.placeId = this.currentPlaceId;
    this.currentAd.id = 0;
    this.dataService
      .createAdvertisement(this.currentAd)
      .subscribe(() =>
        this.router.navigateByUrl('/placeAbout/' + this.currentPlaceId)
      );
  }
}
