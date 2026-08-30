import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-logged-in-functionality',
  templateUrl: './logged-in-functionality.component.html',
  styleUrls: ['./logged-in-functionality.component.css'],
})
export class LoggedInFunctionalityComponent {
  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  logout(): void {
    this.closeDropdown();

    console.log('Logout clicked');

    // Later connect this to your AuthService
    // this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.profile-dropdown')) {
      this.isDropdownOpen = false;
    }
  }
}
