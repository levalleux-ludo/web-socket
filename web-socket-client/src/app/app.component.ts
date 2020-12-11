import { environment } from './../environments/environment';
import { WebSocketService } from './web-socket.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('url', {static: false})
  url: ElementRef;
  title = 'web-socket-client';
  connecting = false;
  connected = false;
  messages = [];
  ws_url = environment.ws_url;
  editing = false;

  constructor(private webSocket: WebSocketService) {

  }
  ngOnInit(): void {
    this.webSocket.message().subscribe((message) => {
      this.messages.push(message);
    }, err => {
      this.messages.push(err);
    });
    this.connect();
  }
  connect() {
    this.connecting = true;
    this.webSocket.connect(this.ws_url).subscribe(() => {
      this.connected = true;
      this.connecting = false;
    }, (err) => {
      this.connecting = false;
      this.messages.push(err);
    })
  }
  async disconnect() {
    this.messages = [];
    return new Promise((resolve, reject) => {
      this.connecting = true;
      this.webSocket.disconnect().subscribe(() => {
        this.connected = false;
        this.connecting = false;
        resolve();
      }, err => {
        this.connecting = false;
        this.messages.push(err);
        reject(err);
      });
    });
  }

  edit() {
    this.editing = true;
  }
  cancel() {
    this.editing = false;
  }
  apply() {
    // TODO this.ws_url =....
    if (this.url) {
      this.ws_url = this.url.nativeElement.value;
      this.disconnect().then(() => {
        this.connect();
      })
    } else {
      console.error(`Input component 'url' is not defined`)
    }
    this.editing = false;
  }


}
