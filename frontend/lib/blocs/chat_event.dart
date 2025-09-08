import 'package:equatable/equatable.dart';

abstract class ChatEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class SendMessage extends ChatEvent {
  final String message;
  SendMessage(this.message);
  @override
  List<Object?> get props => [message];
}

class ReceiveChunk extends ChatEvent {
  final String chunk;
  ReceiveChunk(this.chunk);
  @override
  List<Object?> get props => [chunk];
}

class StreamComplete extends ChatEvent {}

class EndChat extends ChatEvent {
  final String fullReply;
  EndChat(this.fullReply);
}

class AttemptReconnect extends ChatEvent {}
