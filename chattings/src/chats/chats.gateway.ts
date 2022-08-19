import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatsGateway {
  @SubscribeMessage('new_user') // 데코레이터가 on으로 해당 이벤트의 메세지를 받음
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(username);
    console.log(username);
    socket.emit('hello_user', 'hello ' + username);
    return 'hello world';
  }
}
