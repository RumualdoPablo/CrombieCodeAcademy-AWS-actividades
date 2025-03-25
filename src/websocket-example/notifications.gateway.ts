import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) // Marca la clase como un gateway WebSocket.
export class NotificationsGateway {
  @WebSocketServer() // Referencia al servidor WebSocket.
  server: Server;

  @SubscribeMessage('message') // Maneja mensajes desde el cliente.
  handleMessage(@MessageBody() message: string): void {
    console.log('Mensaje recibido:', message);
    this.server.emit('message', `Servidor responde: ${message}`); // Envía eventos a todos los clientes conectados.
  }

  @SubscribeMessage('stockUpdate') // Maneja mensajes desde el cliente.
  handleStockMessage(@MessageBody() message: string): void {
    console.log('Mensaje de stock recibido:', message);
    this.server.emit('message', `Servidor responde: ${message}`); // Envía eventos a todos los clientes conectados.
  }

  notifyStockChange(productId: string, stock: number) {
    this.server.emit('stockUpdate', { productId, stock });
  }
}
