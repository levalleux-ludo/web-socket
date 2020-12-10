import { WebSocketService } from './web-socket.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web-socket-client';
  connecting = false;
  connected = false;
  messages = [];

  constructor(private webSocket: WebSocketService) {

  }
  ngOnInit(): void {
    this.webSocket.message().subscribe((message) => {
      this.messages.push(message);
    });
    this.connect();
  }
  connect() {
    this.connecting = true;
    this.webSocket.connect().subscribe(() => {
      this.connected = true;
      this.connecting = false;
    })
  }
  disconnect() {
    this.connecting = true;
    this.webSocket.disconnect().subscribe(() => {
      this.connected = false;
      this.connecting = false;
    })
  }


}
