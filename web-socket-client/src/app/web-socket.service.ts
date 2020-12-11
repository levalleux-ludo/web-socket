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
  public connect(ws_url: string): Observable<void> {
    return new Observable(observer => {
      try {
        this.ws = new WebSocket(ws_url);
        this.ws.onmessage = ({data}: any) => {
          this.onMessage.next(JSON.parse(data).message as string);
        }
        this.ws.onclose = (e) => {
          // this.onMessage.complete();
          if (e.code !== 1000) {
            observer.error(`Connection to ${(e.currentTarget as any).url} failed with code ${e.code}`);
          }
        }
        this.ws.onopen = () => {
          observer.next();
          observer.complete();
        }
        this.ws.onerror = (e) => {
          // this.onMessage.error(e);
        }
      } catch(e) {
        this.onMessage.error(e);
      }
    })
  }
  public disconnect(): Observable<void> {
    return new Observable(observer => {
      if (this.ws) {
        this.ws.close(1000);
        this.ws = undefined;
      }
      observer.next();
      observer.complete();
    })
  }
}
