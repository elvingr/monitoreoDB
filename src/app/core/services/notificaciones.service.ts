
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../interfaces/notificaciones';



@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private counter = 0;

  show(message: string, type: Notification['type'] = 'info', duration = 3000) {
    const id = ++this.counter;
    const notif: Notification = { id, message, type, duration };
    const current = this.notificationsSubject.getValue();
    this.notificationsSubject.next([...current, notif]);

    if (type !== 'decision') {
      setTimeout(() => this.remove(id), duration);
    }
  }

  decision(message: string, callback: (response: boolean) => void) {
    const id = ++this.counter;

    // 🔹 Eliminar cualquier decisión previa
    const current = this.notificationsSubject.getValue()
      .filter(n => n.type !== 'decision');

    const notif: Notification = { id, message, type: 'decision', callback };

    // 🔹 Agregar solo la nueva decisión
    this.notificationsSubject.next([...current, notif]);
  }


  respond(id: number, response: boolean) {
    const current = this.notificationsSubject.getValue();
    const notif = current.find(n => n.id === id);
    if (notif?.callback) notif.callback(response);
    this.remove(id);
  }

  remove(id: number) {
    const current = this.notificationsSubject.getValue();
    this.notificationsSubject.next(current.filter(n => n.id !== id));
  }
}
