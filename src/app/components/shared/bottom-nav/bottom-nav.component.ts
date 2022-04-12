import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent implements OnInit {

  constructor(
    public _auth: AuthService,
    public _general: GeneralService,
  ) {
  }

  ngOnInit(): void {
  }
}
