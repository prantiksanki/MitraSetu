import 'package:equatable/equatable.dart';
import '../models/message.dart';

abstract class ChatState extends Equatable {
  @override
  List<Object?> get props => [];
}

class ChatInitial extends ChatState {}

class ChatInProgress extends ChatState {
  final String partial;
  ChatInProgress(this.partial);
  @override
  List<Object?> get props => [partial];
}

class ChatFinished extends ChatState {
  final String fullReply;
  ChatFinished(this.fullReply);
  @override
  List<Object?> get props => [fullReply];
}

class ChatError extends ChatState {
  final String message;
  ChatError(this.message);
  @override
  List<Object?> get props => [message];
}

class ChatStreaming extends ChatState {
  final List<Message> messages;
  final String currentChunk;
  ChatStreaming(this.messages, this.currentChunk);

  @override
  List<Object?> get props => [messages, currentChunk];
}

class ChatComplete extends ChatState {
  final List<Message> messages;
  ChatComplete(this.messages);
  @override
  List<Object?> get props => [messages];
}
