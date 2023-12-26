import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  progressBar = new EventEmitter<boolean>();

  public showLoad(show: boolean): void {
    this.progressBar.emit(show)
  }
}
