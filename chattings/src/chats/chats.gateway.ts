import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor() {
    this.logger.log('constructor');
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    // 데코레이터로 인자를 받는다
    this.logger.log(`disconnected : ${socket.id} ${socket.nsp.name}`); // nsp: namespace
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`); // nsp: namespace
  }

  afterInit() {
    this.logger.log('init');
  }
  @SubscribeMessage('new_user') // 데코레이터가 on으로 해당 이벤트의 메세지를 받음
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(username);
    console.log(username);
    // socket.emit('hello_user', 'hello ' + username);
    // username을 db에 적재
    socket.broadcast.emit('user_connected', username);
    return username;
  }
}
