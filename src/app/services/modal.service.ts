import { ComponentFactoryResolver, Inject, Injectable, Injector, TemplateRef, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../components/partial/modal/modal.component';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) { }

  open(content: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = viewContainerRef.createComponent(ModalComponent, {
      injector: this.injector,
      projectableNodes: [contentViewRef.rootNodes]
    });

    modalComponent.hostView.detectChanges();
    this.document.body.appendChild(modalComponent.location.nativeElement);
  }

}
