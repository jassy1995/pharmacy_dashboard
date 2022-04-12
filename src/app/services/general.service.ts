import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {
  }

  notify(type: string, message: string) {
    // @ts-ignore
    this.toastr[type](message);
  }

  formatCurrency(value: string) {
    return `₦${ parseFloat(value).toLocaleString() }`;
  }

  copyLink(link: string) {
    const input = document.createElement('input');
    input.value = link;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand('copy');
    this.notify('success', 'Link copied to clipboard');
    input.remove();
  }

  async navigateTo(page: any) {
    await this.router.navigate([page]);
  }
}
