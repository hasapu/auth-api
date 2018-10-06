/*
 - this module for add your customize .svg icon
 - add your customize .svg icon to assets folder
*/

import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@NgModule({
})

export class IconsModule {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('presentation',sanitizer.bypassSecurityTrustResourceUrl('assets/presentation.svg'));
    iconRegistry.addSvgIcon('folder',sanitizer.bypassSecurityTrustResourceUrl('assets/folder.svg'));
    iconRegistry.addSvgIcon('menu',sanitizer.bypassSecurityTrustResourceUrl('assets/menu.svg'));
    iconRegistry.addSvgIcon('clipboard',sanitizer.bypassSecurityTrustResourceUrl('assets/clipboard.svg'));
    iconRegistry.addSvgIcon('settings',sanitizer.bypassSecurityTrustResourceUrl('assets/settings.svg'));
    iconRegistry.addSvgIcon('get-money',sanitizer.bypassSecurityTrustResourceUrl('assets/get-money.svg'));
    iconRegistry.addSvgIcon('megaphone',sanitizer.bypassSecurityTrustResourceUrl('assets/megaphone.svg'));
    iconRegistry.addSvgIcon('loan',sanitizer.bypassSecurityTrustResourceUrl('assets/loan.svg'));
  }
}

