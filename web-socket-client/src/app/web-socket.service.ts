import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  ws: WebSocket;
  onMessage = new Subject<string>();
  onConnect = new Subject<void>();
  onDisconnect = new Subject<void>();

  constructor() { }

  public message(): Observable<string> {
    return this.onMessage.asObservable();
  }
  public connect(): Observable<void> {
    return new Observable(observer => {
      this.ws = new WebSocket(environment.ws_url);
      this.ws.onmessage = ({data}: any) => {
        this.onMessage.next(JSON.parse(data).message as string);
      }
      this.ws.onclose = () => {
        // this.onMessage.complete();
      }
      this.ws.onopen = () => {
        observer.next();
        observer.complete();
      }
    })
  }
  public disconnect(): Observable<void> {
    return new Observable(observer => {
      if (this.ws) {
        this.ws.close();
        this.ws = undefined;
      }
      observer.next();
      observer.complete();
    })
  }
}
