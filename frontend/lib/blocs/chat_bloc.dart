import 'package:flutter_bloc/flutter_bloc.dart';
import 'chat_event.dart';
import 'chat_state.dart';
import '../models/message.dart';

class ChatBloc extends Bloc<ChatEvent, ChatState> {
  ChatBloc() : super(ChatInitial()) {
    on<SendMessage>(_onSendMessage);
    on<ReceiveChunk>(_onReceiveChunk);
    on<StreamComplete>(_onStreamComplete);
    on<AttemptReconnect>(_onAttemptReconnect);
  }

  void _onSendMessage(SendMessage event, Emitter<ChatState> emit) async {
    final messages = <Message>[];
    messages.add(Message(text: event.message, isUser: true));
    emit(ChatStreaming(messages, ''));

    // Actual streaming happens in UI via EventSource; UI should dispatch ReceiveChunk events
  }

  void _onReceiveChunk(ReceiveChunk event, Emitter<ChatState> emit) {
    if (state is ChatStreaming) {
      final current = state as ChatStreaming;
      final messages = List<Message>.from(current.messages);
      // Update last AI message or append
      if (messages.isNotEmpty && !messages.last.isUser) {
        messages.removeLast();
        messages.add(Message(text: messages.last.text + event.chunk, isUser: false));
      } else {
        messages.add(Message(text: event.chunk, isUser: false));
      }
      emit(ChatStreaming(messages, ''));
    }
  }

  void _onStreamComplete(StreamComplete event, Emitter<ChatState> emit) {
    if (state is ChatStreaming) {
      final current = state as ChatStreaming;
      emit(ChatComplete(current.messages));
    }
  }

  Future<void> _onAttemptReconnect(AttemptReconnect event, Emitter<ChatState> emit) async {
    // Signal the UI to re-run the SSE connection. We don't manage the EventSource here.
    emit(ChatError('Attempting to reconnect...'));
    await Future.delayed(const Duration(milliseconds: 300));
    emit(ChatInitial());
  }
}
