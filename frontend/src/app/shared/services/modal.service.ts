import { inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { AlertComponent } from '../components/alert/alert.component';

export type ModalAlert = 'confirm' | 'error' | 'success';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly dialog = inject(Dialog);

  open(content: any, config = {}): void {
    this.dialog.open(content, config);
  }

  alert(title: string, message: string, type = 'success' as ModalAlert): void {
    const data = {
      type,
      title,
      message,
    };

    this.open(AlertComponent, { data });
  }

  close(): void {
    this.dialog.closeAll();
  }
}
